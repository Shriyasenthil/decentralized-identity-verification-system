// server.js
const express = require('express');
const Web3 = require('web3');
const IdentityContract = require('./build/contracts/Identity.json');

const app = express();
const port = 3000;

const web3 = new Web3('http://localhost:8545'); // Connect to Ganache
const contractAddress = 'your_contract_address_here'; // Replace with deployed contract address
const identity = new web3.eth.Contract(IdentityContract.abi, contractAddress);

app.use(express.json());

app.post('/register', async (req, res) => {
    const { address, name, email } = req.body;
    const accounts = await web3.eth.getAccounts();
    await identity.methods.register(name, email).send({ from: address });
    res.send('User registered successfully');
});

app.post('/verify', async (req, res) => {
    const { verifier, user } = req.body;
    await identity.methods.verify(user).send({ from: verifier });
    res.send('User verified successfully');
});

app.get('/user/:address', async (req, res) => {
    const user = await identity.methods.getUser(req.params.address).call();
    res.send(user);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
