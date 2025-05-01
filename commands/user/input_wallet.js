/*CMD
  command: input_wallet
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

let wallet = message.trim();

User.setProperty("user_wallet", wallet, "string");

Bot.sendMessage("✅ Your wallet has been saved!\n\n💼 `" + wallet + "`", { parse_mode: "Markdown" });

// Back to withdraw menu
Bot.runCommand("/withdraw");
