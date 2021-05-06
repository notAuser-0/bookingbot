"use strict";

const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");
const intentMapper = require("./intent-mapper");

admin.initializeApp({
  apiKey: "AIzaSyAKJT2h5kTHveD6EvzYuPi97p7NwmVnrkY",
  authDomain: "nothinghere.firebaseapp.com",
  projectId: "nothinghere",
  storageBucket: "nothinghere.appspot.com",
  messagingSenderId: "159795927425",
  appId: "1:159795927425:web:ebd9d5c686541f7e87f080",
});

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  (request, response) => {
    const agent = new WebhookClient({ request, response });

    console.log(
      "Dialogflow Request body: " + JSON.stringify(request.body, null, 4)
    );

    let intentMap = new Map();
    let intent = intentMapper(agent.intent);
    console.log(intent)
    intentMap.set(agent.intent, intent);
    agent.handleRequest(intentMap);
  }
);
