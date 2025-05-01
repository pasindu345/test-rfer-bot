/*CMD
  command: send_admin_reply
  help: 
  need_reply: true
  auto_retry_time: 
  folder: user

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Command: send_admin_reply

let replyText = message.trim();
if (replyText.length < 1) {
  Bot.sendMessage("❗ Please type a reply message.");
  Bot.runCommand("send_admin_reply");
  return;
}

let userID = Bot.getProperty("replyID");
if (!userID) {
  Bot.sendMessage("❗ Error: No user selected to reply.");
  return;
}

Api.sendMessage({
  chat_id: userID,
  text: "📩 <b>Admin replied to you:</b>\n\n<i>" + replyText + "</i>",
  parse_mode: "html"
});

Bot.sendMessage("✅ Your reply has been sent to the user.");
Bot.setProperty("replyID", null); // clear after reply

