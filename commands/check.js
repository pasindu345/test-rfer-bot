/*CMD
  command: check
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let status = options.result.status;
let joined = Bot.getProperty("joinedChannels", 0);
let total = Bot.getProperty("totalChannels", 1);

if (status == "member" || status == "administrator" || status == "creator") {
  joined += 1;
  Bot.setProperty("joinedChannels", joined, "integer");

  if (joined == total) {
    // === ALL CHANNELS JOINED ===

    // === Reward Referrer now
    let referrer_id = User.getProperty("referrer_id");
    if (referrer_id) {
      let reward = Bot.getProperty("refer_reward") || 1;
      let currency = Bot.getProperty("currency") || "USDT";

      let bal = Bot.getProperty("balance_" + referrer_id) || 0;
      let new_bal = bal + reward;
      Bot.setProperty("balance_" + referrer_id, new_bal, "float");

      // Update referral count
      let refs = Bot.getProperty("ref_total_" + referrer_id) || 0;
      Bot.setProperty("ref_total_" + referrer_id, refs + 1, "integer");

      // Notify referrer
      Api.sendMessage({
        chat_id: referrer_id,
        text: "🎉 You earned <b>" + reward + " " + currency + "</b> for referring @" +
          (user.username || "a user") + "!\n💰 <b>New Balance:</b> " + new_bal + " " + currency,
        parse_mode: "html"
      });
    }

    // === User Count Add once
    if (!User.getProperty("UserDone")) {
      User.setProperty("UserDone", true, "boolean");

      var stat = Libs.ResourcesLib.anotherChatRes("status", "global");
      stat.add(1);
    }

    Bot.runCommand("menu");
  }

} else {
  Bot.sendMessage("*⚠️ You Must Join All Required Channels*", { parse_mode: "Markdown" });
}
