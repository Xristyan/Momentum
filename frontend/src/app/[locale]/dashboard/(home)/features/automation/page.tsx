import { Button } from '@/components/ui/button';
import { Icon } from '@/components/Icon/Icon';
import Link from 'next/link';

const automationFeatures = [
  {
    title: 'Workflow Automation',
    description:
      'Automate complex engineering workflows from lead qualification to project delivery with customizable triggers and actions.',
    icon: 'community',
  },
  {
    title: 'Smart Notifications',
    description:
      'Intelligent notification system that alerts the right team members at the right time based on project phases and priorities.',
    icon: 'community',
  },
  {
    title: 'Task Assignment',
    description:
      'Automatically assign tasks and tickets based on team expertise, workload, and project requirements.',
    icon: 'community',
  },
  {
    title: 'Integration Triggers',
    description:
      'Trigger actions across your development stack when specific events occur in your CRM, from code commits to deployments.',
    icon: 'community',
  },
  {
    title: 'Custom Workflows',
    description:
      'Build and customize automation workflows that match your unique engineering processes and team structure.',
    icon: 'community',
  },
  {
    title: 'Performance Monitoring',
    description:
      'Automatically track and report on automation performance to continuously optimize your processes.',
    icon: 'community',
  },
];

export default function Automation() {
  return (
    <section className="flex max-w-[76.5rem] flex-col items-center pt-8 font-[family-name:var(--font-geist-sans)] lg:pt-16">
      <section className="relative m-auto flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-7">
          <h1 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-center text-5xl text-transparent lg:text-6xl">
            Task Automation
          </h1>
          <p className="mt-0 max-w-[800px] text-center text-lg text-gray-500 lg:mt-4">
            Intelligent automation designed for engineering workflows. Eliminate
            repetitive tasks, streamline processes, and let your team focus on
            what they do best - building great software.
          </p>
          <div className="flex items-start justify-center gap-8">
            <Button asChild variant={'default'} size={'lg'}>
              <Link href="/login">Try Automation</Link>
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
            Automate the routine, accelerate the exceptional
          </h2>
          <p className="mt-0 w-full text-center text-lg text-gray-500 lg:mt-4 lg:max-w-[800px] lg:text-left">
            Our automation engine understands engineering workflows and
            eliminates manual processes while maintaining the flexibility your
            team needs for complex projects.
          </p>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-10 md:grid-cols-2 lg:grid-cols-3">
          {automationFeatures.map((feature, index) => (
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

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-lg border border-[#282D45] bg-[#0E1330] p-6 text-center">
            <h4 className="mb-4 text-2xl font-bold text-[#32CAFD]">80%</h4>
            <p className="text-gray-400">
              Average reduction in manual task time for engineering teams
            </p>
          </div>
          <div className="rounded-lg border border-[#282D45] bg-[#0E1330] p-6 text-center">
            <h4 className="mb-4 text-2xl font-bold text-[#7214FF]">50+</h4>
            <p className="text-gray-400">
              Pre-built automation templates for common engineering workflows
            </p>
          </div>
          <div className="rounded-lg border border-[#282D45] bg-[#0E1330] p-6 text-center">
            <h4 className="mb-4 text-2xl font-bold text-[#32CAFD]">24/7</h4>
            <p className="text-gray-400">
              Continuous automation monitoring and optimization
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-[#282D45] bg-[#0E1330] p-8 text-center">
          <h3 className="mb-4 text-3xl font-semibold text-gray-200">
            Ready to automate your engineering workflows?
          </h3>
          <p className="mb-6 text-lg text-gray-400">
            Join teams who have saved hundreds of hours with intelligent
            automation tailored for technical projects and development cycles.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild variant={'default'} size={'lg'}>
              <Link href="/login">Start Automating</Link>
            </Button>
            <Button asChild variant={'outline'} size={'lg'}>
              <Link href="/pricing">View Plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}
