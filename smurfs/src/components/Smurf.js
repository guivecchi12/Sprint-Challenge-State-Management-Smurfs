import React, { useState, useContext } from 'react';
import {SmurfContext} from '../context/SmurfContext';
import axios from 'axios';

const Smurf = () => {
    const {smurf, addSmurfs} = useContext(SmurfContext);
    // console.log("Props in Smurf: ", smurf);

    const [ form, setForm ] = useState({
        name: '',
        age: '',
        height: ''
    })

    const inputInfo = e => {
        e.persist();
        
        setForm({...form, [e.target.name]:e.target.value});
    };

    const formSubmit = (e) => {
        e.preventDefault();
        console.log("New Smurf Created!");
        axios
            .post("http://localhost:3333/smurfs", form)
            .then(res => {
                console.log("POST: ",res);
                addSmurfs(form);
            })
            .catch(err => console.log("Error in POST: ", err));
    }

    return (
        <div>
            <div>
                Create your Smurf 
                <form onSubmit = {formSubmit}>
                    <label htmlFor = 'name'>
                        Name
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            value = {form.name}
                            onChange = {inputInfo}
                        />
                    </label>
                    
                    <label htmlFor = "age">
                        Age
                        <input
                            type = "text"
                            name = "age"
                            id = "age"
                            value = {form.age}
                            onChange = {inputInfo}    
                        />
                    </label>

                    <label htmlFor = "height">
                        Height
                        <input
                            type = "text"
                            name = "height"
                            id = "height"
                            value = {form.height}
                            onChange = {inputInfo}    
                        />
                    </label>
                    <button>Submit</button>
                </form>
            </div>
            <div>
                Your Smurfs:
                <ul>
                    {smurf.map(murf=>{
                        return (
                        <div><b>Name: {murf.name}</b>
                            <li>Age: {murf.age} </li>
                            <li>Height: {murf.height} </li>
                            <br />
                        </div>)
                    })}
                </ul>
            </div>
        </div>
    )
};


export default Smurf;