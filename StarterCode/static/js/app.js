//since we need to change the demo, barand bubble for each change in the sample ID we will
//need to create function for the updating the visuals 

//default setup for the startup of the page
function init(){
    //read in the JSON files first
    d3.json("samples.json").then(function(data) {

        //have the JSON entries ready
        var names = data.names;
        var metadata = data.metadata;
        var samples = data.samples;

        //add the names to dropdown menu
        names.forEach((name) =>{
            d3.select("#selDataset").append("option").text(name)
        });

        //default demo to show subject id 940
        demo_info = d3.select("#sample-metadata");
        Object.entries(metadata[0]).forEach(([key,value]) => demo_info.append("h5").text(`${key}:${value}`));

        //default  bar graoh
        var default_sample = samples[0];
        
        //sort the order to descending order and then slice the first ten
        //day 2 activity 5
        //data from  data.sample entry
        var x = default_sample.sample_values.slice(0,10).reverse()
        var y = default_sample.otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`)
        var labels = default_sample.otu_labels.slice(0,10).reverse()

        //horizontal chart day 2 activity 6
        var trace1 = {
            x: x,
            y: y,
            text: labels,
            type: "bar",
            orientation: "h"
        };
          
        //plot the horizontal bar chart
        var barData = [trace1]
        Plotly.newPlot("bar", barData)


        //default bubble graph 
        //https://plotly.com/javascript/bubble-charts/
        var trace2 = {
            x: default_sample.otu_ids,
            y: default_sample.sample_values,
            text: default_sample.otu_labels,
            mode: 'markers',
            marker: {
              color: default_sample.otu_ids,  
              size: default_sample.sample_values
            }

        };
          
        var bubbleData = [trace2];
        //plot the bubble graph 
        Plotly.newPlot("bubble", bubbleData);

}

//Update demographic 
function upDateDemo(subject){
    demo_info = d3.select("#sample-metadata");
    //clear the demo
    demo_info.html("");
    //from Intro for JS day 2 activity 7
    Object.entries(subject).forEach(([key,value]) => demo_info.append("h5").text(`${key}:${value}`));
}

function updateBar(subject){
    
    var x = subject.sample_values.slice(0,10).reverse();
    var y = subject.otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`);
    var labels = subject.otu_labels.slice(0,10).reverse();

    //plot restyle  day 2 activity 7
    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);
    Plotly.restyle("bar", "text", [labels]);
}

function updateBubble(subject){

    //update the bubble graph
    Plotly.restyle("bubble","x",[subject.otu_ids]);
    Plotly.restyle("bubble","y",[subject.sample_values]);
    Plotly.restyle("bubble","text",[subject.otu_labels]);
    Plotly.restyle("bubble","marker",[{color: default_sample.otu_ids,  
                                        size: default_sample.sample_values}]);
}
//came from the index.html file
function optionChanged(value){
    d3.json("samples.json").then(function(data) {
        //retrieving the necessary data and taking the first entry because thats the only entry in the index
        var metaData = data.metadata.filter(sampleData => sampleData.id == value)[0];
        var sample = data.samples.filter(sampleData => sampleData.id == value)[0];

        //update the charts
        updateeDemo(metaData);
        updateBar(sample);
        updateBubble(sample);
    })
}


init();
