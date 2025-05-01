/*CMD
  command: /joined
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

// === Load channels from property ===
let ch1 = Bot.getProperty("channel1");
let ch2 = Bot.getProperty("channel2");
let ch3 = Bot.getProperty("channel3");

let channels = [];
if(ch1){ channels.push(ch1); }
if(ch2){ channels.push(ch2); }
if(ch3){ channels.push(ch3); }

let user_id = user.telegramid;

// === Check join status channel by channel ===
let notJoined = [];

function checkStatus(chat, nextCommand){
  Api.getChatMember({
    chat_id: chat,
    user_id: user_id,
    on_result: nextCommand
  });
}

function check3(){
  if(!ch3){
    finalizeCheck();
    return;
  }
  let res = options.result.status;
  if(res != "member" && res != "administrator" && res != "creator"){
    notJoined.push(ch3);
  }
  finalizeCheck();
}

function check2(){
  if(!ch2){
    check3();
    return;
  }
  let res = options.result.status;
  if(res != "member" && res != "administrator" && res != "creator"){
    notJoined.push(ch2);
  }
  checkStatus(ch3, "check3");
}

function check1(){
  let res = options.result.status;
  if(res != "member" && res != "administrator" && res != "creator"){
    notJoined.push(ch1);
  }
  checkStatus(ch2, "check2");
}

function finalizeCheck(){
  if(notJoined.length > 0){
    Bot.sendMessage("⚠️ You have not joined all required channels.\nPlease join them and try again.");
    Bot.runCommand("/start");
  } else {
    // Save "joined = Yes"
    User.setProperty("joined", "Yes", "string");
    Bot.sendMessage("✅ All channels joined successfully! Welcome.");
    Bot.runCommand("/menu");
  }
}

// === Start check ===
checkStatus(ch1, "check");
