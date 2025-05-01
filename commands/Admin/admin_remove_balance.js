/*CMD
  command: admin_remove_balance
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin

  <<ANSWER

  ANSWER

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

let parts = message.trim().split(" ");

if (parts.length != 2) {
  Bot.sendMessage("❗ Invalid format. Use:\n`USER_ID AMOUNT`\nExample:\n`5491775006 -100`", { parse_mode: "Markdown" });
  return;
}

let target_id = parts[0];
let amount_str = parts[1];

if (!target_id.match(/^\d+$/)) {
  Bot.sendMessage("❗ Invalid user ID.");
  return;
}

let amount = parseFloat(amount_str);
if (isNaN(amount) || amount >= 0) {
  Bot.sendMessage("❗ Invalid amount. Use a negative number to remove balance.");
  return;
}

// Get current balance
let currency = Bot.getProperty("currency") || "USDT";
let current = Bot.getProperty("balance_" + target_id) || 0;
let updated = current + amount; // amount is negative

if (updated < 0) {
  Bot.sendMessage("❗ Cannot remove. User's balance cannot go below 0.");
  return;
}

// Save new balance
Bot.setProperty("balance_" + target_id, updated, "float");

// Notify user
Api.sendMessage({
  chat_id: target_id,
  text: "❌ Admin removed *" + (amount * -1) + " " + currency + "* from your account.\nNew Balance: *" + updated + " " + currency + "*",
  parse_mode: "Markdown"
});

// Confirm to admin
Bot.sendMessage("✅ Removed *" + (amount * -1) + " " + currency + "* from user ID `" + target_id + "`.\nNew balance: *" + updated + "*", { parse_mode: "Markdown" });
