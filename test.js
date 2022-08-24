const port = process.env.PORT || 3000;
const express = require('express');
var cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const fetch = require('node-fetch');
var myHeaders = new fetch.Headers();
const Currencies = require('./schema.js');


const { response } = require('express');

mongoose.connect("mongodb+srv://ritikbhandari:3ZRfstFI59l4bI9q@cluster1.0s19j.mongodb.net/myDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", ()=>{
    console.log("Connected successfully!")
})

myHeaders.append("apikey", "ylRH8tpzzPWP0gjJeqoFuKxa7UO0lHIr");

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

function exampleFunction(){
    fetch("https://api.apilayer.com/fixer/latest?symbols=EUR,GBP,JPY,USD,AUD,CAD&base=INR", requestOptions)
    .then(response => response.json())
    .then(result => {
        let currency = new Currencies({
            _id: new mongoose.Types.ObjectId(),
            eur: result.rates['EUR'],
            gbp: result.rates['GBP'],
            jpy: result.rates['JPY'],
            usd: result.rates['USD'],
            aud: result.rates['AUD'],
            cad: result.rates['CAD'],
    })
        currency.save(function(err){
            if(err){
                console.log(err);
            }
        })
})
.catch(error => console.log('error', error))
}


app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello World! This is Currency Info App. Checkout the /latest route to check the latest prices!');
})

app.get('/latest', (req, res)=>{
    Currencies.findOne().sort({'_id': -1}).limit(1).then(content=>res.json(content));
})

app.listen(port, ()=>{
    console.log('Listening!')
    exampleFunction;
    setInterval(exampleFunction, 3600000);
})