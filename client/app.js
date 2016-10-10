import React from 'react';
import NavBar from './components/NavBar';
import Chat from './components/account/chat';

const App = props => {
  let content = '';
  if (props.children){
    content = props.children
  } else {
    content = (
      <div className="home">
        <div className="bgimg-1">
          <div className="home__title center">
            <div className="home__text-wrap">
              <h1><strong>Looking for a local job nearby?</strong></h1>
              <h4><strong>Search for jobs now and apply with one-click!</strong></h4>
              <div className="home__search">
                <form action="#">
                  <input type="text" placeholder="Enter a search term here" />
                  <button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="bgimg-2">
          <div className="home__title center">
            <div className="home__text-wrap">
              <h1><strong>Hire people from your community.</strong></h1>
              <h4><strong>Sign-up & Creat a job now!</strong></h4>
              <div className="home__search">
                <button type="submit" className="btn btn-primary">Sign Up</button>
                <a className="btn btn--decorated btn--facebook" href="/auth/facebook">
                  <i className="fa fa-facebook"></i>Facebook Sign Up
                </a>
              </div>
            </div>
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
