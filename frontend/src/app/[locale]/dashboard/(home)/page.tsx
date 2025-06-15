import Image from 'next/image';
import HeroImage from '@/public/images/freepik__upload__68454-Photoroom (1).png';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Link from 'next/link';
import { Icon } from '@/components/Icon/Icon';

const mobileFeatures = [
  {
    title: 'Smart Lead Tracking',
    description:
      'Automatically capture and qualify leads with intelligent scoring algorithms designed for technical sales processes and engineering workflows.',
  },
  {
    title: 'Pipeline Management',
    description:
      'Visualize and manage your sales pipeline with customizable stages, automated workflows, and real-time progress tracking for engineering projects.',
  },
  {
    title: 'Team Analytics',
    description:
      'Get comprehensive insights into team performance, conversion rates, and project metrics with advanced analytics built for technical teams.',
  },
  {
    title: 'Task Automation',
    description:
      'Streamline repetitive tasks with intelligent automation, from lead assignment to follow-up scheduling and project milestone tracking.',
  },
  {
    title: 'Integration Hub',
    description:
      'Connect seamlessly with your existing tools including Jira, GitHub, Slack, and other engineering platforms for unified workflow management.',
  },
];

const desktopFeatures = [
  ...mobileFeatures,
  {
    title: 'Technical Documentation',
    description:
      'Maintain comprehensive project documentation, technical specifications, and client requirements in one centralized, searchable knowledge base.',
  },
];

export default function Home() {
  return (
    <section className="flex max-w-[76.5rem] flex-col items-center pt-8 font-[family-name:var(--font-geist-sans)] lg:pt-16">
      <section className="relative m-auto flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-7">
          <h1 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-center text-5xl text-transparent lg:text-6xl">
            A CRM dashboard for engineering teams
          </h1>
          <p className="mt-0 max-w-[800px] text-center text-lg text-gray-500 lg:mt-4">
            Streamline your engineering workflows with intelligent lead
            management, automated task tracking, and comprehensive analytics.
            Built specifically for technical teams who need powerful CRM
            capabilities without the complexity.
          </p>
          <div className="flex items-start justify-center gap-8">
            <Button asChild variant={'default'} size={'lg'}>
              <Link href="/login">Get Started</Link>
            </Button>
            <Button asChild variant={'default'} size={'lg'}>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
        <div className="m-auto max-w-[800px]">
          <Image
            src={HeroImage}
            width={800}
            height={530}
            alt="Hero illustration"
            className="h-full w-full object-cover"
            loading="eager"
            priority={true}
          />
        </div>
        <div className="absolute -left-48 top-1/4 z-[100] h-[226px] w-[274px] bg-[#7214FF] blur-[250px]"></div>
        <div className="absolute -right-48 top-1/3 z-[100] h-[226px] w-[274px] bg-[#32CAFD] blur-[250px]"></div>
      </section>

      <section className="flex w-full max-w-[76.5rem] flex-col items-center">
        <div className="mb-[60px] mt-16 grid grid-cols-1 grid-rows-2 gap-10 px-8 lg:mt-24 lg:grid-cols-3 lg:grid-rows-1 lg:gap-28 lg:px-16">
          <h1 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-center text-5xl text-transparent lg:col-span-2 lg:text-left lg:text-6xl">
            Powerful features to help you manage all your leads
          </h1>
          <p className="mt-0 w-full text-center text-lg text-gray-500 lg:mt-4 lg:max-w-[800px] lg:text-left">
            Transform your engineering team&apos;s productivity with advanced
            lead scoring, automated pipeline management, and real-time
            collaboration tools designed for technical professionals.
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-sm sm:max-w-lg md:max-w-[800px] lg:hidden"
        >
          <CarouselContent>
            {mobileFeatures.map((feature, index) => (
              <CarouselItem key={index} className="max-w-80 sm:max-w-sm">
                <div className="h-full p-1">
                  <div
                    key={index}
                    className="h-full rounded border border-[#282D45] bg-[#0E1330] py-[30px] pl-[30px] pr-[40px]"
                  >
                    <Icon
                      iconName="community"
                      alt="Community"
                      width={45}
                      height={45}
                      className="pb-[30px]"
                    />
                    <div className="flex flex-col gap-3">
                      <h6 className="text-2xl leading-8">{feature.title}</h6>
                      <p className="text-base leading-6 text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="hidden grid-cols-3 justify-items-center gap-10 lg:grid">
          {desktopFeatures.map((feature, index) => {
            return (
              <div
                key={index}
                className="rounded border border-[#282D45] bg-[#0E1330] py-[30px] pl-[30px] pr-[40px]"
              >
                <Icon
                  iconName="community"
                  alt="Community"
                  width={45}
                  height={45}
                  className="pb-[30px]"
                />
                <div className="flex flex-col gap-3">
                  <h6 className="text-2xl leading-8">{feature.title}</h6>
                  <p className="text-base leading-6 text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
