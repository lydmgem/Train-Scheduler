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
    tname = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#first-train-time").val().trim();
    frequency = $("#frequency").val().trim();

    // Object for any new train input
    var newTrain = {
      name: tname,
      dest: destination,
      first: firstTime,
      freq: frequency
    };
    
    console.log(newTrain);
    
    // Push the input information to the firebase database
    database.ref().push(newTrain);

    // Clear all input fields after submitting
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");

    return false;
  });
  
  // Firebase watcher
  database.ref().on("child_added", function(snapshot) {
    
    // Log everything that's coming out of snapshot
    var sv = snapshot.val();
    console.log(sv);
    console.log(sv.name);
    console.log(sv.dest);
    console.log(sv.first);
    console.log(sv.freq);
    
    // Moment.js function to convert and calculate the arrival time
    // First Train Time
    var firstTimeConverted = moment(sv.first, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    
    // Current Time
    var currentTime = moment();
    console.log("Currently: " + moment(currentTime).format("hh:mm"));
    
    // Difference between the first train time to now
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in Time: " + diffTime);
    
    // Time apart
    var tRemainder = diffTime % sv.freq;
    console.log(tRemainder);
    
    // Minute until train
    var minutesTillTrain = sv.freq - tRemainder;
    console.log("Minutes until Train: " + minutesTillTrain);
    
    // Next train arrival
    var nextTrain = moment().add(minutesTillTrain, "minutes").format("hh:mm A");
    console.log("Arrival: " + nextTrain);
    

    // Append the information taken from the user input to the train schedule table
    $("#results-body").append("<tr><td>" + sv.name + "</td><td>" + sv.dest + "</td><td>" + sv.freq + "</td><td>" + nextTrain + "</td><td>" + minutesTillTrain + "</td></tr>");
});