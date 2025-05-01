/*CMD
  command: notify_bonus_ready
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

let uid = options.user_id;

Api.sendMessage({
  chat_id: uid,
  text: "🎁 Your daily bonus is ready to claim again!\nUse the <b>Bonus</b> button in menu.",
  parse_mode: "HTML"
});
