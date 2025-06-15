import { Button } from '@/components/ui/button';
import { Icon } from '@/components/Icon/Icon';
import Link from 'next/link';

const features = [
  {
    title: 'Lead Management',
    description:
      'Track, organize, and nurture your leads through the entire sales pipeline with powerful automation tools.',
    href: '/features/lead-management',
    icon: 'community',
  },
  {
    title: 'Team Analytics',
    description:
      'Get detailed insights into your team performance, conversion rates, and pipeline health with comprehensive analytics.',
    href: '/features/analytics',
    icon: 'community',
  },
  {
    title: 'Task Automation',
    description:
      'Automate repetitive tasks and workflows to increase productivity and reduce manual errors across your team.',
    href: '/features/automation',
    icon: 'community',
  },
  {
    title: 'Customer Insights',
    description:
      'Deep customer analysis and behavior tracking to make data-driven decisions for your engineering projects.',
    href: '/features/insights',
    icon: 'community',
  },
  {
    title: 'Team Collaboration',
    description:
      'Real-time collaboration tools designed specifically for engineering teams and complex technical workflows.',
    href: '/features/collaboration',
    icon: 'community',
  },
  {
    title: 'Integrations',
    description:
      'Connect with your favorite development tools and platforms to streamline your entire engineering workflow.',
    href: '/features/integrations',
    icon: 'community',
  },
];

export default function Features() {
  return (
    <section className="flex max-w-[76.5rem] flex-col items-center pt-8 font-[family-name:var(--font-geist-sans)] lg:pt-16">
      <section className="relative m-auto flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-7">
          <h1 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-center text-5xl text-transparent lg:text-6xl">
            Powerful CRM Features
          </h1>
          <p className="mt-0 max-w-[800px] text-center text-lg text-gray-500 lg:mt-4">
            Everything your engineering team needs to manage leads, track
            performance, and streamline workflows. Built specifically for
            technical teams who demand precision and efficiency.
          </p>
          <div className="flex items-start justify-center gap-8">
            <Button asChild variant={'default'} size={'lg'}>
              <Link href="/login">Start Free Trial</Link>
            </Button>
            <Button asChild variant={'default'} size={'lg'}>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
        <div className="absolute -left-48 top-1/4 z-[100] h-[226px] w-[274px] bg-[#7214FF] blur-[250px]"></div>
        <div className="absolute -right-48 top-1/3 z-[100] h-[226px] w-[274px] bg-[#32CAFD] blur-[250px]"></div>
      </section>

      <section className="flex w-full max-w-[76.5rem] flex-col items-center">
        <div className="mb-[60px] mt-16 grid grid-cols-1 grid-rows-2 gap-10 px-8 lg:mt-24 lg:grid-cols-3 lg:grid-rows-1 lg:gap-28 lg:px-16">
          <h2 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-center text-4xl text-transparent lg:col-span-2 lg:text-left lg:text-5xl">
            Built for engineering teams who need more than basic CRM
          </h2>
          <p className="mt-0 w-full text-center text-lg text-gray-500 lg:mt-4 lg:max-w-[800px] lg:text-left">
            Our feature set is designed around the unique needs of technical
            teams, offering deep integrations and advanced automation that
            scales with your projects.
          </p>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="group rounded border border-[#282D45] bg-[#0E1330] p-[30px] transition-all duration-300 hover:border-[#7214FF] hover:bg-[#1A1F3A]"
            >
              <Icon
                iconName={feature.icon}
                alt={feature.title}
                width={45}
                height={45}
                className="pb-[30px]"
              />
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl leading-8 group-hover:text-[#7214FF]">
                  {feature.title}
                </h3>
                <p className="text-base leading-6 text-gray-500">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="mb-6 text-2xl text-gray-300">
            Ready to transform your team&apos;s workflow?
          </h3>
          <div className="flex items-center justify-center gap-4">
            <Button asChild variant={'default'} size={'lg'}>
              <Link href="/login">Get Started Today</Link>
            </Button>
            <Button asChild variant={'outline'} size={'lg'}>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}
