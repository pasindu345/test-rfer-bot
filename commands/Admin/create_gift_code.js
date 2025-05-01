/*CMD
  command: create_gift_code
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

if (request && request.message) {
  Api.deleteMessage({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id
  });
}
Bot.sendMessage("💰 Please enter the amount for the Gift Code")
Bot.runCommand("create_gift_code2");
