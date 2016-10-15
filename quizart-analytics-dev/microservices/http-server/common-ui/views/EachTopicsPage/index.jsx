import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MainAppBar from '../../components/MainAppBar';
import ChatDrawer from '../../components/Chat/ChatDrawer';
import AbtTopic from '../../components/AbtTopic';
import MediaQuery from 'react-responsive';
import TabsMobile from '../../components/Tabs';
import Timeline from '../../components/Timeline';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class EachTopicsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    var style = {
      paddingRight:0,
    };

    var pos = {
      position:'fixed',
    };

    var bodyContainer = {
      padding: "16px",
      paddingTop: "65px",

    }
    return (
      <div>
        <MainAppBar/>
        <MediaQuery query='(max-device-width: 800px)'>
          <MediaQuery query='(max-width: 800px)'>
          <TabsMobile page="TopicPage" id={this.props.params.id}/>
          </MediaQuery>
        </MediaQuery>

        <MediaQuery query='(min-device-width: 800px)'>
          <MediaQuery query='(min-width: 800px)'>
            <div className="container-fluid" >
              <div className="row" style={{width: "100%"}}>
                <div style={{width: "100%"}} >
                  <div className="row" >
                    <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
                      <div className="row">
                        <div className="col-xs-10 col-sm-12 col-md-12 col-lg-10 col-lg-offset-1" >
                          <Tabs style={bodyContainer} value={this.state.value} onChange={this.handleChange}>
                            <Tab label="Cartoon" value="a" >
                              
                                <AbtTopic id={this.props.params.id}/>
                              
                            </Tab>
                            <Tab label="Feeds" value="b">
                              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                                <Timeline hashtag ="topic"/>
                              </div>
                            </Tab>
                          </Tabs>
                        </div>
                            {/*<div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"  style={{paddingTop:20}}>
                              <ChatDrawer/>
                            </div>*/}
                          
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </MediaQuery>
        </MediaQuery>
        </div>
    );
  }
}