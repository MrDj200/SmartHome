import React from 'react';
import logo from './logo.svg';
import './App.css';

//var shit = fetch('http://pihole.fritz.box:6669');

var rooms = [
  "Arbeitszimmer",
  "Bad",
  "Esszimmer",
  "Kueche",
  "Wohnzimmer"
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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <table style={{width:'50%'}} key='mainTable'>
          <tbody>
            <tr key='mainTableTitle'>
              <th><u>Räume</u></th>            
            </tr>
            {renderArrayButtons(rooms)}
          </tbody>
        </table>        
      </header>
    </div>
  );
}

export default App;
