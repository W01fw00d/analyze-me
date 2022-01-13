export async function getContributions(token, username) {
  const headers = {
    Authorization: `bearer ${token}`,
  };

  // TODO: make this dynamic
  const THIS_MONTH_1ST_DATE = "2022-01-01T00:00:00Z";
  const THIS_MONTH_LAST_DATE = "2022-01-31T00:00:00Z";

  const body = {
    query: `query {
            user(login: "${username}") {
              name
              contributionsCollection(from: "${THIS_MONTH_1ST_DATE}" to: "${THIS_MONTH_LAST_DATE}") {
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

  return [].concat.apply(
    [],
    result.data.user.contributionsCollection.contributionCalendar.weeks.map(
      (week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
        }))
    )
  );
}
