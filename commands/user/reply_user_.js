/*CMD
  command: reply_user_
  help: 
  need_reply: false
  auto_retry_time: 
  folder: user

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin_id = Bot.getProperty("admin");
if (user.telegramid != admin_id) {
  Bot.sendMessage("❗ Access denied.");
  return;
}

// callback_data: "reply_userID"
// So extract userID from data
let target_id = data.split("_")[1];

// Save to Bot Property (TEMP target for reply)
Bot.setProperty("reply_target_id", target_id, "integer");

// Ask Admin to type reply message
Bot.sendMessage("✏️ Please type your reply to User ID `" + user_id + "`:", { parse_mode: "Markdown" });
Bot.runCommand("process_admin_reply");
