import { JiraPage } from '@/components/technologies/JiraPage';

export default async function Page({
  params,
}: {
  params: Promise<{ technologyId: string }>;
}) {
  const { technologyId } = await params;

  const PageComponent = TechPage[technologyId as keyof typeof TechPage];

  if (!PageComponent) {
    return <div>Technology not found</div>;
  }

  return <PageComponent />;
}

const TechPage = {
  jira: JiraPage,
  github: () => <div>Github</div>,
  'microsoft-teams': () => <div>Microsoft Teams</div>,
};
