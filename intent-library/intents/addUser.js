const { getMatches, db, updateData } = require("../../database/db");

module.exports = addUser = (agent) => {
  const matches = getMatches();
  const context = agent.contexts.find(
    (element) => element.name === "book_ticket"
  );
  const matchDetails = matches.find(
    (m) => m["match-id"] === context.parameters["match-id"]
  );

  console.log(context, matchDetails);

  if(context.parameters.pin.length !== 4) {
    agent.add("Please enter 4 digit number");
    agent.context.set({
      name: "add_user",
      lifespan: 3,
      parameters: {
        "mobile-number": context.parameters["mobile-number"],
      },
    });
    return;
  }

  db.collection("users").doc().set({
    name: context.parameters["person-name"].name,
    "mobile-number": context.parameters["mobile-number"],
    PIN: context.parameters.pin,
  });

  db.collection("bookings").doc().set({
    mobile: context.parameters["mobile-number"],
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

  agent.add(`Congratulations ${context.parameters["person-name"].name}`);
  agent.add(
    `Your booking for match ${matchDetails.teams} is successfull with ${context.parameters["mobile-number"]}.`
  );
};
