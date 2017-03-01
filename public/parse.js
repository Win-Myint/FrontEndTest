var simulation_data = {};
var agents = [];
var charts = [];
var geo = [];

function parseJSON() {  
  $.getJSON("test.json", function(data) {
    var clientData = jQuery.parseJSON( data.data );
    
    simulation_data.current = clientData.current;
    simulation_data.start = clientData.start;
    simulation_data.end = clientData.end;
    simulation_data.play = clientData.play;
    simulation_data.tick = clientData.play;
    
    var globalRestData = jQuery.parseJSON( clientData.global );
    
    var hashmapData = jQuery.parseJSON( clientData.hashmap );
    
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
    
    agents = agentRestData;
    charts = graphRestData;
    geo = geoRestData;
    
    alert("Agents: " + agents.length + " Charts: " + charts.length + " Geo: " + geo.length);
  });
}