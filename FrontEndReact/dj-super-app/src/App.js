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

function fuck(shitto) {
  console.log(shitto.target);
}

function renderArrayButtons(_array) {
  var _iDunno = [];
  _array.forEach(element => {
    _iDunno.push(<tr key={element}><td><button onClick={fuck}>{element}</button></td></tr>);    
  });
  return(_iDunno);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <table style={{width:'50%'}}>
          <tbody>
            <tr>
              <th><u>Raum</u></th>            
            </tr>
            {renderArrayButtons(rooms)}
          </tbody>
        </table>        
      </header>
    </div>
  );
}

export default App;
