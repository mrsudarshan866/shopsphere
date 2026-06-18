import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: any[];
}

export default function RevenueChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line type="monotone" dataKey="revenue" />
      </LineChart>
    </ResponsiveContainer>
  );
}
