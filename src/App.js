/* App.js */
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Donut from './components/Donut/Donut';
import Emptywidget from './components/Emptywidget/Emptywidget';
import Registry from './components/Registry/Registry';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Donut />
      <Emptywidget />
      < Registry />
    </div>
  );
};

export default App;
