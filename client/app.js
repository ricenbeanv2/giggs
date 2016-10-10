import React from 'react';
import NavBar from './components/NavBar';
import Chat from './components/account/chat';

const App = props => {
  let content = '';
  if (props.children){
    content = props.children
  } else {
    content = (
      <div className="landing">
        <div className="bgimg-1">
          <div className="caption">
            <span className="border">Find local jobs nearby</span>
          </div>
        </div>
        <div className="bgimg-2">
          <div className="caption">
            <span className="border">Signup to hire!</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      {content}
      {/* <Chat /> */}
    </div>
  );
};

export default App;
