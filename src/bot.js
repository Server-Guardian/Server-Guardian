// Imports
const client = require("./botClient")
const app = require("../dashboard/expressClient")
require("dotenv").config()
const port = process.env.PORT || 3000

// Loaders
const loadCommands = require("./loaders/commands")
loadCommands()
const loadEvents = require("./loaders/events")
loadEvents()
let logChannelId = "1265028864397283349"
async function sendToLog(message) {
    const logChannel = await client.channels.fetch(logChannelId);
    logChannel.send(`${message}`)
}

process.on("unhandledRejection", (reason, promise) => {
    console.log(`unhandledRejection at: ${promise} voor ${reason}`)
    sendToLog(`unhandledRejection at: ${promise} voor ${reason}`)
})
process.on("uncaughtException", (err) => {
    console.log(`uncaughtException: ${err}`)
    sendToLog(`uncaughtException: ${err}`)
})
process.on("uncaughtExceptionMonitor", (err, orgin) => {
    console.log(`uncaughtExceptionMonitor: ${err}  ${orgin}`)
    sendToLog(`uncaughtExceptionMonitor: ${err}  ${orgin}`)
})


// client.on("debug", console.debug)
client.on("warn", console.warn)

app.listen(port, "0.0.0.0", function () {
	console.log("✅| Dashboard");
})
