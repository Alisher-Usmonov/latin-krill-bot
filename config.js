require("dotenv").config();

const { env } = process;
module.exports = {
    TOKEN: env.TOKEN,
    URL: env.URL
}