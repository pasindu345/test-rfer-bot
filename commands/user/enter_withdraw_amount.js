/*CMD
  command: enter_withdraw_amount
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

let min = Bot.getProperty("min_withdraw") || 1;
let max = Bot.getProperty("max_withdraw") || 1000;

let amount = parseFloat(message);
if (isNaN(amount) || amount <= 0) {
  Bot.sendMessage("❗ Invalid amount. Please enter a positive number:");
  Bot.runCommand("enter_withdraw_amount");
  return;
}

if (amount < min) {
  Bot.sendMessage("❗ Minimum withdraw amount is " + min + ". Enter again:");
  Bot.runCommand("enter_withdraw_amount");
  return;
}

if (amount > max) {
  Bot.sendMessage("❗ Maximum withdraw amount is " + max + ". Enter again:");
  Bot.runCommand("enter_withdraw_amount");
  return;
}

// Save user amount
User.setProperty("withdraw_amount", amount, "float");

// Confirm & proceed
Bot.sendMessage("✅ Withdraw amount set to *" + amount + "*\nProceeding to finalize...", { parse_mode: "Markdown" });
Bot.runCommand("finalize_withdraw");
