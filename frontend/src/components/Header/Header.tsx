'use client';

import * as React from 'react';

import { Button } from '../ui/button';

import Image from 'next/image';
import BlackLogo from '../../../public/images/logos/black_on_trans.png';
import WhiteLogo from '../../../public/images/logos/white_on_trans.png';
import { NavMenu } from './partials/NavMenu';
import { DrawerMenu } from './partials/DrawerMenu';
import Link from 'next/link';
import { useUser } from '@/providers/userProvider/UserProvider';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const { user } = useUser();
  const { logoutHandler } = useAuth();

  return (
    <header className="fixed top-0 z-50 h-[75px] w-full">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between border-b bg-background px-4 pb-2 pt-3 sm:px-6 lg:px-8">
        <Link href="/" className="max-w-[70px]">
          <Image
            src={WhiteLogo}
            alt="Mpmentum Logo"
            className="hidden h-full w-full dark:block"
          />
          <Image
            src={BlackLogo}
            alt="Mpmentum Logo"
            className="h-full w-full dark:hidden"
          />
        </Link>
        <NavMenu />
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Button
                className="spacing- hidden items-center gap-1 text-[16px] tracking-wider lg:flex"
                variant="link"
                asChild
              >
                <Link href="/profile">
                  <User size={16} />
                  Profile
                </Link>
              </Button>
              <Button
                variant="default"
                className="tracking-wider"
                size="lg"
                onClick={logoutHandler}
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                className="spacing- hidden text-[16px] tracking-wider lg:block"
                variant="link"
                asChild
              >
                <Link href="/login">sign in</Link>
              </Button>
              <Button
                variant="default"
                className="tracking-wider"
                size="lg"
                asChild
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}
          <DrawerMenu />
        </div>
      </div>
    </header>
  );
}
