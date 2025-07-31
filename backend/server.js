const app = require('./src/app');
const connectDB = require('./src/db/db')

require('dotenv').config();
// server running
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// db connect
connectDB();
