const app = require('./src/app');
const connectDB = require('./src/db/db')

require('dotenv').config();
// server running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// db connect
connectDB();
