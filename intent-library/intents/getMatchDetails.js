const { getMatches } = require("../../database/db");

module.exports = getMatchDetails = (agent) => {
  const matches = getMatches();
  const matchNumber = agent.parameters["match-number"];
  console.log(matchNumber);
  if (matchNumber > 0 && matchNumber < 4) {
    agent.add(
      `Please provide your mobile number to confirm booking for match id ${
        matches[matchNumber - 1]["match-id"]
      }.`
    );
    agent.context.set({
      name: "book_ticket",
      lifespan: 1,
      parameters: {
        "match-id": matches[matchNumber - 1]["match-id"],
      },
    });
  } else {
    agent.add("Please provide correct match number");
  }
};
