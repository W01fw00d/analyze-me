import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label } from "recharts";

import githubSecrets from "../../secrets/github";
import { getContributions } from "./model";

function Component() {
  const [data, setData] = useState();

  useEffect(() => {
    getContributions(githubSecrets.token, githubSecrets.username).then(
      (data) => {
        setData({
          name: data.name,
          month: data.month,
          contributions: data.contributions.map((day) => ({
            date: day.date.split("-")[2],
            count: day.count,
          })),
        });
      }
    );
  }, []);

  const Graph = ({ chartData }) => (
    <LineChart width={900} height={500} data={chartData}>
      <Line type="monotone" dataKey="count" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date">
        <Label value="Date" position="insideTopLeft" offset={23} />
      </XAxis>
      <YAxis>
        <Label
          value="Nº Contributions"
          position="insideBottomLeft"
          offset={28}
          angle={-90}
        />
      </YAxis>
    </LineChart>
  );

  return data === undefined ? (
    <>
      <p> Loading... </p>
      <Graph />
    </>
  ) : (
    <>
      <p>
        {" "}
        {data.name}'s stats for this month ({data.month}):
      </p>
      <Graph chartData={data.contributions} />
    </>
  );
}

export default Component;
