/*CMD
  command: withdraw_toggle_off
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
if (user.telegramid != admin_id) { return; }

Bot.setProperty("withdraw_enabled", false, "boolean");

Api.sendMessage({
  chat_id: user.chatid,
  text: "❌ <b>Withdraw is now DISABLED.</b>\nUsers cannot submit withdraw requests.",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🔓 Turn ON Withdraw", callback_data: "/withdraw_on" }]
    ]
  }
});
