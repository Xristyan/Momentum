import { catchAsync } from "../utils/catchAsync";
import User, { UserInstance } from "../models/user.model";
import Membership, { MembershipInstance } from "../models/membership.model";
import XpTracking from "../models/xpTracking.model";

const xpAmount = 25;

interface JiraWebhookBody {
  issue?: {
    key: string;
    fields: {
      assignee?: {
        self: string;
        emailAddress: string;
      };
      summary: string;
    };
  };
  changelog?: {
    items: Array<{
      field: string;
      toString?: string;
      to?: string;
    }>;
  };
}

const jiraWebhook = catchAsync(async (req, res) => {
  const { organizationId } = req.query;
  const body: JiraWebhookBody = req.body;

  try {
    if (!body.issue || !body.changelog) {
      res.status(200).json({ message: "Not an issue status change" });
      return;
    }

    const issue = body.issue;
    const assignee = issue.fields.assignee;

    if (!assignee || !assignee.emailAddress) {
      res.status(200).json({ message: "Issue not assigned to anyone" });
      return;
    }

    const statusChanges = body.changelog.items.filter(
      (item) => item.field === "status",
    );

    const isNowDone = statusChanges.some(
      (change) =>
        change.toString?.toLowerCase() === "done" ||
        change.to?.toLowerCase() === "done",
    );

    if (!isNowDone) {
      res.status(200).json({ message: "Issue not marked as done" });
      return;
    }

    const user = (await User.findOne({
      where: { email: assignee.emailAddress },
    })) as UserInstance | null;

    if (!user) {
      res.status(200).json({
        message: "User not found in system",
        email: assignee.emailAddress,
      });
      return;
    }

    const membership = (await Membership.findOne({
      where: {
        UserId: user.id,
        OrganizationId: organizationId,
      },
    })) as MembershipInstance | null;

    if (!membership) {
      res.status(200).json({
        message: "User is not a member of this organization",
        userId: user.id,
        organizationId,
      });
      return;
    }

    const existingXpRecord = await XpTracking.findOne({
      where: {
        membershipId: membership.id,
        sourceType: "jira",
        sourceIdentifier: issue.key,
      },
    });

    if (existingXpRecord) {
      res.status(200).json({
        message: "XP already awarded for this issue",
        issueKey: issue.key,
      });
      return;
    }

    await XpTracking.create({
      membershipId: membership.id,
      sourceType: "jira",
      sourceIdentifier: issue.key,
      xpAmount: xpAmount,
      description: `Completed Jira issue: ${issue.fields.summary}`,
    });

    await membership.update({
      xp: membership.xp + xpAmount,
    });

    res.status(200).json({
      message: "XP awarded successfully",
      user: assignee.emailAddress,
      issueKey: issue.key,
      xpAwarded: xpAmount,
      newTotalXp: membership.xp + xpAmount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error processing webhook",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default jiraWebhook;
