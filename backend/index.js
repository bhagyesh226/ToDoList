import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Item from './models/Item.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes

// Create (POST) - Add a new item with name and email
app.post('/items', async (req, res) => {
  try {
    const { name, email } = req.body;  // Destructure both name and email from request body

    if (!name || !email) {  // Basic validation
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const item = new Item({ name, email });
    await item.save();  // Save item to MongoDB
    res.status(201).json(item);  // Respond with the newly created item
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read (GET) - Fetch all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();  // Retrieve all items from the database
    res.json(items);  // Send back the items
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update (PUT) - Update an existing item by ID
app.put('/items/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const item = await Item.findByIdAndUpdate(req.params.id, { name, email }, { new: true });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);  // Respond with the updated item
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete (DELETE) - Delete an item by ID
app.delete('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);  // Delete the item by ID

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted' });  // Respond with a success message
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
