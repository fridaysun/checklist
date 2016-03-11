// Get context with jQuery - using jQuery's .get() method.
$(document).ready(function(){
    console.log("JQuery loaded");
    
    var ctx = $("#myChart").get(0).getContext("2d");
    
    var data = [
       {
           value: 270,
           color:"cornflowerblue",
           heighlight: "lightskyblue",
           label: "Pass"
       },{
           value: 270,
           color:"lightgreen",
           heighlight: "yellowgreen",
           label: "Fail"
       },{
           value: 270,
           color:"orange",
           heighlight: "darkorange",
           label: "Ongoing"
       }
    ];
    
    var chart = new Chart(ctx).Doughnut(data);
});
