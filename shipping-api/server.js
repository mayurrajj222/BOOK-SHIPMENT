const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Abcd@1234', // Replace with your actual MySQL password
  database: 'shipping_db',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL database!');
  }
});

// API to Get Shipping Rate
app.get('/shipping-rate', (req, res) => {
  const { pickup, delivery, courier } = req.query;

  if (!pickup || !delivery || !courier) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  // Log received values for debugging
  console.log("📩 Received request:", { pickup, delivery, courier });

  // **Updated SQL Query with Correct Column Names**
  const sqlQuery = `
    SELECT rate FROM shipping_rates 
    WHERE courier = ? AND pickup_location = ? AND delivery_location = ?`;

  db.query(sqlQuery, [courier, pickup, delivery], (err, results) => {
    if (err) {
      console.error('🛑 MySQL Query Error:', err);  
      return res.status(500).json({ error: 'Database query failed', details: err.message });
    }

    if (results.length > 0) {
      res.json({ rate: results[0].rate });
    } else {
      res.json({ rate: 0 }); // Return 0 if no matching rate is found
    }
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
