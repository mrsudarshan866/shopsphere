import { useQuery } from "@tanstack/react-query";

import Sidebar from "../../components/admin/Sidebar";
import StatCard from "../../components/admin/StatCard";
import RevenueChart from "../../components/admin/RevenueChart";

import { getDashboardStats } from "../../services/admin.service";

export default function DashboardPage() {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardStats,
  });

  return (
    <div className="flex">
      <Sidebar />

      <main
        className="
        flex-1
        p-8
        bg-slate-100
        "
      >
        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Dashboard
        </h1>

        <div
          className="
          grid
          md:grid-cols-4
          gap-6
          mt-8
          "
        >
          <StatCard title="Revenue" value={data?.revenue || 0} />

          <StatCard title="Orders" value={data?.orders || 0} />

          <StatCard title="Users" value={data?.users || 0} />

          <StatCard title="Products" value={data?.products || 0} />
        </div>

        <div className="mt-10">
          <RevenueChart data={data?.monthlyRevenue || []} />
        </div>
      </main>
    </div>
  );
}
