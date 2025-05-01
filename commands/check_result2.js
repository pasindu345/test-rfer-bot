/*CMD
  command: check_result2
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let status = options.result.status;

if (status == "member" || status == "administrator" || status == "creator") {
  let joined_count = User.getProperty("channels_joined_count") || 0;
  joined_count += 1;
  User.setProperty("channels_joined_count", joined_count, "integer");
}

let required = 0;
if (Bot.getProperty("channel1")) required++;
if (Bot.getProperty("channel2")) required++;
if (Bot.getProperty("channel3")) required++;

let final_count = User.getProperty("channels_joined_count");

if(final_count >= required){
  User.setProperty("joined", "Yes", "string");
  Bot.sendMessage("✅ You have joined all required channels. You can now use the bot!");
  Bot.runCommand("/menu");
}
