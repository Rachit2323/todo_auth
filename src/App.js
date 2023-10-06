import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signin from './Components/Sigin.js';
import Todo from './Components/TodoList.js';
import Signup from './Components/Signup.js';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/todo" element={<Todo />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
