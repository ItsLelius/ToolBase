import express from 'express';
import { supabase } from './supabase.js'; // Imports the connection we created

const app = express();
app.use(express.json()); // Allows the server to understand JSON data

// 1. HEALTH CHECK: Verify the connection to Supabase
app.get('/api/test-connection', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tools') 
      .select('id')
      .limit(1);

    if (error) throw error;
    res.json({ message: "Connected successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Connection failed", details: error.message });
  }
});

// 2. DATA ROUTE: Fetch all active tools
app.get('/api/tools', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('is_deleted', false); // Your specific business logic

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});