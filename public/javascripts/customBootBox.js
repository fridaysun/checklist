$(document).ready(function() {
  $( "#trashButton" ).click(function(event) {
    event.preventDefault();
    bootbox.alert("Hello world!", function() {
      console.log("Alert Callback");
    });
  });
});