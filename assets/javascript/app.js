$("#submit-btn").on("click", function(event){
    event.preventDefault();
    
    var name = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTime = $("#first-train-time").val().trim();
    var frequency = $("#frequency").val().trim();

    console.log(name);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);

    // Append the information taken from the user input to 
    $("#results-row").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + firstTime + "</td><td>" + frequency + "</td></tr>");
});