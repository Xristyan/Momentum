'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LogOut, Menu, User } from 'lucide-react';
import { FC } from 'react';
import Link from 'next/link';
import { useUser } from '@/providers/userProvider/UserProvider';
import { useAuth } from '@/hooks/useAuth';
import { useDisclouser } from '@/hooks/useDisclouser/useDisclouser';
export const DrawerMenu: FC = () => {
  const { user } = useUser();
  const { logoutHandler } = useAuth();
  const { isOpen, setIsOpen, onClose } = useDisclouser();

  const handleLogout = async () => {
    await logoutHandler();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="lg:hidden" variant="link">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Momentum Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-4">
          {user ? (
            <>
              <SheetClose asChild>
                <Button
                  className="w-full justify-start text-lg"
                  variant="ghost"
                  asChild
                >
                  <Link href="/profile" className="flex items-center gap-2">
                    <User size={18} />
                    Profile
                  </Link>
                </Button>
              </SheetClose>
              <Button
                className="w-full justify-start text-lg"
                variant="ghost"
                onClick={() => {
                  onClose();
                  handleLogout();
                }}
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <SheetClose asChild>
                <Button
                  className="w-full justify-start text-lg"
                  variant="ghost"
                  asChild
                >
                  <Link href="/login">Sign In</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  className="w-full justify-start text-lg"
                  variant="default"
                  asChild
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </SheetClose>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
