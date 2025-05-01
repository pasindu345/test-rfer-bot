/*CMD
  command: claim_gift
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

if (request && request.message) {
  Api.deleteMessage({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id
  });
}
Bot.sendMessage("🔑 Please enter your Gift Code to claim")
Bot.runCommand("claim_gift2");
