import { Button } from '@/components/ui/button';
import { Icon } from '@/components/Icon/Icon';
import Link from 'next/link';

const analyticsFeatures = [
  {
    title: 'Performance Dashboards',
    description:
      'Real-time dashboards showing team performance, lead conversion rates, and project pipeline health metrics.',
    icon: 'community',
  },
  {
    title: 'Technical Metrics',
    description:
      'Track engineering-specific KPIs like code delivery timelines, technical debt impact on sales, and project complexity scores.',
    icon: 'community',
  },
  {
    title: 'Revenue Attribution',
    description:
      'Connect technical efforts to revenue outcomes with detailed attribution models for engineering contributions.',
    icon: 'community',
  },
  {
    title: 'Predictive Analytics',
    description:
      'AI-powered forecasting for project timelines, resource needs, and potential technical roadblocks in your pipeline.',
    icon: 'community',
  },
  {
    title: 'Team Productivity',
    description:
      'Analyze individual and team productivity patterns to optimize workload distribution and identify growth opportunities.',
    icon: 'community',
  },
  {
    title: 'Custom Reports',
    description:
      'Build custom analytics reports tailored to your engineering workflows and business requirements.',
    icon: 'community',
  },
];

export default function Analytics() {
  return (
    <section className="flex max-w-[76.5rem] flex-col items-center pt-8 font-[family-name:var(--font-geist-sans)] lg:pt-16">
      <section className="relative m-auto flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-7">
          <h1 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-center text-5xl text-transparent lg:text-6xl">
            Team Analytics
          </h1>
          <p className="mt-0 max-w-[800px] text-center text-lg text-gray-500 lg:mt-4">
            Comprehensive analytics and insights designed for engineering teams.
            Track performance, predict outcomes, and make data-driven decisions
            with metrics that matter for technical projects.
          </p>
          <div className="flex items-start justify-center gap-8">
            <Button asChild variant={'default'} size={'lg'}>
              <Link href="/login">Explore Analytics</Link>
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
            Turn your team data into actionable engineering insights
          </h2>
          <p className="mt-0 w-full text-center text-lg text-gray-500 lg:mt-4 lg:max-w-[800px] lg:text-left">
            Our analytics platform goes beyond basic metrics to provide
            engineering-focused insights that help optimize team performance and
            project outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-10 md:grid-cols-2 lg:grid-cols-3">
          {analyticsFeatures.map((feature, index) => (
            <div
              key={index}
              className="rounded border border-[#282D45] bg-[#0E1330] p-[30px] transition-all duration-300 hover:border-[#32CAFD] hover:bg-[#1A1F3A]"
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

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-[#282D45] bg-[#0E1330] p-6">
            <h4 className="mb-4 text-xl font-semibold text-gray-200">
              Real-time Insights
            </h4>
            <p className="text-gray-400">
              Get instant visibility into your team&apos;s performance with live
              dashboards that update as your projects progress.
            </p>
          </div>
          <div className="rounded-lg border border-[#282D45] bg-[#0E1330] p-6">
            <h4 className="mb-4 text-xl font-semibold text-gray-200">
              Predictive Modeling
            </h4>
            <p className="text-gray-400">
              Leverage AI to forecast project outcomes, identify potential
              bottlenecks, and optimize resource allocation.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-[#282D45] bg-[#0E1330] p-8 text-center">
          <h3 className="mb-4 text-3xl font-semibold text-gray-200">
            Ready to unlock your team&apos;s potential?
          </h3>
          <p className="mb-6 text-lg text-gray-400">
            Start making data-driven decisions with analytics built specifically
            for engineering teams and technical workflows.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild variant={'default'} size={'lg'}>
              <Link href="/login">Start Free Trial</Link>
            </Button>
            <Button asChild variant={'outline'} size={'lg'}>
              <Link href="/contact">Request Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}
