'use client';
import WhiteLogo from '@/public/images/logos/white_on_trans.png';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formHandlerAction } from '@/actions/newsletterAction';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import clsx from 'clsx';
import { newsletterSchema } from '@/lib/schemas/newsletterSchema';

export const NewsLetter = () => {
  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(values: z.infer<typeof newsletterSchema>) {
    await formHandlerAction(values);
    form.reset();
  }
  return (
    <section>
      <div>
        <div className="mb-[35px] max-w-[70px]">
          <Image src={WhiteLogo} alt="White Logo" />
        </div>
        <Card className="bg-[#0E1330] px-[30px] py-10">
          <CardHeader className="p-0 pb-[19px]">
            <CardTitle className="text-2xl leading-7">
              Subscribe to our newsletter
            </CardTitle>
          </CardHeader>
          <CardContent className="w-auto p-0 pb-[10px] sm:w-[333px]">
            <Form {...form}>
              <form
                id="newsletter-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="h-[72px]">
                      <FormControl>
                        <Input
                          placeholder="Email"
                          className={clsx('h-11', {
                            'border-destructive focus-visible:ring-destructive':
                              form.formState.errors.email,
                          })}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="p-0">
            <Button
              form="newsletter-form"
              disabled={form?.formState?.isSubmitting}
              type="submit"
              variant="default"
              size={'lg'}
              className="h-11 w-full"
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
