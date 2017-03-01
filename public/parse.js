var log = console.log;
var $ = jQuery;
var simulation_data = {};
var agents = [];
var charts = [];
var geo = [];

// Takes test.json string and returns JavaScript value.
function parseJSON() {  
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
    log(hashmapData[1]);
    
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

    // Contains manipulated Object.hashmap[1] data CONCATs with empty array (agentRestData)
    charts = graphRestData;

    // Contains manipulated Object.hashmap[2] data CONCATs with empty array (agentRestData)
    geo = geoRestData;

  });
}