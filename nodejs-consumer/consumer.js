const { Kafka } = require("kafkajs");
const dotenv = require("dotenv");

dotenv.config();

const { CONSUMER_CLIENT_ID, BROKERS, TOPIC, GROUP_ID } = process.env

const kafka = new Kafka({
    clientId: CONSUMER_CLIENT_ID,
    brokers: BROKERS.split(","),
});

const topic = TOPIC;

const consumer = kafka.consumer({ groupId: GROUP_ID });

/**
 * Connects to a Kafka cluster, subscribes to a given topic
 * and listens asynschronously to each event published in the 
 * topic.
 */
const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                topic,
                partition,
                key: message.key.toString(),
                message: message.value.toString()
            });
        },
    });
}

run().catch(console.error)


const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.map(type => {
    process.on(type, async e => {
        try {
            console.log(`process.on ${type}`)
            console.error(e)
            await consumer.disconnect()
            process.exit(0)
        } catch (_) {
            process.exit(1)
        }
    })
})

signalTraps.map(type => {
    process.once(type, async () => {
        try {
            await consumer.disconnect()
        } finally {
            process.kill(process.pid, type)
        }
    })
})