/*CMD
  command: admin_toggle_maintenance
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin_id = Bot.getProperty("admin");
if (user.telegramid != admin_id) {
  Bot.sendMessage("Access denied.");
  return;
}

let isOn = Bot.getProperty("maintenance_mode") === true;

let btnText = isOn ? "🔴 Turn OFF Maintenance" : "🟢 Turn ON Maintenance";

Api.sendMessage({
  chat_id: user.chatid,
  text: "*Maintenance Control Panel*",
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [{ text: btnText, callback_data: "toggle_maintenance" }]
    ]
  }
});
