import React from 'react';
import logo from './logo.svg';
import './App.css';

//var shit = fetch('http://pihole.fritz.box:6969');
const basePath = '/api';
async function getJson(_path) {
  let _response;
  fetch(_path)
  .then((_resp) => _resp.text())
  .then(function(_data) {
    _response = _data;
    console.log(`AHHHHHH ${_data}`)
  });
  return _response;
}


var rooms = [
  "Arbeitszimmer",
  "Bad",
  "Esszimmer",
  "Kueche",
  "Wohnzimmer",
  "Test"
];
var test = ['flupp', 'flop'];

function tableClicker(shitto) {
  console.log(shitto.target);
  renderArrayButtons(test);
}

function renderArrayButtons(_array) {
  console.log('Rendering table');
  var _iDunno = [];
  _array.forEach(element => {
    _iDunno.push(<tr key={`mainTableEntry${element}`}><td><button onClick={tableClicker}>{element}</button></td></tr>);    
  });
  return(_iDunno);
}

function tests(){
  var _test = document.getElementsByClassName('App-logo');
  console.log(`Tell me why tell me why: ${_test.item(0)}`);
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <table style={{width:'50%'}} id='mainTable'>{/*Maybe use refs. Idfk*/}
          <tbody>
            <tr id='mainTableTitle'>
              <th><u>Räume</u></th>            
            </tr>
            {tests()}
          </tbody>
        </table>        
      </header>
    </div>
  );
}

export default App;
