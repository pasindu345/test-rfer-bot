/*CMD
  command: admin_set_min_withdraw
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
  answer: Please enter the *minimum withdraw amount* (only number)

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
  Bot.runCommand("input_min_withdraw");
  return;
}

Bot.setProperty("min_withdraw", amount, "float");
Bot.sendMessage("✅ Minimum withdraw set to: *" + amount + "*", { parse_mode: "Markdown" });
