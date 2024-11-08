const express = require('express');
const mongoose = require('mongoose');
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const web3 = new Web3('http://127.0.0.1:7545');

const contractAbi = JSON.parse(fs.readFileSync('MyERC20Token.json', 'utf8')).abi;
const contractAddress = '0x01Db1289616B88c9bABc205A1D0Cb3fb9f1cDf9b';
const myERC20Token = new web3.eth.Contract(contractAbi, contractAddress);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb+srv://shugyla:<Shugyla2005!>@cluster0.hsiya9g.mongodb.net/test";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const messageSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: String,
    email: String,
    message: String
}, { strict: 'throw' });

const Feedback = mongoose.model('Feedback', messageSchema);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit_form_destination', async (req, res) => {
    console.log(req.body);
    try {
        const feedbackData = req.body;
        const newFeedback = new Feedback(feedbackData);
        const savedFeedbacks = await newFeedback.save();
        console.log(`A document was inserted with the _id: ${savedFeedbacks._id}`);
        res.json({ message: 'Form data received and stored in MongoDB', _id: savedFeedbacks._id });
    } catch (err) {
        console.error("Error inserting document: ", err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'about.html'));
});

app.get('/help', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'help.html'));
});

app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'animals.html'));
});

app.get('/donation', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'donation.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'contact.html'));
});

app.get('/balance/:address', async (req, res) => {
    const address = req.params.address;
    const balance = await myERC20Token.methods.balanceOf(address).call();
    res.json({ balance });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
