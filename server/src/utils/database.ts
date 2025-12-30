import mongoose, { mongo } from 'mongoose'
import { logger } from './logger'


const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/youtube-clone?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.10"

export async function connectToDatabase() {
    try {
        await mongoose.connect(DB_CONNECTION_STRING)
        logger.info('connect to database')
    } catch (e) {
        logger.error(e, "Failed to connect to database. Goodbye")
        process.exit(1)
    }
}

export async function disconectFromDB() {
    await mongoose.connection.close()


    logger.info("Disconnected from DB")
}