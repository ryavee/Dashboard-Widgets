import React, { useState } from 'react';
import './Registry.css';

// Data for the charts
const initialData = {
  1: {
    id: 1,
    title: 'Image Risk Assessment',
    total: 1470,
    categories: [
      { name: 'Critical', count: 9, color: '#dc3545' },
      { name: 'High', count: 150, color: '#ffc107' },
      { name: 'Low', count: 369, color: '#17a2b8' },
      { name: 'Safe', count: 942, color: '#28a745' },
    ],
  },
  2: {
    id: 2,
    title: 'Image Security Issues',
    total: 20,
    categories: [
      { name: 'Critical', count: 3, color: '#dc3545' },
      { name: 'High', count: 4, color: '#ffc107' },
      { name: 'Low', count: 7, color: '#17a2b8' },
      { name: 'Safe', count: 6, color: '#28a745' },
    ],
  },
};

const Registry = () => {
  const [data, setData] = useState(initialData);

  // Function to calculate the total percentage width for each category
  const calculateWidth = (category, total) => {
    return `${(category.count / total) * 100}%`;
  };

  // Function to remove a card
  const removeCard = (id) => {
    const updatedData = { ...data };
    delete updatedData[id];
    setData(updatedData);
  };

  return (
    <div className="registry">
      <h1 className="registry-title">Registry Scan</h1>
      <div className="cards-container">
        {Object.values(data).map((chartData) => (
          <div key={chartData.id} className="registry-card">
            <h2 className="registry-card-title">{chartData.title}</h2>
            <p className="registry-summary">
              <span>{chartData.total}</span> Total {chartData.title.includes('Risk') ? 'Vulnerabilities' : 'Images'}
            </p>

            {/* Remove Widget Button */}
            <button className="remove-widget" onClick={() => removeCard(chartData.id)}>
              &times;
            </button>

            {/* Horizontal Bar */}
            <div className="horizontal-bar">
              {chartData.categories.map((category) => (
                <div
                  key={category.name} // Use category name as a unique identifier
                  className="chart-bar"
                  style={{
                    width: calculateWidth(category, chartData.total),
                    backgroundColor: category.color,
                  }}
                ></div>
              ))}
            </div>

            {/* Legend */}
            <div className="registry-legend">
              {chartData.categories.map((category) => (
                <div key={category.name} className="legend-item">
                  <div
                    className="legend-color"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span>{category.name} ({category.count})</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add Widget Card */}
        <div className="registry-card empty-card">
          <button className="add-widget">+ Add Widget</button>
        </div>
      </div>
    </div>
  );
};

export default Registry;
