const { getMatches, getUsers, getTickets } = require("../../database/db");

module.exports = checkStatus = (agent) => {
  const context = agent.contexts.find(
    (element) => element.name === "status_check"
  );

  const users = getUsers();
  const matches = getMatches();
  const bookings = getTickets();

  const user = users.filter(
    (u) => u["mobile-number"] === context.parameters["phone-number"]
  );
  console.log(context, user);
  if (user.length) {
    if (user[0].PIN === context.parameters.PIN) {
      const matchs = bookings.filter(
        (ticket) => ticket.mobile === context.parameters["phone-number"]
      );
      if (matchs.length !== 0) {
        agent.add("Your Bookings are:");
        matchs.forEach((match) => {
          const matchDeatils = matches.find(
            (m) => m["match-id"] === match["match-id"]
          );
          agent.add(
            `${matchDeatils["match-id"]}    ${match.teams} on ${matchDeatils.date}`
          );
        });
        agent.add("Have a nice Day!");
      } else {
        agent.add("You don't have any tickets booked yet.");
      }
    } else {
      agent.add("Sorry I can't verify your profile.");
    }
  } else {
    agent.add(
      "Please register this mobile with us before checking the status."
    );
  }
};
