require("dotenv").config();
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Jakarta").locale("id")

const sekarang = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')

module.exports = {
	options: {
      public: false,
      antiCall: true, // reject call
      database: "database.json", // End .json when using JSON database or use Mongo URI
      owner: ["6288213503541"], // set owner number on here
      sessionName: "session", // for name session
      prefix: /^[°•π÷×¶∆£¢€¥®™+✓_|/~!?@#%^&.©^]/i,
      pairingNumber: "", // Example Input : 62xxx
      pathPlugins: "plugins",
      wm: "*Source:* https://api.arifzyn.biz.id"
   },
   
   // Function Maybee
   reloadFile: (path) => reloadFile(path),
   
   // Rest APIs Cuy
   APIs: {
   	arifzyn: "https://api.arifzyn.biz.id"
   },
   
   APIKeys: {
   	"https://api.arifzyn.biz.id": process.env.APIKEY || ""
   },
   
   // Set pack name sticker on here
   Exif: {
      packId: "https://api.arifzyn.biz.id",
      packName: null,
      packPublish: '         Arifzyn. - Assistant\n      ——————————————\n\nCreated on date:\n' + sekarang,
      packEmail: "arifzyn906@gmail.com",
      packWebsite: "https://api.arifzyn.biz.id",
      androidApp: "https://play.google.com/store/apps/details?id=com.bitsmedia.android.muslimpro",
      iOSApp: "https://apps.apple.com/id/app/muslim-pro-al-quran-adzan/id388389451?|=id",
      emojis: [],
      isAvatar: 0,
   },

   // message  response awikwok there
   msg: {
      owner: "Features can only be accessed owner!",
      group: "Features only accessible in group!",
      private: "Features only accessible private chat!",
      admin: "Features can only be accessed by group admin!",
      botAdmin: "Bot is not admin, can't use the features!",
      bot: "Features only accessible by me",
      media: "Reply media...",
      query: "Enter Query!",
      noUrl: "please input a url.",
      error: "An error occurred while retrieving data.",
      quoted: "Reply message...",
      wait: "Wait a minute...",
      urlInvalid: "Url Invalid",
      notFound: "Result Not Found!",
      premium: "Premium Only Features!"
   }
}

function reloadFile(file) {
  fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.green(`[ UPDATE ] file => "${file}"`));
    delete require.cache[require.resolve(file)];
    require(file);
  });
} 

reloadFile(require.resolve(__filename))
