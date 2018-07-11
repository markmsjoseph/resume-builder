import React from 'react';
import { Link } from 'react-router-dom';
import PrivateHeader from './PrivateHeader';
import {Session} from 'meteor/session';
import { history } from '../../client/main.js';
import Container from './Notes/Container';



export default class Dashboard extends React.Component {

    constructor(props) {
    super(props);
        this.state = {
        username:""
        };
  }

    componentWillMount() {
        //set the global session variable currentPagePrivacy to the value that was passed in as props from the route component in main.js
        Session.set('currentPagePrivacy', this.props.priavteOrPublic);//set session id
        Session.set('selectedNoteId', undefined);//set session id
          Session.set('isNavOpen', false);
      history.replace("/dashboard");

    }

    componentDidMount() {
      this.postTracker =  Tracker.autorun(() => {
          if(Meteor.user()){
              this.setState(()=>{
                return{
                  username:Meteor.user().username
                }
              });
          }
      });
    }


    render() {
              console.log("Render called");
              return (
                  <div>
                        <div className="header">
                                  <div className="header__content">
                                        <PrivateHeader  title="Resume Builder"  />
                                        <p className = "header__logged-in-as">Logged in as:{this.state.username} </p>
                                  </div>
                        </div>

                        <div className="allContainer">
                                  <Container />
                        </div>
                  </div>
              );
    }

  }
