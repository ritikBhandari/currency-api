const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    eur: Number,
    gbp: Number,
    jpy: Number,
    usd: Number,
    aud: Number,
    cad: Number,
    time: Number,
})

let Currencies = mongoose.model("Currencies", currencySchema, 'myCollection');

module.exports = Currencies;