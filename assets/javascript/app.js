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
  var nextArrival = "";
  var minsAway = "";

// Capture button click
$("#submit-btn").on("click", function(event){
    event.preventDefault();
    
    // Grabbed values from text-boxes
    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#first-train-time").val().trim();
    frequency = $("#frequency").val().trim();

    // Moment.js function to convert and calculate the arrival time
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    
    var currentTime = moment();
    console.log("Currently: " + moment(currentTime).format("hh:mm"));
    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in Time: " + diffTime);
    
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    
    var minutesTillTrain = frequency - tRemainder;
    console.log("Minutes until Train: " + minutesTillTrain);
    
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    console.log("Arrival: " + moment(nextTrain).format("hh:mm"));

    // Code for setting values in the database
    database.ref().push({
      name: name,
      destination: destination,
      firstTime: firstTimeConverted,
      frequency: frequency,
      nextArrival: nextTrain,
      minsAway: minutesTillTrain
    });
  });

  // Firebase watcher
  database.ref().on("child_added", function(snapshot) {

    // Log everything that's coming out of snapshot
    var sv = snapshot.val();
    console.log(sv);
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.firstTime);
    console.log(sv.frequency);
    console.log(sv.nextArrival)
    console.log(sv.minsAway)

    // Append the information taken from the user input to the train schedule table
    $("#results-body").append("<tr><td>" + sv.name + "</td><td>" + sv.destination + "</td><td>" + sv.frequency + "</td><td>" + sv.nextArrival + "</td><td>" + sv.minsAway + "</td></tr>");



  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);


});