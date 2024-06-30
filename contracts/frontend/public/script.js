// public/script.js
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545'); // Connect to local Ethereum node
const contractAddress = '0x123abc...'; // Replace with your deployed contract address
const identityContract = new web3.eth.Contract(IdentityContract.abi, contractAddress);

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;

    try {
        const accounts = await web3.eth.requestAccounts();
        await identityContract.methods.registerUser(name, dob).send({ from: accounts[0] });
        document.getElementById('message').innerHTML = 'User registered successfully';
    } catch (error) {
        console.error(error);
        document.getElementById('message').innerHTML = 'Failed to register user';
    }
});
