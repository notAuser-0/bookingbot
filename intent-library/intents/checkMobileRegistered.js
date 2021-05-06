const { getUsers } = require("../../database/db");

module.exports=checkMobileRegistered = (agent) => {
  const context = agent.contexts.find(
    (element) => element.name === "book_ticket"
  );
  const registered = getUsers().filter(
    (user) => user["mobile-number"] === context.parameters["mobile-number"]
  );
  if (registered.length) {
    agent.add("Thank you. Please verify your 4 digit security PIN");
    agent.context.set({
      name: "auth_user",
      lifespan: 3,
      parameters: {
        "mobile-number": context.parameters["mobile-number"],
      },
    });
  } else {
    agent.add(
      "You are not registered with us. Please share your full name to complete your booking process."
    );
    agent.context.set({
      name: "add_user",
      lifespan: 1,
      parameters: {
        "mobile-number": context.parameters["mobile-number"],
      },
    });
  }
};
