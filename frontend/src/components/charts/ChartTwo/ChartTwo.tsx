'use client';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
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

export function ChartTwo() {
  return (
    <Card className="border-[#282D45] bg-[#0E1330] transition-all duration-300 hover:border-[#32CAFD]/50">
      <CardHeader className="pb-4">
        <CardTitle className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-xl font-semibold text-transparent">
          Monthly Metrics
        </CardTitle>
        <CardDescription className="text-gray-400">
          Comparative analysis for January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid
              vertical={false}
              stroke="#282D45"
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: '#7E808F', fontSize: 12 }}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dashed"
                  className="border-[#282D45] bg-[#1A1F3A]"
                />
              }
            />
            <Bar
              dataKey="desktop"
              fill="#7214FF"
              radius={6}
              className="transition-all duration-300 hover:opacity-80"
            />
            <Bar
              dataKey="mobile"
              fill="#32CAFD"
              radius={6}
              className="transition-all duration-300 hover:opacity-80"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 pt-4 text-sm">
        <div className="flex gap-2 font-medium leading-none text-[#7214FF]">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-gray-400">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
