import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([{ name: '', number: '' }]);

  const handleAddItem = () => {
    setItems([...items, { name: '', number: '' }]);
  };

  const handleItemChange = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      items,
    };
    onSubmit(data);
    onClose(); // Close the sidebar after submission
  };

  return (
    <div className="sidebar active">
      {/* Header Section */}
      <header className="sidebar-header">
        <h4 className="sidebar-title">Add Widget</h4>
        <button className="close-sidebar" onClick={onClose}>
          &times;
        </button>
      </header>

      {/* Subtitle */}
      <p className="sidebar-subtitle">Personalize your dashboard by adding a chart</p>

      <form onSubmit={handleSubmit}>
        <div className="title-input-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        {items.map((item, index) => (
          <div key={index} className="item-inputs">
            <div className="title-input-group">
              <label>Item Name</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                required
              />
              <button type="button" className="s-remove-item" onClick={() => handleRemoveItem(index)}>
                &times;
              </button>
            </div>
            <div className="title-input-group">
              <label>Item Number</label>
              <input
                type="number"
                value={item.number}
                onChange={(e) => handleItemChange(index, 'number', e.target.value)}
                required
              />
            </div>
          </div>
        ))}
        <div className="button-container">
          <button type="button" onClick={handleAddItem}>
            Add More Item
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Sidebar;
