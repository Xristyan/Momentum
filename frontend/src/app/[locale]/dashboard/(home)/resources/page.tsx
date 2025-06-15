import { Button } from '@/components/ui/button';
import { Icon } from '@/components/Icon/Icon';
import Link from 'next/link';

const resourceCategories = [
  {
    title: 'Documentation',
    description:
      'Comprehensive guides, API references, and technical documentation to help you get the most out of our platform.',
    icon: 'community',
    links: [
      { title: 'Getting Started Guide', href: '/docs/getting-started' },
      { title: 'API Reference', href: '/docs/api' },
      { title: 'Integration Guides', href: '/docs/integrations' },
    ],
  },
  {
    title: 'Best Practices',
    description:
      'Learn from engineering teams who have successfully implemented our CRM in their workflows.',
    icon: 'community',
    links: [
      { title: 'Engineering Team Setup', href: '/guides/team-setup' },
      { title: 'Workflow Optimization', href: '/guides/workflows' },
      { title: 'Performance Metrics', href: '/guides/metrics' },
    ],
  },
  {
    title: 'Support',
    description:
      'Get help when you need it with our comprehensive support resources and community.',
    icon: 'community',
    links: [
      { title: 'Help Center', href: '/support/help' },
      { title: 'Community Forum', href: '/support/community' },
      { title: 'Contact Support', href: '/support/contact' },
    ],
  },
  {
    title: 'Training',
    description:
      'Video tutorials, webinars, and training materials to help your team master the platform.',
    icon: 'community',
    links: [
      { title: 'Video Tutorials', href: '/training/videos' },
      { title: 'Live Webinars', href: '/training/webinars' },
      { title: 'Certification Program', href: '/training/certification' },
    ],
  },
  {
    title: 'Case Studies',
    description:
      'Real-world examples of how engineering teams have transformed their processes with our CRM.',
    icon: 'community',
    links: [
      { title: 'Startup Success Stories', href: '/case-studies/startups' },
      { title: 'Enterprise Implementations', href: '/case-studies/enterprise' },
      { title: 'ROI Calculator', href: '/tools/roi-calculator' },
    ],
  },
  {
    title: 'Developer Tools',
    description:
      'SDKs, plugins, and development tools to extend and customize your CRM experience.',
    icon: 'community',
    links: [
      { title: 'JavaScript SDK', href: '/tools/javascript-sdk' },
      { title: 'VS Code Extension', href: '/tools/vscode' },
      { title: 'CLI Tools', href: '/tools/cli' },
    ],
  },
];

export default function Resources() {
  return (
    <section className="flex max-w-[76.5rem] flex-col items-center pt-8 font-[family-name:var(--font-geist-sans)] lg:pt-16">
      <section className="relative m-auto flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-7">
          <h1 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-center text-5xl text-transparent lg:text-6xl">
            Resources & Support
          </h1>
          <p className="mt-0 max-w-[800px] text-center text-lg text-gray-500 lg:mt-4">
            Everything you need to succeed with our CRM platform. From technical
            documentation to best practices, we&apos;ve got the resources to
            help your engineering team achieve maximum productivity.
          </p>
          <div className="flex items-start justify-center gap-8">
            <Button asChild variant={'default'} size={'lg'}>
              <Link href="/docs/getting-started">Get Started</Link>
            </Button>
            <Button asChild variant={'outline'} size={'lg'}>
              <Link href="/support/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
        <div className="absolute -left-48 top-1/4 z-[100] h-[226px] w-[274px] bg-[#7214FF] blur-[250px]"></div>
        <div className="absolute -right-48 top-1/3 z-[100] h-[226px] w-[274px] bg-[#32CAFD] blur-[250px]"></div>
      </section>

      <section className="flex w-full max-w-[76.5rem] flex-col items-center">
        <div className="mb-[60px] mt-16 grid grid-cols-1 grid-rows-2 gap-10 px-8 lg:mt-24 lg:grid-cols-3 lg:grid-rows-1 lg:gap-28 lg:px-16">
          <h2 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-center text-4xl text-transparent lg:col-span-2 lg:text-left lg:text-5xl">
            Comprehensive resources for engineering teams
          </h2>
          <p className="mt-0 w-full text-center text-lg text-gray-500 lg:mt-4 lg:max-w-[800px] lg:text-left">
            Access documentation, tutorials, best practices, and support
            resources designed specifically for technical teams and engineering
            workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-10 md:grid-cols-2 lg:grid-cols-3">
          {resourceCategories.map((category, index) => (
            <div
              key={index}
              className="rounded border border-[#282D45] bg-[#0E1330] p-[30px] transition-all duration-300 hover:border-[#32CAFD] hover:bg-[#1A1F3A]"
            >
              <Icon
                iconName={category.icon}
                alt={category.title}
                width={45}
                height={45}
                className="pb-[30px]"
              />
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl leading-8">{category.title}</h3>
                <p className="mb-4 text-base leading-6 text-gray-500">
                  {category.description}
                </p>
                <ul className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#32CAFD] transition-colors hover:text-[#7214FF]"
                      >
                        {link.title} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-[#282D45] bg-[#0E1330] p-6 text-center">
            <h4 className="mb-4 text-xl font-semibold text-gray-200">
              24/7 Support
            </h4>
            <p className="text-gray-400">
              Round-the-clock technical support for all your CRM needs
            </p>
          </div>
          <div className="rounded-lg border border-[#282D45] bg-[#0E1330] p-6 text-center">
            <h4 className="mb-4 text-xl font-semibold text-gray-200">
              Active Community
            </h4>
            <p className="text-gray-400">
              Connect with other engineering teams using our platform
            </p>
          </div>
          <div className="rounded-lg border border-[#282D45] bg-[#0E1330] p-6 text-center">
            <h4 className="mb-4 text-xl font-semibold text-gray-200">
              Regular Updates
            </h4>
            <p className="text-gray-400">
              Continuous platform improvements and new feature releases
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-[#282D45] bg-[#0E1330] p-8 text-center">
          <h3 className="mb-4 text-3xl font-semibold text-gray-200">
            Need personalized help?
          </h3>
          <p className="mb-6 text-lg text-gray-400">
            Our team of experts is ready to help you implement and optimize our
            CRM for your specific engineering workflows.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild variant={'default'} size={'lg'}>
              <Link href="/support/contact">Get Expert Help</Link>
            </Button>
            <Button asChild variant={'outline'} size={'lg'}>
              <Link href="/training/consultation">Book Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}
