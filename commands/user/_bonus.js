/*CMD
  command: /bonus
  help: 
  need_reply: false
  auto_retry_time: 
  folder: user

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 🎁 bonus
  group: 
CMD*/

// === Delete Previous Message (if callback) ===
if (request && request.message) {
  Api.deleteMessage({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id
  });
}

// === Ban Check ===
let stat = Bot.getProperty(user.telegramid + "_Ban");
if (stat == "ban") {
  Bot.sendMessage("🚫 *You are banned from using this bot.*", { parse_mode: "Markdown" });
  Bot.runCommand("/start");
  return;
}

// === Maintenance Mode Check ===
let maintenance = Bot.getProperty("maintenance_mode");
if (maintenance === true) {
  Bot.sendMessage("⚠️ *Bot is under Maintenance.*\nPlease try again later.", { parse_mode: "Markdown" });
  Bot.runCommand("/start");
  return;
}

// === Improved Force Join Check ===
let ch1 = Bot.getProperty("channel1");
let ch2 = Bot.getProperty("channel2");
let ch3 = Bot.getProperty("channel3");

if (ch1 || ch2 || ch3) {
    let joined = User.getProperty("joined");
    
    if (joined !== "Yes") {
        let allJoined = true;
        let unjoinedChannels = [];
        
        if (ch1) {
            let isMember1 = Api.getChatMember({
                chat_id: ch1,
                user_id: user.telegramid
            });
            if (!isMember1 || isMember1.status === "left" || isMember1.status === "kicked") {
                allJoined = false;
                unjoinedChannels.push(ch1);
            }
        }
        
        if (ch2) {
            let isMember2 = Api.getChatMember({
                chat_id: ch2,
                user_id: user.telegramid
            });
            if (!isMember2 || isMember2.status === "left" || isMember2.status === "kicked") {
                allJoined = false;
                unjoinedChannels.push(ch2);
            }
        }
        
        if (ch3) {
            let isMember3 = Api.getChatMember({
                chat_id: ch3,
                user_id: user.telegramid
            });
            if (!isMember3 || isMember3.status === "left" || isMember3.status === "kicked") {
                allJoined = false;
                unjoinedChannels.push(ch3);
            }
        }
        
        if (!allJoined) {
            let message = "⚠️ *You must join all required channels to use the bot.*\n\n";
            
            // Add invite links for unjoined channels
            unjoinedChannels.forEach(channel => {
                let chat = Api.getChat({ chat_id: channel });
                if (chat && chat.invite_link) {
                    message += `👉 [Join Channel](${chat.invite_link})\n`;
                }
            });
            
            Bot.sendMessage(message, { parse_mode: "Markdown" });
            Bot.runCommand("/start");
            return;
        } else {
            // Mark as joined if all channels are joined
            User.setProperty("joined", "Yes", "string");
        }
    }
}

// === Bonus Cooldown Check ===
let uid = user.telegramid;
let now = new Date().getTime();
let last_claim = Bot.getProperty("bonus_last_" + uid);
let cooldown = 24 * 60 * 60 * 1000; // 24 hours

if (last_claim && (last_claim + cooldown) > now) {
  let remaining = (last_claim + cooldown) - now;
  let hrs = Math.floor(remaining / (1000 * 60 * 60));
  let mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

  Bot.sendMessage("⏳ *You already claimed your bonus.*\n\nNext claim available in: *" + hrs + "h " + mins + "m*", { parse_mode: "Markdown" });
  return;
}

// === Grant Bonus ===
let reward = Bot.getProperty("refer_reward") || 1; // fallback reward
let currency = Bot.getProperty("currency") || "USDT";

let bal_key = "balance_" + uid;
let bal = Bot.getProperty(bal_key) || 0;
let new_bal = bal + reward;

Bot.setProperty(bal_key, new_bal, "float");
Bot.setProperty("bonus_last_" + uid, now, "integer");

// === Notify user ===
Bot.sendMessage("🎉 *Bonus claimed!*\n\nYou received *" + reward + " " + currency + "*.\n💰 *New Balance:* " + new_bal + " " + currency, { parse_mode: "Markdown" });

// === Notify proof channel ===
let proof_channel = Bot.getProperty("proof_channel");
let date = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" });

let proof_text =
"<b>🎁 Bonus Claimed</b>\n\n" +
"👤 <b>Username:</b> @" + (user.username || "Not set") + "\n" +
"🆔 <b>User ID:</b> <code>" + uid + "</code>\n" +
"💰 <b>Amount:</b> <code>" + reward + " " + currency + "</code>\n" +
"⏰ <b>Time:</b> " + date;

if (proof_channel) {
  Api.sendMessage({
    chat_id: proof_channel,
    text: proof_text,
    parse_mode: "HTML"
  });
}

// === Done ===
// No Bot.run() needed. Bonus claimed successfully.
