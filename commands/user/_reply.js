/*CMD
  command: /reply
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

// Command: /reply

let userIdToReply = message.split(" ")[1];
if (!userIdToReply) {
  Bot.sendMessage("❗ User ID not found.");
  return;
}

Bot.setProperty("replyID", userIdToReply, "integer");
Bot.sendMessage("✍️ Please type your reply to the user:");
Bot.runCommand("send_admin_reply");

