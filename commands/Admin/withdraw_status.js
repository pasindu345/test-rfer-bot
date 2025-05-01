/*CMD
  command: withdraw_status
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
  Bot.sendMessage("❗ Access denied. Admin only.");
  return;
}

let status = Bot.getProperty("withdraw_enabled");
if (status === null) { status = true; } // default ON

let status_text = status ? "ON (Withdraw allowed)" : "OFF (Withdraw disabled)";

let keyboard = [
  [
    { text: "🔓 ON", callback_data: "withdraw_toggle_on" },
    { text: "🔒 OFF", callback_data: "withdraw_toggle_off" }
  ]
];

let text = "⚙️ <b>Withdraw Status:</b>\n<code>" + status_text + "</code>";

Api.sendMessage({
  chat_id: user.chatid,
  text: text,
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: keyboard }
});
