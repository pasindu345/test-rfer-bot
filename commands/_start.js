/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// === Admin Telegram ID (Set once)
var admin_id = 5491775006;

// === Generate & Save Unique User Code (if not exist)
function generateUniqueID(){
  let prefix = "BB";
  let random = Math.floor(1000 + Math.random() * 9000);
  return prefix + random;
}

if (!User.getProperty("unique_id")) {
  let my_uid = generateUniqueID();
  User.setProperty("unique_id", my_uid, "string");
  Bot.setProperty("ref_map_" + my_uid, user.telegramid, "integer");
}

// === Check if User is NEW (First time)
let isNewUser = !User.getProperty("UserDone");
if (isNewUser) {
  let ref_param = params;
  if (ref_param) {
    let my_uid = User.getProperty("unique_id");
    if (ref_param != my_uid) {
      User.setProperty("referrer_code", ref_param, "string");
    } else {
      Bot.sendMessage("*❌ You cannot use your own referral link!*");
    }
  }
}

// === SET CHANNELS MANUALLY (Edit your 3 channels here)
let ch1 = "@Reload_proofs";
let ch2 = "@ECash_Hub";
let ch3 = "@sinhlacartoon";

// === Save them into Bot Properties (so /joined command also uses same)
Bot.setProperty("channel1", ch1, "string");
Bot.setProperty("channel2", ch2, "string");
Bot.setProperty("channel3", ch3, "string");

// === Force Join UI ===
var buttons = [];
if(ch1){ buttons.push([{ text: "↗️ Join Channel 1", url: "https://t.me/" + ch1.replace("@", "") }]); }
if(ch2){ buttons.push([{ text: "↗️ Join Channel 2", url: "https://t.me/" + ch2.replace("@", "") }]); }
if(ch3){ buttons.push([{ text: "↗️ Join Channel 3", url: "https://t.me/" + ch3.replace("@", "") }]); }

buttons.push([{ text: "✅ Joined", callback_data: "/joined" }]);

Api.sendMessage({
  chat_id: user.chatid,
  text: "👋 <b>Hey " + user.first_name + "</b>!\n\n<i>💧 You must join all channels before using the bot.</i>",
  parse_mode: "html",
  reply_markup: { inline_keyboard: buttons }
});
