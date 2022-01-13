import React, { useEffect, useState } from "react";
import { LineChart, Line } from "recharts";

import githubSecrets from "../../secrets/github";
import { getContributions } from "./model";

function Component() {
  const [data, setData] = useState();

  useEffect(() => {
    getContributions(githubSecrets.token, githubSecrets.username).then(
      (data) => {
        // TODO: display a Chart with this month's contributions per day

        setData(data.map((day) => ({ name: day.date, count: day.count })));
      }
    );
  }, []);

  return data === undefined ? (
    // TODO: display amb empty LineChart
    <span>Loading...</span>
  ) : (
    <LineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey="count" stroke="#8884d8" />
    </LineChart>
  );
}

export default Component;
