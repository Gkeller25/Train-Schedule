  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB8OV4TyFEjIy3hIFgA8ol7RIHb7KTvt8U",
    authDomain: "train-schedule-2e17f.firebaseapp.com",
    databaseURL: "https://train-schedule-2e17f.firebaseio.com",
    storageBucket: "train-schedule-2e17f.appspot.com",
   
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  $("#add-train-btn").on("click", function(event){
    event.preventDefault();
    var name = $("#train-name-input").val().trim();
    var dest = $("#destination-input").val().trim();
    var trainFirst = $("#start-input").val().trim();
    var freq = $("#rate-input").val().trim();

    var newTrain = {
        train: name,
        destination: dest,
        firstTime: trainFirst,
        frequency: freq
  
  
      };

      

    database.ref().push(newTrain);

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);

    var trainFirstConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
    console.log(trainFirstConverted); 



    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");

    var currentTime = moment();
    console.log(currentTime);
    console.log("CURRENT TIME: " + moment(trainFirstConverted).format("hh:mm"));
var diffTime = moment().diff(moment(trainFirstConverted),"minutes");
console.log("DIFFERENCE IN TIME:  " + diffTime);
var timeRemain = diffTime % freq;
console.log(timeRemain);
 var timeMinTillTrain = freq - timeRemain;
 console.log("MINUTES TILL TRAIN:  " + timeMinTillTrain);
 var nextTrain = moment().add(timeMinTillTrain, "minutes");
 console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  })


  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    var name = childSnapshot.val().train;
    var dest = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().firstTime;
    var freq = childSnapshot.val().frequency;


    var trainFirstConverted = moment(trainFirst, "hh:mm").subtract(1, "years");
    console.log(trainFirstConverted); 

    var currentTime = moment();
    console.log(currentTime);
    console.log("CURRENT TIME: " + moment(trainFirstConverted).format("hh:mm"));
var diffTime = moment().diff(moment(trainFirstConverted),"minutes");
console.log("DIFFERENCE IN TIME:  " + diffTime);
var timeRemain = diffTime % freq;
console.log(timeRemain);
 var timeMinTillTrain = freq - timeRemain;
 console.log("MINUTES TILL TRAIN:  " + timeMinTillTrain);
 var nextTrain = moment().add(timeMinTillTrain, "minutes");
var arrivalTime = moment(nextTrain).format("hh:mm");



  console.log(name);
  console.log(dest);
  console.log(trainFirst);
  console.log(freq);

    var trainFirstPretty = moment.unix(trainFirst).format("HH:mm");


    $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" +
    freq + "</td><td>" + arrivalTime + "</td><td>" + timeMinTillTrain + "</td><td>" + "" + "</td></tr>");

  })

   