import { ChartOne } from '@/components/charts/ChartOne';
import { ChartThree } from '@/components/charts/ChartThree';
import { ChartTwo } from '@/components/charts/ChartTwo';
export default async function DashboardPage() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </div>
  );
}
