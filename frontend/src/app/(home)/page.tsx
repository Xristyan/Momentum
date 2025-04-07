import Image from 'next/image';
import HeroImage from '@/public/images/freepik__upload__68454-Photoroom (1).png';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Link from 'next/link';

export default async function Home() {
  return (
    <section className="flex max-w-[76.5rem] flex-col items-center pt-8 font-[family-name:var(--font-geist-sans)] lg:pt-16">
      <section className="relative m-auto flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-7">
          <Link href="/profile">clicl here</Link>
          <h1 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-center text-5xl text-transparent lg:text-6xl">
            A CRM dashboard for engineering teams
          </h1>
          <p className="mt-0 max-w-[800px] text-center text-lg text-gray-500 lg:mt-4">
            Rorem ipsum dolor sit amet consectetur. Gravida convallis orci
            ultrices non. Ultricies tempor at ut cursus mi. Aliquam sed amet
            vitae orci ac penatibus consectetur.{' '}
          </p>
          <div className="flex items-start justify-center gap-8">
            <Button variant={'default'} size={'lg'}>
              Get Started
            </Button>
            <Button variant={'default'} size={'lg'}>
              View Pricing
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
            Rorem ipsum dolor sit amet consectetur. Gravida convallis orci
            ultrices non. Ultricies tempor at ut cursus mi. Aliquam sed amet
            vitae orci ac penatibus consectetur.{' '}
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
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="max-w-80 sm:max-w-sm">
                <div className="p-1">
                  <div
                    key={index}
                    className="rounded border border-[#282D45] bg-[#0E1330] py-[30px] pl-[30px] pr-[40px]"
                  >
                    <Image
                      src="/icons/community.svg"
                      width={45}
                      height={45}
                      alt=""
                      className="pb-[30px]"
                    />
                    <div className="flex flex-col gap-3">
                      <h6 className="text-2xl leading-8">User information</h6>
                      <p className="text-base leading-6 text-gray-500">
                        Borem ipsum dolor sit amet consectetur. Turpis tristique
                        nulla posuere et amet arcu dictum ultricies convallis.
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="hidden grid-cols-3 justify-items-center gap-10 lg:grid">
          {Array.from({ length: 6 }).map((_, index) => {
            return (
              <div
                key={index}
                className="rounded border border-[#282D45] bg-[#0E1330] py-[30px] pl-[30px] pr-[40px]"
              >
                <Image
                  src="/icons/community.svg"
                  width={45}
                  height={45}
                  alt=""
                  className="pb-[30px]"
                />
                <div className="flex flex-col gap-3">
                  <h6 className="text-2xl leading-8">User information</h6>
                  <p className="text-base leading-6 text-gray-500">
                    Borem ipsum dolor sit amet consectetur. Turpis tristique
                    nulla posuere et amet arcu dictum ultricies convallis.
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
