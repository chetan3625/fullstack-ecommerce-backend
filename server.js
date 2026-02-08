require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db.config');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        // If the DB is unreachable, exit so container/process restarts and logs are visible
        console.error('Startup aborted because database connection failed.');
        process.exit(1);
    }
})();
