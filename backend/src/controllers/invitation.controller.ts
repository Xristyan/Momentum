import { CustomError } from "../errors/error";
import { Invitation, Organization, User } from "../models";
import { catchAsync } from "../utils/catchAsync";
import { InvitationType } from "../types/modelTypes/invitation";
import { InvitationInstance } from "../models/invitation.model";

export const getInvitation = catchAsync(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    throw new CustomError("Token is missing", 400);
  }

  const invitation = await Invitation.findOne({ where: { token } });

  if (!invitation) {
    throw new CustomError("Invitation does not exist", 404);
  }

  res.json({ invitation });
});

export const handleInvitation = catchAsync(async (req, res, next) => {
  const { token } = req.query;
  const { action, type } = req.body;

  if (!token) {
    throw new CustomError("Token is missing", 400);
  }

  const invitation = (await Invitation.findOne({
    where: { token },
  })) as InvitationInstance;

  if (!invitation) {
    throw new CustomError("Invitation does not exist", 404);
  }

  if (action === "decline") {
    await Invitation.update({ status: "rejected" }, { where: { token } });
  }

  if (action === "accept") {
    await Invitation.update({ status: "accepted" }, { where: { token } });

    if (type === InvitationType.ORGANIZATION) {
      const user = await User.findByPk(req.user.id);

      const organization = await Organization.findByPk(
        invitation.organizationId,
      );

      if (!organization) {
        throw new CustomError("Organization does not exist", 404);
      }

      await user?.addOrganization(organization, {
        through: { role: "member" },
      });

      res.json({ message: "Invitation accepted" });
      next();
    }
  }

  res.json({ message: "Invitation declined" });
});
