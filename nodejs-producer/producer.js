const { Kafka, CompressionTypes } = require("kafkajs");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const kafka = new Kafka({
    clientId: process.env.PRODUCER_CLIENT_ID,
    brokers: process.env.BROKERS.split(","),
});

const topic = process.env.TOPIC;

const producer = kafka.producer();

const EVERY_3_SECONDS = 1500

/**
 * Sends one message to the Kafka Broker on the given topic
 */
const sendMessage = async () => {
    try {
        const timestamp = new Date()
        const message = {
            key: Buffer.from("nodejs-message", "utf-8"),
            value: Buffer.from(`Hello From NodeJS it's ${timestamp.toLocaleTimeString()} :D`, "utf-8")
        }
        await producer.send({
            topic,
            messages: [message],
        });

        console.log(`Sent {"${message.key}": "${message.value}"}`);

    } catch (error) {
        console.error(error)
    }
};

const run = async () => {
    await producer.connect()
    timer = setInterval(sendMessage, EVERY_3_SECONDS)
}

run().catch(console.error)

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.map(type => {
    process.on(type, async () => {
        try {
            console.log(`process.on ${type}`)
            clearInterval(timer);
            await producer.disconnect()
            process.exit(0)
        } catch (_) {
            process.exit(1)
        }
    })
})

signalTraps.map(type => {
    process.once(type, async () => {
        try {
            await producer.disconnect()
        } finally {
            process.kill(process.pid, type)
        }
    })
})