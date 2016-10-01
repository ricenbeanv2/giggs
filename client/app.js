import React from 'react';
import NavBar from './components/NavBar';
import Chat from './components/account/chat';

const App = props => {
  return (
    <div>
      <NavBar />
      {props.children}
      {/* <Chat /> */}
    </div>
  );
};

export default App;
