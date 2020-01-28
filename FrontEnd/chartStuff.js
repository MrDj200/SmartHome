// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });
console.log('Loaded Google charts!');

// Set a callback to run when the Google Visualization API is loaded.
//google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart(temp) {
    //console.log(temp);
    let convertedArray = [];            
    convertedArray[0] = ["Zeit", "Soll", "Ist"];
    /*convertedArray[0] = [
        {label: 'Zeit', type: 'string'},
        {label: 'Soll', type: 'string'}, 
        {label: 'Ist', type: 'string'}
    ];*/
    for (let i in temp){
        let _fuck = new Date(temp[i].curTime);
        convertedArray.push([_fuck, temp[i].setTemp, temp[i].isTemp]);
    };    
    //console.log(convertedArray);
    console.log(JSON.stringify(convertedArray));
    let data = google.visualization.arrayToDataTable(convertedArray);

    let options = {
        title: 'Temp over time',
        hAxis: { title: 'Time', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 }
    };

    let chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}