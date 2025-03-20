// api-gateway/src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes/index';
import { kafkaProducer } from './config/kafka';

dotenv.config();
const app = express();

// Security & Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Routes
app.use('/api', routes);

// Kafka Event Example
app.post('/api/event', async (req, res) => {
    try {
        const event = req.body;
        await kafkaProducer.send({ topic: 'gateway.event', messages: [{ value: JSON.stringify(event) }] });
        res.status(200).json({ message: 'Event sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending event' });
    }
});

export default app;
