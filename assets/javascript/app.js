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
      if (name === ""){
        alert('you did not fill out one of the fields');
        return false;
      } else if(dest === "") {
        alert('you did not fill out one of the fields');
        return false;
      } else if(trainFirst === ""){
        alert('you did not fill out one of the fields');
        return false;
      } else if (freq === ""){
        alert('you did not fill out one of the fields');
        return false;
      } else {
      

        database.ref().push(newTrain);
      }

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  })


  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var name = childSnapshot.val().train;
    var dest = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().firstTime;
    var freq = childSnapshot.val().frequency;


    var trainFirstConverted = moment(trainFirst, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(trainFirstConverted),"minutes");
    var timeRemain = diffTime % freq;
    var timeMinTillTrain = freq - timeRemain;
    var nextTrain = moment().add(timeMinTillTrain, "minutes");
    var arrivalTime = moment(nextTrain).format("hh:mm A");
    var trainFirstPretty = moment.unix(trainFirst).format("HH:mm A");
    $("#train-table > tbody").append("<tr id='"+childSnapshot.key+"'><td>" + name + "</td><td>" + dest + "</td><td>" +
    freq + "</td><td>" + arrivalTime + "</td><td>" + timeMinTillTrain + "</td></tr>");
    
    var timer = setInterval(tableUpdate, moment.duration(1, "minutes"));

    function tableUpdate(){
       
      var trainFirstConverted = moment(trainFirst, "hh:mm A").subtract(1, "years");
      var currentTime = moment();
      var diffTime = moment().diff(moment(trainFirstConverted),"minutes");
      var timeRemain = diffTime % freq;
      var timeMinTillTrain = freq - timeRemain;
      var nextTrain = moment().add(timeMinTillTrain, "minutes");
      var arrivalTime = moment(nextTrain).format("hh:mm A");
      var trainFirstPretty = moment.unix(trainFirst).format("HH:mm A");

        
        $("#"+childSnapshot.key).replaceWith("<tr id='"+childSnapshot.key+"'><td>" + name + "</td><td>" + dest + "</td><td>" +
    freq + "</td><td>" + arrivalTime + "</td><td>" + timeMinTillTrain + "</td></tr>");
    }  
})



    
   
  