const { getMatches } = require("../../database/db");

module.exports = getMatcheShedules = (agent) => {
  const matches = getMatches();
  agent.add(`Upcoming matches are ...`);
  for (let i = 0; i < 3 && i < matches.length; i++) {
    agent.add(`Match ${i + 1} ${matches[i].teams} on ${matches[i].date}`);
  }
  agent.add(`Pick a match.`);
};
