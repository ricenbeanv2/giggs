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
        <div className="bgimg-3">
          <div className="home__title center">
            <div className="home__text-wrap">
              <h1><strong>Our Team</strong></h1>
              <div className="row">
                <div className="col-xs-3">
                  <img src="../../styles/assets/alberto.jpg"></img> <br />
                  Alberto Esquivias <br />
                  <a href="https://github.com/GoDodgers">
                    <i className="fa fa-2x fa-github-alt" aria-hidden="true"></i>
                  </a>
                  <a href="https://linkedin.com/in/aesquivias">
                    <i className="fa fa-2x fa-linkedin-square" aria-hidden="true"></i>
                  </a>
                </div>
                <div className="col-xs-3">
                  <img src="../../styles/assets/calvin.png"></img> <br />
                  Calvin Lee <br />
                  <a href="https://github.com/calvin337">
                    <i className="fa fa-2x fa-github-alt" aria-hidden="true"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/calvin-lee">
                    <i className="fa fa-2x fa-linkedin-square" aria-hidden="true"></i>
                  </a>
                </div>
                <div className="col-xs-3">

                  <img src="../../styles/assets/sandy.jpeg"></img> <br />
                  Sandy Tran <br />
                  <a href="https://github.com/justsandytran">
                    <i className="fa fa-2x fa-github-alt" aria-hidden="true"></i>
                  </a>
                  <a href="http://www.linkedin.com/in/sandytrann">
                    <i className="fa fa-2x fa-linkedin-square" aria-hidden="true"></i>
                  </a>
                </div>
                <div className="col-xs-3">
                  <img src="../../styles/assets/tiffany.jpeg"></img> <br />
                  Tiffany Ip <br />
                  <a href="https://github.com/tiffanyip">
                        <i className="fa fa-2x fa-github-alt" aria-hidden="true"></i>
                      </a>
                      <a href="https://www.linkedin.com/in/tiffany-ip">
                        <i className="fa fa-2x fa-linkedin-square" aria-hidden="true"></i>
                      </a>
                    </div>
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
