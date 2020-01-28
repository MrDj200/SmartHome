// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });
console.log(`Loaded Google charts!`);

function drawChart(_temp) {
    let _convertedArray = [];            
    _convertedArray[0] = ["Zeit", "Soll", "Ist"];
    for (let i in _temp){
        let _fuck = new Date(_temp[i].curTime);
        _convertedArray.push([_fuck, _temp[i].setTemp, _temp[i].isTemp]);
    };
    console.log(_convertedArray);    

    let _data = google.visualization.arrayToDataTable(_convertedArray);

    let _options = {
        title: 'Temp over time',
        hAxis: { title: 'Time', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 }
    };

    let _chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    _chart.draw(_data, _options);
}