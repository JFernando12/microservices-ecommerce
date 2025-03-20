import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'api-gateway',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

export const kafkaProducer = kafka.producer();

const initKafka = async () => {
    await kafkaProducer.connect();
    console.log('✅ Kafka Producer connected');
};

initKafka().catch(console.error);
