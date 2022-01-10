import { LineChart, Line } from "recharts";
const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 800, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 1200, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 1400, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 1800, pv: 2400, amt: 2400 },
];

function Component() {
  return (
    <LineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
  );
}

export default Component;
