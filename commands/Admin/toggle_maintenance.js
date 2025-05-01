/*CMD
  command: toggle_maintenance
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
  Bot.answerCallbackQuery({
    callback_query_id: request.id,
    text: "Access denied."
  });
  return;
}

let current = Bot.getProperty("maintenance_mode") === true;
let new_state = !current;

Bot.setProperty("maintenance_mode", new_state, "boolean");

let status = new_state ? "🛠️ Maintenance Mode is now *ON*" : "✅ Maintenance Mode is now *OFF*";

Api.editMessageText({
  chat_id: user.chatid,
  message_id: request.message.message_id,
  text: status,
  parse_mode: "Markdown"
});
