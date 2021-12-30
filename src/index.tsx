import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from '@/layouts/index';
import Home from '@/pages/index';
import Entry from '@/pages/Entry';
import Room from '@/pages/Room';

import './global.less';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/entry" element={<Entry />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="/entry" element={<Room />} />
        </Route>
      </Routes>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
