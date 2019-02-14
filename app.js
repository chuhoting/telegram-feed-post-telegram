const TelegramBot = require('node-telegram-bot-api');
const ogs = require('open-graph-scraper');
const firebase = require('firebase');
const FeedSub = require('feedsub');
const Telegraf = require('telegraf');
const request = require("request");

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ feed: [] }).write();


const token = 'TELEGRAMBOTTOKEN';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  bot.sendMessage(msg.chat.id, 'Ill have the tuna. No crust.');
});

//run node app.js on terminal and try talking to bot > we'll see successful replies

let reader = new FeedSub('RSSFEEDOFCHOICE', {
  interval: 1, // Check feed every 1 minutes.
  emitOnStart: true,
  maxHistory: 1
});

reader.on('item', function(item){
  console.log('Got item!');
  console.dir(item.title);

  const itemInDb = db.get('feed').find({ link: item.link }).value();
    if (itemInDb) {
      console.log("This item is already exists:");
      console.log(itemInDb.link);
    } else {
      db.get('feed').push(item).write();
      var message = item.link;
      var options = {
        url:"https://api.telegram.org/botXXXXXXX/sendMessage?text="+message+"&chat_id=XXXXXX"
      };

      request(options,function(error,response,body){

      });
    }


});


reader.start();
