var log = console.log;
var $ = jQuery;
var simulation_data = {};
var agents = [];
var charts = [];
var geo = [];

// Takes test.json string and returns JavaScript value.
$(function () {  
  $.getJSON("test.json", function(data) {
    var clientData = $.parseJSON( data.data );
    // log(clientData);
    
    simulation_data.current = clientData.current;
    simulation_data.start = clientData.start;
    simulation_data.end = clientData.end;
    simulation_data.play = clientData.play;
    simulation_data.tick = clientData.play;
    
    // Contains Object.global data
    var globalRestData = $.parseJSON( clientData.global );
    
    // Contains Object.hashmap data
    var hashmapData = $.parseJSON( clientData.hashmap );
    
    var agentRestData = [];
    var graphRestData = [];
    var scatterRestData = [];
    var geoRestData = [];
    
    for (var h = 0; h < hashmapData.length; h++){
      if (hashmapData[h].agent) {
        agentRestData = agentRestData.concat(hashmapData[h].agent);
      }
      if (hashmapData[h].graph) {
        graphRestData = graphRestData.concat(hashmapData[h].graph);
      }
      if (hashmapData[h].scatter) {
        scatterRestData = scatterRestData.concat(hashmapData[h].scatter);
      }
      if (hashmapData[h].geo) {
        geoRestData = geoRestData.concat(hashmapData[h].geo);
      }
    }
    
    graphRestData = graphRestData.concat(globalRestData.graph);
    
    // Contains manipulated Object.hashmap[0] data CONCATs with empty array (agentRestData)
    agents = agentRestData;

    // Contains manipulated Object.hashmap[1] data CONCATs with empty array (graphRestData)
    charts = graphRestData;

    // Contains manipulated Object.hashmap[2] data CONCATs with empty array (geoRestData)
    geo = geoRestData;


    /*********************************************************/
    /*********************************************************/
    /*********************************************************/
    /************* My Challenge Starts from here *************/
    /*********************************************************/
    /*********************************************************/
    /*********************************************************/


    // Store graph object inside hashmapData to a variable
    var chart = hashmapData[1];
 
    // Assign onclick event to the button 
    // Invoke graph function and passed through charts' data
    $( "#graphBtn" ).click(function() {
       graphs(chart.graph);
    });

    // Catch data passed down from onClick function
    // Map through received data and assign index for each data
    function graphs(data){
      data.map(function(item, i){
          graphsDivElement(item[0].points, i)
      })
    }

    // Dynamic HTML element generator function
    function graphsDivElement(data, i){
        var id = "myChart" + i;
        var color = colorChange();
        $("#main").append('<canvas id="'+id+'" width="400px" height="200px"></canvas>')
        chartGraph(id,data,color)
    }

    // Random graphs' colour generator function
    function colorChange(){
       var r =  Math.floor((Math.random() * 255) +1);
       var g =  Math.floor((Math.random() * 255) +1);
       var b = Math.floor((Math.random() * 255) +1);
       var color = `rgba(${r}, ${g}, ${b}, 0.5)`;
       return color;
    }

    // Function to create dynamic graph
    function chartGraph(id,data,color){
    var ctx = document.getElementById(id);
            var scatterChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Scatter Dataset',
                    data: data,
                    backgroundColor: color,
                }],
            },
                options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }],   
                },
                maintainAspectRatio : true,
                responsive : false
            }
        });
    }
  });
})