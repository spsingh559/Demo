import React from 'react';
import Profile from '../../components/Profile';
import MediaQuery from 'react-responsive';
import MainAppBar from '../../components/MainAppBar';
import ChatDrawer from '../../components/Chat/ChatDrawer';
import TabsMobile from '../../components/Tabs';
import Timeline from '../../components/Timeline';
export default class HomePage extends React.Component {
  constructor() {
    super();
  }

  render() {

    var style = {
      paddingRight:0,
    };

    var bodyContainer = {
      padding: "2px",
      paddingTop: "20px",

    }

  return (
              <div>
                <MainAppBar/>
                
                    <div className="container-fluid" >
                      <div className="row" >
                        <div style={{width: "100%"}} >
                              <div className="row">
                                  <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-lg-offset-1">
                                      <TabsMobile page="Profile" username={this.props.params.username}/>
                                  </div>
                              </div>
                        </div>
                      </div>
                    </div>
                </div>
            );
  }
};
    