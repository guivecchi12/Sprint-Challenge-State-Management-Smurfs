import React, { useState, useEffect } from "react";
import Smurf from "./Smurf";
import axios from 'axios';

import { SmurfContext } from '../context/SmurfContext';

import "./App.css";

const App = () => {
  const [smurf, addSmurf] = useState([]);

  useEffect(()=> {
    // console.log("Component Did Mount");
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        // console.log("axios get function: ", res);
        addSmurf(res.data);
      })
      .catch(err => console.log("Error occured in Axios: ", err));
  },[]);
  

  const addSmurfs = smurf => {
    addSmurf(oldArray => [...oldArray, smurf]);
  };

  // console.log("Smurf in App: ",smurf)

  return (
    <div className="App">
      <SmurfContext.Provider value = {{smurf, addSmurfs}}>
        <h1>SMURFS! 2.0 W/ Redux</h1>
        <Smurf />
      </SmurfContext.Provider>   
    </div>
  );
};

export default App;
