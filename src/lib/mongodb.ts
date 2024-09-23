import mongoose from 'mongoose';

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function connectToDatabase() {
    if(connection.isConnected) {
        console.log("DB Connection already exists...");
        return;
    }
    let dbUrl = process.env.DB_URL || 'mongodb://localhost:27017';

    try {
        const db = await mongoose.connect(dbUrl);
        if(db) {
            connection.isConnected = db.connections[0].readyState
        }
        console.log("Connected to data base...");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
    
}

export default connectToDatabase