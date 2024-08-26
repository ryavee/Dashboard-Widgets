import React, { useState } from 'react';
import './Registry.css';
import RegistrySidebar from './RegistrySidebar'; // Import the sidebar component

const initialData = {
  1: {
    id: 1,
    title: 'Image Risk Assessment',
    subtitle: 'Total Vulnerabilities',
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
    subtitle: 'Total Images',
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
  const [showSidebar, setShowSidebar] = useState(false);

  const calculateWidth = (category, total) => {
    return `${(category.count / total) * 100}%`;
  };

  const removeCard = (id) => {
    const updatedData = { ...data };
    delete updatedData[id];
    setData(updatedData);
  };

  const handleSidebarClose = () => {
    setShowSidebar(false);
  };

  const handleSidebarSubmit = (newData) => {
    const newId = Object.keys(data).length + 1;
    const total = newData.items.reduce((sum, item) => sum + parseInt(item.number, 10), 0);

    const chartData = {
      id: newId,
      title: newData.title,
      subtitle: `${total} ${newData.subtitle}`, // Ensure total appears correctly
      total,
      categories: newData.items.map(item => ({
        name: item.name,
        count: parseInt(item.number, 10),
        color: '#' + Math.floor(Math.random()*16777215).toString(16), // Random color for each category
      })),
    };

    setData({ ...data, [newId]: chartData });
  };

  return (
    <div className="registry">
      <h1 className="registry-title">Registry Scan</h1>
      <div className="cards-container">
        {Object.values(data).map((chartData) => (
          <div key={chartData.id} className="registry-card">
            <h2 className="registry-card-title">{chartData.title}</h2>
            <p className="registry-summary">
              <span>{chartData.total}</span> {chartData.subtitle}
            </p>

            <button className="remove-widget" onClick={() => removeCard(chartData.id)}>
              &times;
            </button>

            <div className="horizontal-bar">
              {chartData.categories.map((category) => (
                <div
                  key={category.name}
                  className="chart-bar"
                  style={{
                    width: calculateWidth(category, chartData.total),
                    backgroundColor: category.color,
                  }}
                ></div>
              ))}
            </div>

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

        <div className="registry-card empty-card">
          <button className="add-widget" onClick={() => setShowSidebar(true)}>
            + Add Widget
          </button>
        </div>
      </div>

      {showSidebar && (
        <RegistrySidebar
          onClose={handleSidebarClose}
          onSubmit={handleSidebarSubmit}
        />
      )}
    </div>
  );
};

export default Registry;
