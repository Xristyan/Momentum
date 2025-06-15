'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#7214FF',
  },
  mobile: {
    label: 'Mobile',
    color: '#32CAFD',
  },
} satisfies ChartConfig;

export function ChartOne() {
  return (
    <Card className="border-[#282D45] bg-[#0E1330] transition-all duration-300 hover:border-[#7214FF]/50">
      <CardHeader className="pb-4">
        <CardTitle className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-xl font-semibold text-transparent">
          Team Performance
        </CardTitle>
        <CardDescription className="text-gray-400">
          Desktop vs Mobile engagement for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="desktopGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7214FF" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#7214FF" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="mobileGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#32CAFD" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#32CAFD" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#282D45"
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: '#7E808F', fontSize: 12 }}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  className="border-[#282D45] bg-[#1A1F3A]"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#mobileGradient)"
              fillOpacity={1}
              stroke="#32CAFD"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#desktopGradient)"
              fillOpacity={1}
              stroke="#7214FF"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="pt-4">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none text-[#32CAFD]">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-gray-400">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
