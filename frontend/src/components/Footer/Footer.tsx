import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { NewsLetter } from './partials/NewsLetter';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import {
  FacebookIcon,
  GithubIcon,
  Instagram,
  LinkedinIcon,
} from 'lucide-react';

const pages = [
  {
    title: 'Pages',
    pages: [
      {
        title: 'Home',
        href: '/',
      },
      {
        title: 'About',
        href: '/about',
      },
      {
        title: 'Services',
        href: '/services',
      },
      {
        title: 'Contact',
        href: '/contact',
      },
      {
        title: 'Pricing',
        href: '/pricing',
      },
    ],
  },
  {
    title: 'Legal',
    pages: [
      {
        title: 'FAQ',
        href: '/faq',
      },
      {
        title: 'Privacy Policy',
        href: '/privacy-policy',
      },
      {
        title: 'Terms of Service',
        href: '/terms-of-service',
      },
    ],
  },
  {
    title: 'Social',
    pages: [
      {
        title: 'GitHub',
        href: '',
      },
      {
        title: 'Facebook',
        href: '',
      },
      {
        title: 'Twitter',
        href: '',
      },
    ],
  },
];

export const Footer: FC = () => {
  return (
    <footer className="relative m-auto mt-20 max-w-[81.5rem] px-10 pb-10">
      <div className="footer flex w-full flex-col items-start justify-between gap-20 text-white lg:flex-row">
        <div>
          <NewsLetter />
        </div>
        <div className="w-full lg:hidden">
          {pages?.map((page, index) => (
            <Accordion className="w-full" type="multiple" key={index}>
              <AccordionItem value={page.title}>
                <AccordionTrigger className="text-xl leading-8">
                  {page.title}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  {page.pages.map((item, index) => (
                    <Link key={index} href={item.href}>
                      {item.title}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
        <div className="hidden items-start justify-center space-x-32 pt-7 lg:flex xl:space-x-40">
          {pages.map((page, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-start gap-[25px]"
            >
              <h2 className="pb-4 text-xl leading-8">{page.title}</h2>
              {page.pages.map((item, index) => (
                <Link key={index} href={item.href}>
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex w-full flex-col items-center justify-between gap-5 border-t border-[#282D45] pt-10 lg:flex-row">
        <p className="text-center">
          Copyright © Product | Designed by Webocean LTD - Powered by Webflow
        </p>
        <div className="flex items-center justify-end gap-3">
          <Button className="px-[10px]" variant={'outline'} asChild>
            <Link target="_blank" href="https://instagram.com">
              <Instagram />
            </Link>
          </Button>
          <Button className="px-[10px]" variant={'outline'} asChild>
            <Link target="_blank" href="https://facebook.com">
              <FacebookIcon />
            </Link>
          </Button>
          <Button className="px-[10px]" variant={'outline'} asChild>
            <Link target="_blank" href="https://github.com">
              <GithubIcon />
            </Link>
          </Button>
          <Button className="px-[10px]" variant={'outline'} asChild>
            <Link target="_blank" href="https://linkedin.com">
              <LinkedinIcon />
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/3 -z-10 h-[226px] w-[274px] -translate-x-1/2 transform bg-[#7214FF] blur-[250px]"></div>
    </footer>
  );
};
