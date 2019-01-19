// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD2h2mnT9QGBQHZmQc2fJMYIbMc9v1ZQVc",
    authDomain: "class-example-fac60.firebaseapp.com",
    databaseURL: "https://class-example-fac60.firebaseio.com",
    projectId: "class-example-fac60",
    storageBucket: "class-example-fac60.appspot.com",
    messagingSenderId: "1002091060136"
  };
  firebase.initializeApp(config);

// Variable to reference database
  var database = firebase.database();

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

    // Code for handling the set
    database.ref().push().set({
      name: name,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency
    });

    
  });
  // Firebase watcher + initial loader for .on("value")
  database.ref().on("value", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTime);
    console.log(snapshot.val().frequency);

  });

  // Firebase watcher .on("child_added")
  database.ref().on("child_added", function(snapshot) {
    // var sv = snapshot.val();
    
    // console.log(sv.name);
    // console.log(sv.destination);
    // console.log(sv.firstTime);
    // console.log(sv.frequency);
    
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code)


    // Append the information taken from the user input to the train schedule table
    $("#results-body").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minsAway + "</td></tr>");
});