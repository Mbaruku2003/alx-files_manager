import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        this.client = new MongoClient(`mongodb://${host}:${port}`, {
            useUnifiedTopology: true,
        });
        this.dbName = database;
        this.connected = false;

        // Initialize connection
        this.client.connect()
            .then(() => {
                this.db = this.client.db(this.dbName);
                this.connected = true;
                console.log('Connected to MongoDB');
            })
            .catch((error) => {
                console.error('Failed to connect to MongoDB:', error);
            });
    }

    isAlive() {
        return this.connected;
    }

    async nbUsers() {
        if (!this.isAlive()) {
            throw new Error('Database not connected');
        }
        const usersCollection = this.db.collection('users');
        return usersCollection.countDocuments();
    }

    async nbFiles() {
        if (!this.isAlive()) {
            throw new Error('Database not connected');
        }
        const filesCollection = this.db.collection('files');
        return filesCollection.countDocuments();
    }
}

// Export a single instance of DBClient
const dbClient = new DBClient();
export default dbClient;

