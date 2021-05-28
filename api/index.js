ivar express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '1566520999:AAG5DMEg1XgTEDULZBFxO41hcCWGL6MIb_0'
const bot = new TelegramBot(token, {polling: true});


// bots
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /predict`
    );   
});

bot.onText(/\/menu/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `this is your main menu`
    );   
});

state = 0;
bot.onText(/\/predict/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `Input Value i|v example 9|9`
    );
    state = 1;
});


bot.on('message', (msg) => {
console.log(msg);
if(state ==1){
    console.log(msg.Text);
    s = msg.text.split ("|");
    i = s[0]
    v = s[1]
    model.predict(
        [
            parsefloat(s[0]),
            parsefloat(s[1])
        ]
    ).then((jres)=>{
        bot.sendMessage(
            msg.chat.id,
            'Predict value v is ${jres[0]} volt'
            );
        bot.sendMessage(
            msg.chat.id,
            'Predict value p is ${jres[1]} watt'
                ); 
    })
    state = 0 
}else{
    state=0
}
})

// routers
r.get('/prediction/:i/:r', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.i), // string to float
            parseFloat(req.params.r)
        ]
    ).then((jres)=>{
        res.json(jres);
    })
});

module.exports = r;



// routers
r.get('/prediction/:i/:r', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.i), // string to float
            parseFloat(req.params.r)
        ]
    ).then((jres)=>{
        res.json(jres);
    })
});

module.exports = r;
