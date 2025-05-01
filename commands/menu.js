/*CMD
  command: menu
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

let keyboard = [
  ["👤 Profile", "🎁 Bonus"],
  ["🔗 Refer", "🔑 Gift Code", "💸 Withdraw"],
  [" 🔐 Micro Task"],
  ["📊 Statics", "☎️ Contact"]
];

Api.sendMessage({
  chat_id: user.chatid,
  text: "*Welcome to the Main Menu*",
  parse_mode: "Markdown",
  reply_markup: {
    keyboard: keyboard,
    resize_keyboard: true,
    one_time_keyboard: false
  }
});
