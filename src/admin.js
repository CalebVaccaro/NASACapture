// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAhTVpK_0bTIntviKDy4fZAgYvC6Ze02Eg",
    authDomain: "nasacapture.firebaseapp.com",
    databaseURL: "https://nasacapture.firebaseio.com",
    projectId: "nasacapture",
    storageBucket: "nasacapture.appspot.com",
    messagingSenderId: "774102737935",
    appId: "1:774102737935:web:f511eb0a5f2167dc81af7a",
    measurementId: "G-NWQB8PQT98"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

console.log(firebase); // verify that firebase is loaded by logging the global it created for us

// #1 - get a reference to the databse
let database = firebase.database();

// #2 - refer to a root node named `scores`
let ref = database.ref('data');

// #3 - create some data
let data = {
dataset: app.dataset,
noteset: app.noteset
};

console.log(data);

// #4 - send data, in this case we are adding it to the `scores` node
// ref.push(data);