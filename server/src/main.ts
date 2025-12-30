import express from 'express'
import cookieParser from 'cookie-parser'
import { logger } from './utils/logger';
import { connectToDatabase, disconectFromDB } from './utils/database';
import cors from "cors"
import { CORS_ORIGIN } from './constants';
import helmet from 'helmet';
import userRoute from './modules/user/user.route'
import authRoute from './modules/auth/auth.route'
import videoRoute from './modules/videos/video.route'
import deserializeUser from './middleware/deserializeUser';

const PORT = process.env.PORT || 4000;
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
})
);
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
    })
)

app.use(deserializeUser) // checks for every request i think

const server = app.listen(PORT, async () => {
    await connectToDatabase()
    logger.info(`server listening at http://127.0.0.1:${PORT}`)
})




app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/videos', videoRoute)



function gracefulShutdown(signal: string) {
    process.on(signal, async () => {
        logger.info("Goodbye, got signal " + signal);

        server.close();

        // disconects from the db

        await disconectFromDB()

        logger.info("My work here is done")

        process.exit(0)
    })
}

const signals: string[] = ["SIGTERM", "SIGINT"]


for (let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i] as string)
}