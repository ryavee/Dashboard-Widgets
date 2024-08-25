import React, { useState } from 'react';
import './Donut.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data, total }) => {
  const options = {
    plugins: {
      legend: {
        display: false, // We manage the legends manually
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false, // Let the chart resize
  };

  return (
    <div className="donut-chart-wrapper">
      <Doughnut data={data} options={options} />
      <div className="donut-chart-total">{total} Total</div>
    </div>
  );
};

const Card = ({ id, title, data, onRemove }) => {
  const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0); // Calculate total

  return (
    <div className="donut-card">
      <h2 className="donut-card-title">{title}</h2>
      <div className="donut-card-body">
        {/* Donut Chart */}
        <div className="donut-chart-wrapper">
          <DonutChart data={data} total={total} />
        </div>
        
        {/* Legends on the right side */}
        <ul className="donut-legend-list">
          {data.labels.map((label, index) => (
            <li key={index} className="donut-legend-item">
              <span
                className="donut-legend-color-box"
                style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
              ></span>
              <span>{label} ({data.datasets[0].data[index]})</span>
            </li>
          ))}
        </ul>
      </div>
      {/* "X" button that appears on hover */}
      <button
        className="donut-remove-widget"
        onClick={(e) => {
          e.stopPropagation(); // Prevent click event on button from bubbling up to card
          onRemove(id);
        }}
      >
        &times;
      </button>
    </div>
  );
};

const AddWidgetCard = ({ onAdd }) => {
  return (
    <div className="donut-card donut-add-widget-card" onClick={onAdd}>
      <button className="donut-add-widget-button">
        <span>+ Add Widget</span>
      </button>
    </div>
  );
};

const Donut = () => {
  const [widgets, setWidgets] = useState([
    {
      id: 1,
      title: 'Cloud Accounts',
      data: {
        labels: ['Connected', 'Not Connected'],
        datasets: [
          {
            data: [2, 2],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384'],
          },
        ],
      },
      total: 4,
    },
    {
      id: 2,
      title: 'Cloud Account Risk Assessment',
      data: {
        labels: ['Failed', 'Warning', 'Not Available', 'Passed'],
        datasets: [
          {
            data: [1689, 681, 36, 7253],
            backgroundColor: ['#FF6384', '#FFCE56', '#FF9F40', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#FFCE56', '#FF9F40', '#4BC0C0'],
          },
        ],
      },
      total: 9659,
    },
  ]);

  // Remove a widget
  const removeWidget = (id) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };

  // Handle adding a new widget
  const handleAddWidget = () => {
    // Logic to handle adding a widget
    console.log('Add Widget clicked');
  };

  return (
    <div className="donut-container">
      <h1 className="donut-heading">CSPM Executive Donut</h1>
      <div className="donut-cards-wrapper">
        {widgets.map(widget => (
          <Card
            key={widget.id}
            id={widget.id}
            title={widget.title}
            data={widget.data}
            total={widget.total}
            onRemove={removeWidget}
          />
        ))}
        <AddWidgetCard onAdd={handleAddWidget} />
      </div>
    </div>
  );
};

export default Donut;
