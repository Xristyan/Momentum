import { Button } from '@/components/ui/button';
import { Icon } from '@/components/Icon/Icon';
import Link from 'next/link';

const leadFeatures = [
  {
    title: 'Pipeline Tracking',
    description:
      'Visual pipeline management with drag-and-drop functionality to track leads through every stage of your sales process.',
    icon: 'community',
  },
  {
    title: 'Lead Scoring',
    description:
      'Automated lead scoring based on engagement, technical requirements, and project complexity to prioritize your efforts.',
    icon: 'community',
  },
  {
    title: 'Technical Qualification',
    description:
      'Specialized forms and workflows designed for engineering projects to capture technical requirements and constraints.',
    icon: 'community',
  },
  {
    title: 'Follow-up Automation',
    description:
      'Smart follow-up sequences that adapt based on lead behavior and technical milestone completion.',
    icon: 'community',
  },
  {
    title: 'Integration Ready',
    description:
      'Direct integration with GitHub, Jira, and other development tools to sync project status with lead progress.',
    icon: 'community',
  },
  {
    title: 'Team Handoffs',
    description:
      'Seamless handoff process between sales, engineering, and project management teams with full context preservation.',
    icon: 'community',
  },
];

export default function LeadManagement() {
  return (
    <section className="flex max-w-[76.5rem] flex-col items-center pt-8 font-[family-name:var(--font-geist-sans)] lg:pt-16">
      <section className="relative m-auto flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-7">
          <h1 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-center text-5xl text-transparent lg:text-6xl">
            Lead Management
          </h1>
          <p className="mt-0 max-w-[800px] text-center text-lg text-gray-500 lg:mt-4">
            Advanced lead management designed for engineering teams. Track
            technical requirements, manage complex project pipelines, and
            seamlessly handoff qualified leads to your development teams.
          </p>
          <div className="flex items-start justify-center gap-8">
            <Button asChild variant={'default'} size={'lg'}>
              <Link href="/login">Try Lead Management</Link>
            </Button>
            <Button asChild variant={'outline'} size={'lg'}>
              <Link href="/features">Back to Features</Link>
            </Button>
          </div>
        </div>
        <div className="absolute -left-48 top-1/4 z-[100] h-[226px] w-[274px] bg-[#7214FF] blur-[250px]"></div>
        <div className="absolute -right-48 top-1/3 z-[100] h-[226px] w-[274px] bg-[#32CAFD] blur-[250px]"></div>
      </section>

      <section className="flex w-full max-w-[76.5rem] flex-col items-center">
        <div className="mb-[60px] mt-16 grid grid-cols-1 grid-rows-2 gap-10 px-8 lg:mt-24 lg:grid-cols-3 lg:grid-rows-1 lg:gap-28 lg:px-16">
          <h2 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-center text-4xl text-transparent lg:col-span-2 lg:text-left lg:text-5xl">
            Manage technical leads with precision and context
          </h2>
          <p className="mt-0 w-full text-center text-lg text-gray-500 lg:mt-4 lg:max-w-[800px] lg:text-left">
            Our lead management system understands the complexity of engineering
            projects and provides the tools to qualify, track, and convert
            technical leads effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-10 md:grid-cols-2 lg:grid-cols-3">
          {leadFeatures.map((feature, index) => (
            <div
              key={index}
              className="rounded border border-[#282D45] bg-[#0E1330] p-[30px] transition-all duration-300 hover:border-[#7214FF] hover:bg-[#1A1F3A]"
            >
              <Icon
                iconName={feature.icon}
                alt={feature.title}
                width={45}
                height={45}
                className="pb-[30px]"
              />
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl leading-8">{feature.title}</h3>
                <p className="text-base leading-6 text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-lg border border-[#282D45] bg-[#0E1330] p-8 text-center">
          <h3 className="mb-4 text-3xl font-semibold text-gray-200">
            Ready to streamline your lead management?
          </h3>
          <p className="mb-6 text-lg text-gray-400">
            Join thousands of engineering teams who have improved their
            conversion rates with our specialized CRM tools.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild variant={'default'} size={'lg'}>
              <Link href="/login">Start Free Trial</Link>
            </Button>
            <Button asChild variant={'outline'} size={'lg'}>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}
