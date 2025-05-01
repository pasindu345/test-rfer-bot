/*CMD
  command: create_gift_code2
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
  Bot.sendMessage("❗ Access denied.");
  return;
}

let amount = parseFloat(message);
if (isNaN(amount) || amount <= 0) {
  Bot.sendMessage("❗ Invalid amount. Please enter a positive number:");
  Bot.runCommand("process_gift_amount");
  return;
}

// Generate random gift code (20 characters)
function generateGiftCode(){
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 20; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

let gift_code = generateGiftCode();

// Save code info
Bot.setProperty("gift_" + gift_code, {
  amount: amount,
  used_by: null
}, "json");

Bot.sendMessage("✅ Gift Code created successfully!\n\n🔑 *Gift Code:* `" + gift_code + "`\n💰 *Amount:* `" + amount + "`", { parse_mode: "Markdown" });
