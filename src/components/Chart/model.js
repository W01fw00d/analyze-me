export async function getContributions(token, username) {
  const headers = {
    Authorization: `bearer ${token}`,
  };

  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds

  const toISOStringWithTZOffset = (date) =>
    new Date(date - tzoffset).toISOString().slice(0, -1);

  const thisMonth1stDate = toISOStringWithTZOffset(firstDay);
  const thisMonthLastDate = toISOStringWithTZOffset(lastDay);

  const body = {
    query: `query {
            user(login: "${username}") {
              name
              contributionsCollection(from: "${thisMonth1stDate}" to: "${thisMonthLastDate}") {
                contributionCalendar {
                  weeks {
                    contributionDays {
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
  const result = await response.json();

  const user = result.data.user;

  return {
    name: user.name,
    month: date.toLocaleString("en-EN", { month: "long" }),
    contributions: [].concat.apply(
      [],
      user.contributionsCollection.contributionCalendar.weeks.map((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
        }))
      )
    ),
  };
}
