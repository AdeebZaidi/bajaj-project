const express = require('express');
const bfhlRoutes = require('./routes/bfhl');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000; // Change to 5002 or any other unused port

app.use(cors());
app.use(express.json()); // To handle JSON requests

app.use('/bfhl', bfhlRoutes);

// Error handling for server
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
