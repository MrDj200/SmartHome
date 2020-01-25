import React from 'react';
import logo from './logo.svg';
import './App.css';

//var shit = fetch('http://pihole.fritz.box:6669');

function fuck(shitto) {
  console.log(shitto.target);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <table style={{width:'50%'}}>
            <tr>
              <th><u>Raum</u></th>            
            </tr>
            <tr><td><button onClick={fuck}>Jojojojojojoj</button></td></tr>
        </table>
      </header>
    </div>
  );
}

export default App;
