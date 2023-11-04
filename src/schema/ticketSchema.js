const {model, Schema} = require('mongoose');

let ticketSchema = new Schema({
    guild: String,
    channel: String,
    ticket: String,
});

module.exports = model("ticketSchema", ticketSchema);