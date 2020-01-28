var data;
function setData(params) {
    data = params;
    console.log(data);
    // Load the Visualization API and the corechart package.
    google.charts.load('current', { packages: ['corechart'], callback: drawChart, language: 'de' });
    console.log(`Loaded Google charts!`);
}

function dateToReadable(params) {
    params = params[0];
    return `${params.getDate()}.${params.getMonth() + 1}.${params.getFullYear()} | ${params.getHours()}:${params.getMinutes()}`;
}


function drawChart() {
    _temp = data;
    let _convertedArray = [];            
    _convertedArray[0] = ["Zeit", "Soll", "Ist"];
    for (let i in _temp){
        let _fuck = new Date(_temp[i].curTime);
        _convertedArray.push([_fuck, _temp[i].setTemp, _temp[i].isTemp]);
    };
    //console.log(_convertedArray);
    let _data = google.visualization.arrayToDataTable(_convertedArray);

    // https://developers.google.com/chart/interactive/docs/gallery/areachart#configuration-options
    let _options = {
        title: `${dateToReadable(_convertedArray[1])} -- bis -- ${dateToReadable(_convertedArray[_convertedArray.length - 1])}`,
        titleTextStyle: {color: 'white', bold: true},
        hAxis: {
            title: 'Zeit',
            format: 'HH:mm',
            titleTextStyle: {
                color: 'white'
            }
        },
        vAxis: { 
            title: 'Temperatur',
            titleTextStyle: {
                color: 'white' 
            },
            minValue: 0
        },
        backgroundColor: '#282c34',
        explorer: {
            actions:[
                'dragToZoom',
                'rightClickToReset'
            ]
        },
        animation:{
            startup: true,
            duration: 1000,
            easing: 'out'
        },
        legend: {textStyle: {color: 'white'}
        }
    };

    let _chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    _chart.draw(_data, _options);
}

