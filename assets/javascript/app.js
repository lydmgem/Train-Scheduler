// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDPJW-7jdhConoe730Gl_UGJpLIYr15N5U",
    authDomain: "train-scheduler-4922e.firebaseapp.com",
    databaseURL: "https://train-scheduler-4922e.firebaseio.com",
    projectId: "train-scheduler-4922e",
    storageBucket: "",
    messagingSenderId: "319232283463"
  };
  firebase.initializeApp(config);

// Variable to reference database
  var database = firebase.data();

// Initial values for the input fields
  var name = "";
  var destination = "";
  var firstTime = "";
  var frequency = "";

// Capture button click
$("#submit-btn").on("click", function(event){
    event.preventDefault();
    
    // Grabbed values from text-boxes
    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#first-train-time").val().trim();
    frequency = $("#frequency").val().trim();

    console.log(name);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);

    // Code for handling the push
    database.ref().push({
      name: name,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency
    });

  });

// Firebase watcher .on("child_added")
database.ref().on("child_added", function(snapshot) {
  var sv = snapshot.val();

  console.log(sv.name);
  console.log(sv.destination);
  console.log(sv.firstTime);
  console.log(sv.frequency);

  // Append the information taken from the user input to the train schedule table
  $("#results-body").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minsAway + "</td></tr>");

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code)
});