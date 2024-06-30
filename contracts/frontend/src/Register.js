// src/Register.js
import React, { useState } from 'react';
import Web3 from 'web3';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [account, setAccount] = useState('');

    const web3 = new Web3(Web3.givenProvider);
    const register = async () => {
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address: accounts[0], name, email }),
        });
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <button onClick={register}>Register</button>
            <p>Your account: {account}</p>
        </div>
    );
};

export default Register;

