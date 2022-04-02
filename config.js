require("dotenv").config();

const { env } = process;
module.exports = {
    TOKEN: env.TOKEN,
    APP_URL: env.APP_URL
}