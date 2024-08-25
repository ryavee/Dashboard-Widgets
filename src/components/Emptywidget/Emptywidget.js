import React, { useState } from 'react';
import './Emptywidget.css';
import analysisIcon from './analysis.png'; // Ensure this path is correct

const Emptywidget = () => {
  const [widgets, setWidgets] = useState([
    { id: 1, title: 'Top 5 Namespace Specific Alerts' },
    { id: 2, title: 'Workload Alerts' },
  ]);

  const removeWidget = (id) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };

  const handleAddWidget = () => {
    // Logic to handle adding a widget
    console.log('Add Widget clicked');
  };

  return (
    <div className="empty-chart">
      <h3 className="empty-chart-title">CWPP Dashboard:</h3>
      <div className="card-container">
        {widgets.map(widget => (
          <div key={widget.id} className="card">
            <button className="remove-widget" onClick={(e) => {
              e.stopPropagation(); // Prevent click event on button from bubbling up to card
              removeWidget(widget.id);
            }}>
              &times;
            </button>
            <h4 className="card-title">{widget.title}</h4>
            <div className="no-data">
              <img
                src={analysisIcon}
                alt="analysis icon"
                className="empty-icon"
              />
              <p>No Graph data available!</p>
            </div>
          </div>
        ))}

        {/* Add Widget Card */}
        <div className="card add-widget-card">
          <button className="add-widget-button" onClick={handleAddWidget}>
            <span>+ Add Widget</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Emptywidget;
