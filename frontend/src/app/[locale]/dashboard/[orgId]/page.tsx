import { ChartOne } from '@/components/charts/ChartOne';
import { ChartThree } from '@/components/charts/ChartThree';
import { ChartTwo } from '@/components/charts/ChartTwo';

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative">
        <h2 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-3xl font-bold text-transparent lg:text-4xl">
          Analytics Overview
        </h2>
        <p className="mt-2 text-lg text-gray-400">
          Monitor your team&apos;s performance and track key metrics in
          real-time
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <ChartOne />
        </div>
        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <ChartTwo />
        </div>
      </div>

      {/* Full-width Chart */}
      <div className="transform transition-all duration-300 hover:scale-[1.01]">
        <ChartThree />
      </div>

      {/* Additional Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-[#282D45] bg-[#0E1330] p-6 transition-all duration-300 hover:border-[#7214FF] hover:bg-[#1A1F3A]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-200">
              Active Projects
            </h3>
            <div className="h-3 w-3 rounded-full bg-[#32CAFD]"></div>
          </div>
          <p className="mt-2 text-3xl font-bold text-[#32CAFD]">24</p>
          <p className="text-sm text-gray-400">+12% from last month</p>
        </div>

        <div className="rounded-lg border border-[#282D45] bg-[#0E1330] p-6 transition-all duration-300 hover:border-[#7214FF] hover:bg-[#1A1F3A]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-200">
              Team Members
            </h3>
            <div className="h-3 w-3 rounded-full bg-[#7214FF]"></div>
          </div>
          <p className="mt-2 text-3xl font-bold text-[#7214FF]">8</p>
          <p className="text-sm text-gray-400">2 new this week</p>
        </div>

        <div className="rounded-lg border border-[#282D45] bg-[#0E1330] p-6 transition-all duration-300 hover:border-[#32CAFD] hover:bg-[#1A1F3A]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-200">
              Completion Rate
            </h3>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <p className="mt-2 text-3xl font-bold text-green-500">92%</p>
          <p className="text-sm text-gray-400">Above target by 7%</p>
        </div>
      </div>
    </div>
  );
}
