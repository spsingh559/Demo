import React from 'react';
import MainAppBar from '../../components/MainAppBar';
import Dashboard from '../../components/dashboard';
import NavBar from '../../components/NavBar';
// import TabsMobile from '../../components/Tabs';
import MediaQuery from 'react-responsive';
import ChatDrawer from '../../components/Chat/ChatDrawer';
import SubTopicContainer from '../../components/SubTopics/SubTopicContainer';
import restUrl from '../../restUrl';
import TabsMobile from '../../components/Tabs';
//var express=require('express');
//var jsonServer=require('json-server');

var baseurl='/';

export default class Topics extends React.Component {

  constructor(props){
    super(props);
    this.state={
      topics:[{"_id":"Animals","topicName":"Animals","topicIcon":"https://quizup-questions.imgix.net/topic-icons/animals-2014-10-30T00:29:25.985Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"This topic is otter pandamonium","topicFollowers":8532,"playersPerMatch":3,"topicCategory":"Nature","__v":0},{"_id":"Basketball-Players","topicName":"Basketball Players","topicIcon":"https://quizup-questions.imgix.net/community-topic-icons/sports_hoop-00b5d9.png?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"Dribble, rebound, shoot \u0026 score","topicFollowers":2632,"playersPerMatch":3,"topicCategory":"Sports","__v":0},{"_id":"Birds","topicName":"Birds","topicIcon":"https://quizup-questions.imgix.net/community-topic-icons/nature_bird-017d46.png?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"No fowl play allowed","topicFollowers":6422,"playersPerMatch":3,"topicCategory":"Nature","__v":0},{"_id":"Bollywood-Movies","topicName":"Bollywood Movies","topicIcon":"https://quizup-questions.imgix.net/community-topic-icons/movies_claptree-ffbe1a.png?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"How well do you know your movies?","topicFollowers":9981,"playersPerMatch":3,"topicCategory":"Movies","__v":0},{"_id":"C-C++","topicName":"C C++","topicIcon":"https://quizup-questions.imgix.net/community-topic-icons/science_moonlander-66d3e8.png?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"Be aware of your pointers!","topicFollowers":8632,"playersPerMatch":3,"topicCategory":"Computer Science","__v":0},{"_id":"Cartoons","topicName":"Cartoons","topicIcon":"https://quizup-questions.imgix.net/topic-icons/retro-cartoons-2014-10-31T11:32:46.062Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"What's up, Mickey?","topicFollowers":9550,"playersPerMatch":3,"topicCategory":"TV","__v":0},{"_id":"Cricket-Players","topicName":"Cricket Players","topicIcon":"https://quizup-questions.imgix.net/community-topic-icons/sports_cricket-ff5454.png?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"For cricket lovers around the world","topicFollowers":8632,"playersPerMatch":3,"topicCategory":"Sports","__v":0},{"_id":"Cricket","topicName":"Cricket World Cup ","topicIcon":"https://quizup-questions.imgix.net/topic-icons/cricket--world-cup-2015-04-27T22:45:51.302Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"Who won when? Who scored what?","topicFollowers":10001,"playersPerMatch":3,"topicCategory":"Sports","__v":0},{"_id":"Disney-Movies","topicName":"Disney Movies","topicIcon":"https://quizup-questions.imgix.net/community-topic-icons/movies_mouse-ff5454.png?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"Never too old for Disney","topicFollowers":3228,"playersPerMatch":3,"topicCategory":"Movies","__v":0},{"_id":"Football-Players","topicName":"Football Players","topicIcon":"https://quizup-questions.imgix.net/community-topic-icons/sports_soccer-006d82.png?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"Name the Football Player","topicFollowers":6312,"playersPerMatch":3,"topicCategory":"Sports","__v":0},{"_id":"Game-of-Thrones","topicName":"Game of Thrones","topicIcon":"https://quizup-questions.imgix.net/topic-icons/game-of-thrones-2014-10-30T15:00:25.551Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"You Win or You Die","topicFollowers":11237,"playersPerMatch":3,"topicCategory":"TV","__v":0},{"_id":"Harry-Potter-Movies","topicName":"Harry Potter Movies","topicIcon":"https://quizup-questions.imgix.net/topic-icons/harry-potter-mov-2014-10-29T13:14:09.275Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"You really need to know about potter","topicFollowers":10255,"playersPerMatch":3,"topicCategory":"Movies","__v":0},{"_id":"Hockey","topicName":"Hockey","topicIcon":"https://quizup-questions.imgix.net/topic-icons/hockey-2015-04-24T15:15:25.167Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"Take out your sticks","topicFollowers":6611,"playersPerMatch":3,"topicCategory":"Sports","__v":0},{"_id":"Indian-Celebrities","topicName":"Indian Celebrities","topicIcon":"https://quizup-questions.imgix.net/topic-icons/name-the-indian-celebrity-2015-05-21T11:20:43.473Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"Gandhis,Kapoors and Khans","topicFollowers":7413,"playersPerMatch":3,"topicCategory":"India","__v":0},{"_id":"Indian-Constitution","topicName":"Indian Constitution","topicIcon":"https://quizup-questions.imgix.net/community-topic-icons/educational_bookopen-ff8133.png?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"Are you right about your Rights!","topicFollowers":4176,"playersPerMatch":3,"topicCategory":"India","__v":0},{"_id":"Indian-Festivals","topicName":"Indian Festivals","topicIcon":"https://quizup-questions.imgix.net/community-topic-icons/general_jew-ff8133.png?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"The joy of living","topicFollowers":3228,"playersPerMatch":3,"topicCategory":"India","__v":0},{"_id":"Indian-History","topicName":"Indian History","topicIcon":"https://quizup-questions.imgix.net/topic-icons/indian-history-2015-10-01T02:40:30.639Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"The Golden Sparrow","topicFollowers":8376,"playersPerMatch":3,"topicCategory":"India","__v":0},{"_id":"Indian-Literature","topicName":"Indian Literature","topicIcon":"https://quizup-questions.imgix.net/topic-icons/en-indian-literature-2015-05-04T21:46:51.442Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"Vedas, Epics and Dramedies","topicFollowers":4275,"playersPerMatch":3,"topicCategory":"Literature","__v":0},{"_id":"Indian-Mythology","topicName":"Indian Mythology","topicIcon":"https://quizup-questions.imgix.net/topic-icons/indian-mythology-2015-03-10T13:03:22.056Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"From Satya Yuga to the Kali Yuga","topicFollowers":3276,"playersPerMatch":3,"topicCategory":"India","__v":0},{"_id":"Indian-Politics","topicName":"Indian Politics","topicIcon":"https://quizup-questions.imgix.net/community-topic-icons/general_glasses-66d3e8.png?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"The Hubs and Spokes of Indian Democracy","topicFollowers":4982,"playersPerMatch":3,"topicCategory":"India","__v":0},{"_id":"Java","topicName":"Java","topicIcon":"https://quizup-questions.imgix.net/community-topic-icons/foodanddrink_coffee-994d1f.png?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"do{ javaOnQuizRT(); } while(free)","topicFollowers":3230,"playersPerMatch":3,"topicCategory":"Computer Science","__v":0},{"_id":"Lord-of-the-Rings","topicName":"Lord of the Rings","topicIcon":"https://quizup-questions.imgix.net/topic-icons/lotr-novels-2014-11-03T14:24:40.672Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"One does not simply...walk into Mordor","topicFollowers":7234,"playersPerMatch":3,"topicCategory":"Movies","__v":0},{"_id":"Sherlock","topicName":"Sherlock","topicIcon":"https://quizup-questions.imgix.net/topic-icons/bbc-sherlock-2014-10-31T11:34:21.878Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"Brainy is the new sexy","topicFollowers":9583,"playersPerMatch":3,"topicCategory":"Literature","__v":0},{"_id":"States-of-India","topicName":"States of India","topicIcon":"https://quizup-questions.imgix.net/topic-icons/en-states-of-india-2015-07-23T04:46:13.821Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"The Fine Twenty Nine","topicFollowers":5342,"playersPerMatch":3,"topicCategory":"The World","__v":0},{"_id":"Sports","topicName":"Sports","topicIcon":"https://quizup-questions.imgix.net/topic-icons/sports-general-2015-04-24T15:26:30.016Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"Lets see how well you know sports world","topicFollowers":2452,"playersPerMatch":2,"topicCategory":"C1","__v":0},{"_id":"T2","topicName":"Current Affairs","topicIcon":"https://quizup-questions.imgix.net/community-topic-icons/educational_readingkid-02d174.png?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"An early morning bird who knows the world","topicFollowers":2251,"playersPerMatch":2,"topicCategory":"C1","__v":0},{"_id":"T3","topicName":"Business","topicIcon":"https://quizup-questions.imgix.net/topic-icons/business-2015-04-24T14:05:13.509Z?fm=png\u0026q=50\u0026h=128\u0026w=128","topicDescription":"Here is the chance to show your corporate knoweldge","topicFollowers":2051,"playersPerMatch":2,"topicCategory":"C1","__v":0}]
    }
  }

  click(){
    // var App=express();

    // App.use('/a',jsonServer.router('myDB.json'));

    // App.listen(5555);

    //   $.ajax({
    //     url: 'localhost:5555/a/topics',
    //     dataType:'json',
    //     success: function(data){
    //       console.log('got success---------------------');
    //       console.log(JSON.stringify(data));
    //       //this.setState({topics:data})
    //       console.log('------------------------'+data+'----------------------');
    //     }.bind(this),
    //     error:function(err){
    //       console.log(err);
    //       console.log('error');
    //     }
    //   })
    }

  handleCheck(_id,topic){
    var username = Cookie.load("username");
    var newtopics;
    console.log('handle check functi =----------------');
    var likedTopic = this.state.topics;
    var result = $.grep(likedTopic, function(e){ return e._id == topic._id; });
    if (result.length == 0) {
  // not found
    topic.topicFollowers = topic.topicFollowers+1;
    newtopics = likedTopic.concat([topic]);
    } else if (result.length == 1) {
  // access the foo property using result[0].foo
  var result = $.grep(likedTopic, function(e){ return e._id != topic._id; });
  newtopics = result;
  console.log('this topic u already liked');
    }
    this.state.incre=!this.state.incre;
    this.setState({topics:newtopics});
      var data1 = {
        incre: this.state.incre,
        id:_id,
        uName:username,
        t:topic
      }
      console.log('before ajax');
      $.ajax({
        type:'POST',
        data :JSON.stringify(data1),
        contentType : 'application/json',
        url:restUrl+'/api/check',
        success:(function(data){
          console.log('folowers increamented--------------now -----------'+data);
        }).bind(this),
        error:function(err){
          console.log(err);
          console.log('error ');
        }
      })
 }

    componentDidMount(){
      $.ajax({
        url: restUrl+'/topics',
        dataType:'json',
        success: function(data){
          console.log('got success---------------------');
          console.log(JSON.stringify(data));
          //this.setState({topics:data})
          console.log('------------------------'+data+'----------------------');
        }.bind(this),
        error:function(err){
          console.log(err);
          console.log('error');
        }
      })
    }

  render() {

    var style = {
      paddingRight:0,
    };

    var bodyContainer = {
      padding: "16px",
      paddingTop: "80px",

    }

  return (
              <div>
                <MainAppBar/>
                <MediaQuery query='(max-device-width: 800px)'>
                  <MediaQuery query='(max-width: 800px)'>
                    <TabsMobile page="Topics"/>
                  </MediaQuery>
                </MediaQuery>

                <MediaQuery query='(min-device-width: 800px)'>
                  <MediaQuery query='(min-width: 800px)'>
                    <div className="container-fluid" >
                      <div className="row" >
                        <div style={{width: "100%"}} >
                          <div className="row" >
                            <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12" style={bodyContainer}>
                              <div className="row">
                                  <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-lg-offset-1" >
                                    <SubTopicContainer topics ={this.state.topics} fun={this.handleCheck} />
                                  </div>
                                  <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"  style={{paddingTop:20}}>
                                    <ChatDrawer/>
                                  </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </MediaQuery>
                </MediaQuery>
                <button onClick={this.click}>hello</button>
                </div>
            );
  }
};