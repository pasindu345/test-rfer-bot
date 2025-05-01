/*CMD
  command: withdraw_toggle_on
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

Bot.setProperty("withdraw_enabled", true, "boolean");

Api.sendMessage({
  chat_id: user.chatid,
  text: "✅ <b>Withdraw is now ENABLED.</b>\nUsers can submit withdraw requests.",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🔒 Turn OFF Withdraw", callback_data: "/withdraw_off" }]
    ]
  }
});
