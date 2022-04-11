const TelegramBot = require("node-telegram-bot-api");
const latinToCyrillic = require("latin-to-cyrillic");
const cyrillicToLatin = require("cyrillic-to-latin");
const { TOKEN } = require("../config");

const bot = new TelegramBot(TOKEN, {
    polling: true
});

bot.on("message", async (msg) => {
    let chatId = msg.from.id;
    let msgId = msg.message_id;
    let text = msg.text;
    try {
        if (text == "/start") {
            await bot.sendMessage(chatId, `Assalamu alaykum ${msg.from.first_name}. Men matnni tarjima qilib beraman`);
        } else if (text && text !== "/start") {
            await bot.sendMessage(chatId, "Tarjima turini tanlang: ", {
                reply_to_message_id: msgId,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "Lotin",
                                callback_data: "latin"
                            },
                            {
                                text: "Krill",
                                callback_data: "krill"
                            },
                        ]
                    ]
                }
            })
        }
    } catch (err) {
        await bot.sendMessage(chatId, err.message);
    }
});
bot.on("callback_query", async (query) => {
    let data = query.data;
    let chatId = query.from.id;
    try {
        if (data == "latin") {
            let text = query.message.reply_to_message.text;
            let translateText = cyrillicToLatin(text);
            await bot.sendMessage(chatId, translateText);
        } else if (data == "krill") {
            let text = query.message.reply_to_message.text;
            let translateText = latinToCyrillic(text);
            await bot.sendMessage(chatId, translateText);
        }
    } catch (err) {
        await bot.sendMessage(chatId, err.message);
    }
})
