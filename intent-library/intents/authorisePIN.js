const { getUsers, getTickets, getMatches, db } = require("../../database/db");

module.exports = authorisePIN = (agent) => {
  const users = getUsers();
  const matches = getMatches();
  const bookings = getTickets();

  const context = agent.contexts.find(
    (element) => element.name === "book_ticket"
  );
  const user = users.filter(
    (u) => u["mobile-number"] === context.parameters["mobile-number"]
  );
  if (agent.parameters.pin.length === 4) {
    if (user[0].PIN === agent.parameters.pin) {
      const match = bookings.filter(
        (ticket) =>
          ticket["match-id"] === context.parameters["match-id"] &&
          ticket.mobile === user[0]["mobile-number"]
      );
      if (match.length === 0) {
        const matchDetails = matches.find(
          (m) => m["match-id"] === context.parameters["match-id"]
        );
        agent.add(`Congratulations ${user[0].name},`);
        agent.add(
          `Your ticket for match between ${match.teams} is booked successfully!`
        );
        db.collection("bookings").doc().set({
          mobile: user[0]["mobile-number"],
          teams: matchDetails.teams,
          "match-id": matchDetails["match-id"],
        });
        const matchRefs = db
          .collection("matches")
          .where("teams", "==", matchDetails.teams)
          .get();
        matchRefs.then((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            db.collection("matches")
              .doc(doc.id)
              .update({
                slots: doc.data().slots - 1,
              });
          });
        });
        updateData();
      } else {
        agent.add(`Dear ${user[0].name},`);
        agent.add(`You have previously booked the ticket of the same match.`);
      }
    } else {
      agent.add("Incorrect PIN.");
      agent.context.set({
        name: "auth_user",
        lifespan: 3,
        parameters: {
          "mobile-number": context.parameters["mobile-number"],
        },
      });
    }
  } else {
    agent.add("Please provide valid 4 digit security PIN.");
    agent.context.set({
      name: "auth_user",
      lifespan: 3,
      parameters: {
        "mobile-number": context.parameters["mobile-number"],
      },
    });
    agent.context.set({
      name: "book_ticket",
      lifespan: 3,
      parameters: {
        "mobile-number": context.parameters["mobile-number"],
      },
    });
  }
};
