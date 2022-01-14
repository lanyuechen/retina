import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/layouts/index';
import Home from '@/pages/Home';
import Join from '@/pages/Join';
import Room from '@/pages/Room';
import Test from '@/pages/Test';
import NotFound from '@/pages/404';

import './global.less';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/join" element={<Join />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
