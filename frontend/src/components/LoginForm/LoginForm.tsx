'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import clsx from 'clsx';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Checkbox } from '../ui/checkbox';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import { loginSchema } from '@/lib/schemas/loginSchema';
import { useAuth } from '@/hooks/useAuth';

export const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { loginHandler } = useAuth();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const action = await loginHandler(values);

    if (!action.success) {
      setError(action.message || 'An error occurred');
      return;
    }

    router.push('/profile');
    form.reset();
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      const response = await fetch('/api/auth/google');
      const data = await response.json();

      window.location.href = data.url;
    } catch (error) {
      console.error('Failed to get Google auth URL:', error);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0A0F1F] to-[#1a1f3d] p-4">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl">
        <div className="w-full max-w-md space-y-6 bg-white p-10 dark:bg-[#0E1330] dark:text-white md:p-12">
          <div className="flex justify-center">
            <Image
              src="/images/logos/original.png"
              alt="Momentum Logo"
              width={150}
              height={60}
              className="h-auto"
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-center text-3xl font-bold tracking-tight">
              Welcome back
            </h1>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Sign in to continue to your account
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900 dark:text-red-100">
              {error}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          className={clsx(
                            'h-12 rounded-lg border-gray-300 bg-white pl-10 text-gray-900 transition-all focus-visible:ring-2 focus-visible:ring-[#7214FF] dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500',
                            {
                              'border-red-500 focus-visible:ring-red-500':
                                form.formState.errors.email,
                            },
                          )}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs font-medium text-[#7214FF] hover:text-[#5A0FD9]"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className={clsx(
                            'h-12 rounded-lg border-gray-300 bg-white pl-10 pr-10 text-gray-900 transition-all focus-visible:ring-2 focus-visible:ring-[#7214FF] dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500',
                            {
                              'border-red-500 focus-visible:ring-red-500':
                                form.formState.errors.password,
                            },
                          )}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded border-gray-300 data-[state=checked]:bg-[#7214FF] data-[state=checked]:text-white dark:border-gray-600"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-600 dark:text-gray-400">
                          Remember me
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-12 w-full rounded-lg bg-[#7214FF] text-white transition-all hover:bg-[#5A0FD9] focus:ring-2 focus:ring-[#7214FF] focus:ring-offset-2"
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500 dark:bg-[#0E1330] dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-12 w-full rounded-lg border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <div className="flex items-center justify-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
                Connecting...
              </div>
            ) : (
              <>
                <FcGoogle className="mr-2 h-5 w-5" />
                Continue with Google
              </>
            )}
          </Button>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-[#7214FF] hover:text-[#5A0FD9]"
            >
              Create one
            </Link>
          </div>
        </div>

        <div
          className="hidden w-1/2 bg-cover bg-center md:block"
          style={{ backgroundImage: "url('/images/auth-background.jpg')" }}
        >
          <div className="flex h-full items-center bg-black/40 p-12">
            <div className="max-w-md text-white">
              <h2 className="mb-6 text-3xl font-bold">
                Boost your productivity
              </h2>
              <p className="text-lg">
                Start managing your tasks efficiently with Momentum
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
