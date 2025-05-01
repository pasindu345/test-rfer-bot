/*CMD
  command: set_currency_name
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
  answer: *Please send the new currency symbol (e.g., USDT, LKR, BTC*

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin_id = Bot.getProperty("admin");

// Check admin
if (user.telegramid != admin_id) {
  Bot.sendMessage("Access denied.");
  return;
}

// Validate input
let new_currency = message.trim().toUpperCase();

// Allow only A-Z letters, 2-10 characters
if (!new_currency.match(/^[A-Z]{2,10}$/)) {
  Bot.sendMessage("❗ Invalid currency format.\nPlease enter a valid currency symbol (e.g., USDT, LKR):");
  Bot.runCommand("set_currency_name"); // ask again
  return;
}

// Save currency
Bot.setProperty("currency", new_currency, "string");

Bot.sendMessage("✅ Currency set to: *" + new_currency + "*", { parse_mode: "Markdown" });
