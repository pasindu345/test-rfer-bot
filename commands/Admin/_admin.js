/*CMD
  command: /admin
  help: 
  need_reply: false
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
  Bot.sendMessage("Access denied. You are not admin.");
  return;
}

// Inline keyboard buttons, arranged in two columns
let keyboard = [
  [
    { text: "➕ Add Currency", callback_data: "set_currency_name" },
    { text: "➕ Add Balance", callback_data: "admin_add_balance" }
  ],
  [
    { text: "➖ Remove Balance", callback_data: "admin_remove_balance" },
    { text: "📢 Add Proof Channel", callback_data: "admin_add_proof" }
  ],
  [
    { text: "🔢 Set Min Withdraw", callback_data: "admin_set_min_withdraw" },
    { text: "🔼 Set Max Withdraw", callback_data: "admin_set_max_withdraw" }
  ],
  [
    { text: "🎁 Set Refer Reward", callback_data: "admin_set_refer_reward" },
    { text: "💳 Withdraw Status", callback_data: "withdraw_status" }
  ],
  [
  { text: "🔐 Create Gift Code", callback_data: "create_gift_code" },
  { text: "📢 Set channel(s)", callback_data: "add_channel" }
  ],
  [
  { text: "🔔 Unban User", callback_data: "/unban" },
  { text: "🔕 Ban User", callback_data: "/ban" }
  ],
  [
  {text: "📚 Add Micro Task", callback_data: "micro_add" },
  {text: "🛠️ Remove Micro Task", callback_data: "remove_micro" }
  ],
  [
  { text: "⚙️ Manage Micro Task Status", callback_data: "micro_status" }
  ],
  [
  { text: "📤 Send Message", callback_data: "send_message" },
  { text: "📣 Broadcast", callback_data: "send_message" }
  ],
  [
    { text: "💰 Spending Balance", callback_data: "manage_spedfing_balance" }
  ],
  [
    { text: "🛠️ Maintenance ON/OFF", callback_data: "admin_toggle_maintenance" }
  ]
];

Api.sendMessage({
  chat_id: user.chatid,
  text: "*Admin Panel*",
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: keyboard
  }
});
