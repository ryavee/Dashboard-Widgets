import React, { useState } from 'react';
import './EmptyWidgetSidebar.css';

const EmptyWidgetSidebar = ({ isOpen, onClose, onAddWidget }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddWidget(title);
      setTitle(''); // Clear the input after submission
    }
  };

  return (
    <div className={`emptywidget-sidebar ${isOpen ? 'active' : ''}`}>
      <div className="emptywidget-sidebar-header">
        <h2 className="emptywidget-sidebar-title">Add Widget</h2>
        <button className="emptywidget-close-sidebar" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="emptywidget-sidebar-subtitle">
        Personalize your dashboard by adding a chart
      </div>
      <form className="emptywidget-sidebar-form" onSubmit={handleSubmit}>
        <div className="emptywidget-title-input-group">
          <label htmlFor="widget-title">Title:</label>
          <input
            type="text"
            id="widget-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter widget title"
          />
        </div>
        <button type="submit" className="emptywidget-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmptyWidgetSidebar;
