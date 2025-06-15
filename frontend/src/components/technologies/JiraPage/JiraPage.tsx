'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  authenticateWithAtlassian,
  fetchJiraProjects,
  fetchJiraIssuesForUser,
} from '@/actions/jiraActions';
import { useUser } from '@/providers/userProvider/UserProvider';
import { useState, useEffect } from 'react';
import {
  ExternalLink,
  Users,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { useOrganization } from '@/providers/organizationProvider';

interface Project {
  id: string;
  key: string;
  name: string;
  description?: string;
}

interface Issue {
  id: string;
  key: string;
  fields: {
    summary: string;
    status: {
      name: string;
    };
    priority: {
      name: string;
    };
    assignee: {
      displayName: string;
      emailAddress: string;
    };
  };
}

const getStatusColor = (status: string) => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes('done') || statusLower.includes('closed')) {
    return 'bg-green-500/20 text-green-400 border-green-500/30';
  } else if (
    statusLower.includes('progress') ||
    statusLower.includes('active')
  ) {
    return 'bg-[#32CAFD]/20 text-[#32CAFD] border-[#32CAFD]/30';
  } else if (statusLower.includes('review')) {
    return 'bg-[#7214FF]/20 text-[#7214FF] border-[#7214FF]/30';
  } else {
    return 'bg-[#282D45] text-gray-300 border-[#282D45]';
  }
};

const getPriorityColor = (priority: string) => {
  const priorityLower = priority.toLowerCase();
  if (priorityLower.includes('high') || priorityLower.includes('critical')) {
    return 'text-red-400';
  } else if (priorityLower.includes('medium')) {
    return 'text-yellow-400';
  } else {
    return 'text-green-400';
  }
};

export const JiraPage = () => {
  const { user } = useUser();
  const { organization } = useOrganization();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [loadingIssues, setLoadingIssues] = useState(false);

  useEffect(() => {
    checkAuthenticationAndLoadProjects();
  }, []);

  const checkAuthenticationAndLoadProjects = async () => {
    try {
      const projectsData = await fetchJiraProjects();
      if (projectsData) {
        setIsAuthenticated(true);
        setProjects(projectsData.projects);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSelect = async (projectKey: string) => {
    if (!user?.data?.email) return;

    setSelectedProject(projectKey);
    setLoadingIssues(true);

    try {
      const issuesData = await fetchJiraIssuesForUser(
        projectKey,
        user.data.email,
      );
      if (issuesData && issuesData.issues) {
        setIssues(issuesData.issues);
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoadingIssues(false);
    }
  };

  const handleAuthenticate = async () => {
    const organizationId = organization?.id;

    await authenticateWithAtlassian(organizationId);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#32CAFD]" />
          <p className="text-gray-400">Loading Jira integration...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="mx-auto w-full max-w-md">
          <Card className="border-[#282D45] bg-[#0E1330] shadow-xl transition-all duration-300 hover:border-[#7214FF]/50">
            <CardContent className="p-8">
              <div className="space-y-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#7214FF] to-[#32CAFD]">
                  <ExternalLink className="h-8 w-8 text-white" />
                </div>

                <div className="space-y-2">
                  <h1 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-2xl font-bold text-transparent">
                    Connect to Jira
                  </h1>
                  <p className="text-gray-400">
                    Integrate with Atlassian to view and manage your Jira issues
                    directly from your dashboard
                  </p>
                </div>

                <div className="rounded-lg border border-[#282D45] bg-[#1A1F3A] p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#32CAFD]" />
                    <div className="text-sm text-gray-300">
                      <p className="font-medium">
                        What you&apos;ll get access to:
                      </p>
                      <ul className="mt-2 space-y-1 text-gray-400">
                        <li>• View your assigned issues</li>
                        <li>• Track project progress</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleAuthenticate}
                  className="w-full bg-gradient-to-r from-[#7214FF] to-[#32CAFD] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-[#8724FF] hover:to-[#42DAFD]"
                  size="lg"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Connect with Atlassian
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-3xl font-bold text-transparent lg:text-4xl">
              Jira Dashboard
            </h1>
            <p className="mt-2 text-lg text-gray-400">
              Manage your assigned issues across projects
            </p>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border border-[#282D45] bg-[#0E1330] px-4 py-2 text-sm text-gray-300">
            <Users className="h-4 w-4 text-[#32CAFD]" />
            <span>Connected as {user?.data?.email}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Projects sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-[#282D45] bg-[#0E1330] transition-all duration-300 hover:border-[#7214FF]/50">
            <CardHeader className="border-b border-[#282D45] bg-[#1A1F3A]/50">
              <CardTitle className="flex items-center space-x-2 text-gray-200">
                <Users className="h-5 w-5 text-[#32CAFD]" />
                <span>Projects</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    className={`w-full border-b border-[#282D45] p-4 text-left transition-all duration-200 last:border-b-0 hover:bg-[#1A1F3A] ${
                      selectedProject === project.key
                        ? 'border-l-4 border-l-[#7214FF] bg-[#1A1F3A]'
                        : ''
                    }`}
                    onClick={() => handleProjectSelect(project.key)}
                  >
                    <div className="space-y-1">
                      <div className="font-medium text-gray-200">
                        {project.name}
                      </div>
                      <div className="font-mono text-sm text-[#32CAFD]">
                        {project.key}
                      </div>
                      {project.description && (
                        <div className="line-clamp-2 text-xs text-gray-400">
                          {project.description}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Issues content */}
        <div className="lg:col-span-3">
          {selectedProject ? (
            <Card className="border-[#282D45] bg-[#0E1330] transition-all duration-300 hover:border-[#32CAFD]/50">
              <CardHeader className="border-b border-[#282D45] bg-[#1A1F3A]/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-gray-200">
                    <AlertCircle className="h-5 w-5 text-[#7214FF]" />
                    <span>Issues in {selectedProject}</span>
                  </CardTitle>
                  <div className="rounded-full bg-[#32CAFD]/20 px-3 py-1 text-sm text-[#32CAFD]">
                    {issues.length} issue{issues.length !== 1 ? 's' : ''}{' '}
                    assigned
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {loadingIssues ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center space-y-3">
                      <Loader2 className="h-6 w-6 animate-spin text-[#32CAFD]" />
                      <p className="text-gray-400">Loading issues...</p>
                    </div>
                  </div>
                ) : issues.length > 0 ? (
                  <div className="space-y-4">
                    {issues.map((issue) => (
                      <div
                        key={issue.id}
                        className="group rounded-lg border border-[#282D45] bg-[#1A1F3A]/30 p-5 transition-all duration-300 hover:border-[#7214FF]/50 hover:bg-[#1A1F3A]/50"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center space-x-3">
                              <span className="rounded bg-[#32CAFD]/20 px-3 py-1 font-mono text-sm font-medium text-[#32CAFD]">
                                {issue.key}
                              </span>
                              <h3 className="font-medium text-gray-200 transition-colors group-hover:text-[#32CAFD]">
                                {issue.fields.summary}
                              </h3>
                            </div>
                          </div>

                          <div className="ml-4 flex flex-col items-end space-y-2">
                            <span
                              className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(issue.fields.status.name)}`}
                            >
                              {issue.fields.status.name}
                            </span>
                            <span
                              className={`text-xs font-medium ${getPriorityColor(issue.fields.priority.name)}`}
                            >
                              {issue.fields.priority.name} Priority
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-[#282D45] pt-3">
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Clock className="h-4 w-4" />
                            <span>Assigned to you</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-500" />
                    <h3 className="mb-2 text-lg font-medium text-gray-300">
                      No issues found
                    </h3>
                    <p className="text-gray-400">
                      You don&apos;t have any issues assigned to you in this
                      project
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-[#282D45] bg-[#0E1330] transition-all duration-300 hover:border-[#7214FF]/50">
              <CardContent className="p-16 text-center">
                <Users className="mx-auto mb-6 h-16 w-16 text-gray-500" />
                <h3 className="mb-2 text-xl font-medium text-gray-300">
                  Select a project
                </h3>
                <p className="mx-auto max-w-md text-gray-400">
                  Choose a project from the sidebar to view your assigned issues
                  and track your progress
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
