import React, { useEffect, useState } from "react";

import { LineChart, Line } from "recharts";

import githubSecrets from "../secrets/github";

function Component() {
  const [data, setData] = useState();

  async function getContributions(token, username) {
    const headers = {
      Authorization: `bearer ${token}`,
    };
    const body = {
      query: `query {
            user(login: "${username}") {
              name
              contributionsCollection {
                contributionCalendar {
                  colors
                  totalContributions
                  weeks {
                    contributionDays {
                      color
                      contributionCount
                      date
                      weekday
                    }
                    firstDay
                  }
                }
              }
            }
          }`,
    };
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getContributions(githubSecrets.token, githubSecrets.username).then(
      (data) => {
        console.log(data);

        // TODO: display a Chart with this month's contributions per day

        const fakeData = [
          { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
          { name: "Page A", uv: 800, pv: 2400, amt: 2400 },
          { name: "Page A", uv: 1200, pv: 2400, amt: 2400 },
          { name: "Page A", uv: 1400, pv: 2400, amt: 2400 },
          { name: "Page A", uv: 1800, pv: 2400, amt: 2400 },
        ];

        setData(fakeData);
      }
    );
  }, []);

  return data === undefined ? (
    <span>Loading...</span>
  ) : (
    <LineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
  );
}

export default Component;
