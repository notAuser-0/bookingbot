const firebase = require("firebase/app");
const firestore = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAKJT2h5kTHveD6EvzYuPi97p7NwmVnrkY",
  authDomain: "nothinghere.firebaseapp.com",
  projectId: "nothinghere",
  storageBucket: "nothinghere.appspot.com",
  messagingSenderId: "159795927425",
  appId: "1:159795927425:web:ebd9d5c686541f7e87f080",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
let users, matches, bookings;

function updateData() {
  const userRef = db.collection("users").get();

  const matchRef = db.collection("matches").where("slots", "!=", 0).get();

  const ticketRef = db.collection("bookings").get();

  userRef.then((querySnapshot) => {
    users = querySnapshot.docs.map((doc) => doc.data());
  });

  matchRef.then((querySnapshot) => {
    matches = querySnapshot.docs.map((doc) => doc.data());
    matches.sort(
      (a, b) =>
        parseInt(a["match-id"].replace("#", "")) -
        parseInt(b["match-id"].replace("#", ""))
    );
  });

  ticketRef.then((querySnapshot) => {
    bookings = querySnapshot.docs.map((doc) => doc.data());
  });
}

exports.getUsers = getUsers = () => {
  return users;
};

exports.getMatches = getMatches = () => {
  return matches;
};

exports.getTickets = getTickets = () => {
  return bookings;
};
updateData();
exports.updateData = updateData;
exports.db = db;
