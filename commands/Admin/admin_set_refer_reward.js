/*CMD
  command: admin_set_refer_reward
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
  answer: Please enter the *refer reward amount* (only number)

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin_id = Bot.getProperty("admin");
if (user.telegramid != admin_id) {
  Bot.sendMessage("Access denied.");
  return;
}

let reward = parseFloat(message.trim());

if (isNaN(reward) || reward <= 0) {
  Bot.sendMessage("❗ Invalid amount. Enter a positive number:");
  Bot.runCommand("input_refer_reward");
  return;
}

Bot.setProperty("refer_reward", reward, "float");
Bot.sendMessage("✅ Refer reward set to: *" + reward + "*", { parse_mode: "Markdown" });
