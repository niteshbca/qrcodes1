import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Details = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  // Fetch items from API
  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(res => {
        setItems(res.data);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, [items]);

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Add new item
  const handleAddItem = () => {
    if (input.trim()) {
      axios.post('http://localhost:5000/add', { text: input })
        .then(res => {
          setInput('');
        })
        .catch(err => console.error('Error adding item:', err));
    }
  };

  // Delete item
  const handleDeleteItem = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`)
      .then(res => {
        setItems(items.filter(item => item._id !== id));
      })
      .catch(err => console.error('Error deleting item:', err));
  };

  return (
    <div>
      <h1>Item Add</h1>
      <input 
        type="text" 
        value={input} 
        onChange={handleInputChange} 
        placeholder="Add a new item" 
      />
      <button onClick={handleAddItem}>Add Item</button>

      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.text}
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
