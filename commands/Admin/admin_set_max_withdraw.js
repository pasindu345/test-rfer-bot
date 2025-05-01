/*CMD
  command: admin_set_max_withdraw
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
  answer: Please enter the *maximum withdraw amount* (only number)

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

let amount = parseFloat(message.trim());

if (isNaN(amount) || amount <= 0) {
  Bot.sendMessage("❗ Invalid amount. Please enter a positive number:");
  Bot.runCommand("input_max_withdraw");
  return;
}

Bot.setProperty("max_withdraw", amount, "float");
Bot.sendMessage("✅ Maximum withdraw set to: *" + amount + "*", { parse_mode: "Markdown" });
