const welcome = (agent) => {
  agent.add(`Hi, I am BookBot.`);
  agent.add(
    `I can assist you to book tickets and check status of a football match.`
  );
  agent.add(`What do you want me to do?`);
};

module.exports = welcome;