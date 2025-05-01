/*CMD
  command: add_channel
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin

  <<ANSWER
📢 *Send me channel usernames separated by commas.*

Example:
`@Channel1, @Channel2, @Channel3`
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin_id = Bot.getProperty("admin");

if(user.telegramid != admin_id){
  Bot.sendMessage("❗ Access denied.");
  Bot.exit();
}

// Admin input format = @channel1,@channel2,@channel3
let input = message.split(",");
if(input.length > 3){
  Bot.sendMessage("❗ You can only set maximum 3 channels.\n\nFormat: `@channel1,@channel2,@channel3`", {parse_mode: "Markdown"});
  Bot.exit();
}

// Save channels one by one
if(input[0]){
  Bot.setProperty("channel1", input[0].trim(), "string");
}
if(input[1]){
  Bot.setProperty("channel2", input[1].trim(), "string");
}
if(input[2]){
  Bot.setProperty("channel3", input[2].trim(), "string");
}

let text = "*✅ Channels saved successfully:*\n\n";
if(input[0]){ text += "1️⃣ " + input[0].trim() + "\n"; }
if(input[1]){ text += "2️⃣ " + input[1].trim() + "\n"; }
if(input[2]){ text += "3️⃣ " + input[2].trim() + "\n"; }

Bot.sendMessage(text, {parse_mode: "Markdown"});
