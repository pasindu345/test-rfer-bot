/*CMD
  command: admin_add_payment
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
  answer: Please enter a new *payment method name* (e.g., Binance, Crypto, Mobile Reload)


  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let input = message.trim();
let raw_methods = input.split(",").map(m => m.trim());

if (raw_methods.length == 0) {
  Bot.sendMessage("❗ Invalid input. Enter again:");
  Bot.runCommand("save_payment_methods");
  return;
}

// === Save each method to separate property ===
for (let i = 0; i < raw_methods.length; i++) {
  let prop_name = "method_" + i;
  Bot.setProperty(prop_name, raw_methods[i], "string");
}

// === Also save total count ===
Bot.setProperty("method_count", raw_methods.length, "integer");

// === Confirm to admin ===
let text = "*✅ Saved Payment Methods:*\n\n";
raw_methods.forEach(function(m, i){
  text += (i+1) + ". " + m + "\n";
});
Bot.sendMessage(text, { parse_mode: "Markdown" });
