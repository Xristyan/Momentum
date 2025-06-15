'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function authenticateWithAtlassian(organizationId?: number) {
  const state = encodeURIComponent(JSON.stringify({ organizationId }));
  const baseUrl = 'https://auth.atlassian.com/authorize';

  const params = new URLSearchParams({
    audience: 'api.atlassian.com',
    client_id: process.env.NEXT_PUBLIC_AUTH_ATLASSIAN_ID || '',
    scope: [
      'read:jira-work',
      'manage:jira-project',
      'manage:jira-configuration',
      'read:jira-user',
      'write:jira-work',
      'manage:jira-webhook',
      'manage:jira-data-provider',
    ].join(' '),
    redirect_uri: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/atlassian/callback`,
    state,
    response_type: 'code',
    prompt: 'consent',
  });

  redirect(`${baseUrl}?${params.toString()}`);
}

export async function getJiraToken() {
  const cookieStore = await cookies();
  const jiraToken = cookieStore.get('jira_token');
  return jiraToken?.value || null;
}

export async function fetchJiraProjects() {
  const token = await getJiraToken();
  if (!token) return null;

  try {
    const tokenData = JSON.parse(token);

    // Get accessible resources
    const resources = await fetch(
      'https://api.atlassian.com/oauth/token/accessible-resources',
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: 'application/json',
        },
      },
    );

    const resourcesData = await resources.json();

    // Get projects
    const projects = await fetch(
      `https://api.atlassian.com/ex/jira/${resourcesData?.[0].id}/rest/api/2/project`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: 'application/json',
        },
      },
    );

    const projectsData = await projects.json();
    return { projects: projectsData, resourceId: resourcesData?.[0].id };
  } catch (error) {
    console.error('Error fetching Jira projects:', error);
    return null;
  }
}

export async function fetchJiraIssuesForUser(
  projectKey: string,
  userEmail: string,
) {
  const token = await getJiraToken();
  if (!token) return null;

  try {
    const tokenData = JSON.parse(token);

    // Get accessible resources
    const resources = await fetch(
      'https://api.atlassian.com/oauth/token/accessible-resources',
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: 'application/json',
        },
      },
    );

    const resourcesData = await resources.json();

    // Get issues assigned to user in specific project
    const jql = `assignee="${userEmail}" AND project="${projectKey}"`;
    const issues = await fetch(
      `https://api.atlassian.com/ex/jira/${resourcesData?.[0].id}/rest/api/2/search?jql=${encodeURIComponent(jql)}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: 'application/json',
        },
      },
    );

    const issuesData = await issues.json();
    return issuesData;
  } catch (error) {
    console.error('Error fetching Jira issues:', error);
    return null;
  }
}
