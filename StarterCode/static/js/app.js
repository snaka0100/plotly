// range selector: plotly day 2 activity 4 BONUS
// dropdown menuL: plotly day 2 activity 7

//since we need to change the demo, barand bubble for eaceh change in the sample id we will
//need to create function for the creation of those visalus

//default setup for the startup of the page
function init(){
    //read in the JSON files first
    d3.json("samples.json").then(function(data) {
        var names = data.names;
        var metadata = data.metadata;
        var samples = data.samples;
        //add the names to dropdown menu
        names.forEach((name) =>{
            d3.select("#selDataset").append("option").text(name)
        });

        //default demo to show subject id 940
        demographics(metadata[0]);

        //default  bar graoh
        var default_sample = samples[0];
        
        //sort the order to descending order and then slice the first ten
        //day 2 activity 5
        //x value
        var sampleValue = default_sample.sample_values.sort((firstNum,secondNum) => secondNum - firstNum);
        sampleValue = sampleValue.slice(0,10)
        
        //checkif the value has passed 
        // console.log(sampleValue)

    });

}

//creation of demographic 

function demographics(subject){
    demo_info = d3.select("#sample-metadata")
    //clear the demo
    demo_info.html("")
    //from Intro for JS day 2 activity 7
    Object.entries(subject).forEach(([key,value]) => demo_info.append("h5").text(`${key}:${value}`))
}

//creation of bar chart for top 10 OSU ID
//horizontal chart day 2 activity 6

init();
