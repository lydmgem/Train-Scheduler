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

// Capture button click
$("#submit-btn").on("click", function(event){
    event.preventDefault();
    
    // Grabbed values from text-boxes
    var name = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTime = $("#first-train-time").val().trim();
    var frequency = $("#frequency").val().trim();

    console.log(name);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);

    // Append the information taken from the user input to the train schedule table
    $("#results-body").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + firstTime + "</td><td>" + frequency + "</td></tr>");

    // Appending the information from Firebase to the train schedule table

});