/*CMD
  command: ask_contact_msg
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

// Command: ask_support_message

let msg = message.trim();
if (msg.length < 3) {
  Bot.sendMessage("❗ Message is too short. Try again:");
  Bot.runCommand("ask_support_message");
  return;
}

let admin = Bot.getProperty("admin");
let userName = user.first_name;
let userID = user.telegramid;
let username = user.username ? "@" + user.username : "Not set";
let userLink = "<a href='tg://user?id=" + userID + "'>" + userName + "</a>";

let adminText =
  "<b>🆕 New support message 📞</b>\n\n" +
  "🧑 <b>User:</b> " + userName + "\n" +
  "🔗 <b>Link:</b> " + userLink + "\n" +
  "👥 <b>Username:</b> " + username + "\n" +
  "🆔 <b>User ID:</b> <code>" + userID + "</code>\n\n" +
  "💬 <b>Message:</b>\n<i>" + msg + "</i>";

let button = [[{ text: "✏️ Reply to " + userName, callback_data: "/reply " + userID }]];

Api.sendMessage({
  chat_id: admin,
  text: adminText,
  parse_mode: "html",
  reply_markup: { inline_keyboard: button }
});

Bot.sendMessage("✅ Your message has been sent to admin. Please wait for a reply.");

