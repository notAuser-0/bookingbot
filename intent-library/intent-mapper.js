const addUser = require("./intents/addUser");
const authorisePIN = require("./intents/authorisePIN");
const checkMobileRegistered = require("./intents/checkMobileRegistered");
const checkStatus = require("./intents/checkStatus");
const fallback = require("./intents/fallback");
const getMatchDetails = require("./intents/getMatchDetails");
const getMatches = require("./intents/getMatches");
const welcome = require("./intents/welcome");

let mapper = {
  "Welcome Intent": require("./intents/welcome"),
  Fallback: fallback,
  "bookTicket - getMatches": getMatcheShedules,
  "bookTicket -chooseMatch": getMatchDetails,
  "bookTicket-auth-mobile": checkMobileRegistered,
  "bookTicket-auth-PIN": authorisePIN,
  "registerUser-PIN": addUser,
  "checkStatus-auth": checkStatus,
};

const intents = (intent) => {
  const mappedIntent = mapper[intent];
  if (mappedIntent) {
    return mappedIntent;
  } else {
    return undefined;
  }
};

module.exports = intents;
