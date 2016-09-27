import React from 'react';
import NavBar from './components/NavBar';

const App = props => {
  return (
    <div>
      <NavBar />
      {props.children}
    </div>
  );
};

export default App;
