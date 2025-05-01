/*CMD
  command: bonus_claim_ui
  help: 
  need_reply: false
  auto_retry_time: 
  folder: user

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let status = options.result.status;
let joined = Bot.getProperty("bonus_joinedChannels", 0);
let total = Bot.getProperty("bonus_totalChannels", 1);

if (status == "member" || status == "administrator" || status == "creator") {
  joined += 1;
  Bot.setProperty("bonus_joinedChannels", joined, "integer");

  if (joined == total) {
    Bot.runCommand("bonus_claim_ui");
  }

} else {
  Bot.sendMessage("*⚠️ You must join all required channels before claiming bonus.*", { parse_mode: "Markdown" });
}
