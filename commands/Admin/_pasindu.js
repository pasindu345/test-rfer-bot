/*CMD
  command: /pasindu
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

// You can run this once manually (as admin)
Bot.setProperty("admin", user.telegramid, "integer");
Bot.sendMessage("Admin set: " + user.telegramid);
