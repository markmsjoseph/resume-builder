import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route, withRouter } from 'react-router-dom';
import {Tracker} from 'meteor/tracker';
import createHistory from 'history/createBrowserHistory'
import {Session} from 'meteor/session';
import Dashboard from '../imports/ui/Dashboard';
import NotFound from '../imports/ui/NotFound';
import Login from '../imports/ui/Login';
import PublicNotes from '../imports/ui/PublicNotes';

export const history = createHistory();


//switch moves through route definitions in order till it finds a match so anything that
//doesnt match it defaults to the bottom router
//browserrouter requires 1 child element

//the inline rendering for route can be found at the bottom url
//https://www.sitepoint.com/react-router-v4-complete-guide/
const routes = (
  <Router history={history}>
            <Switch>

                <Route path="/"  exact={true} render={ (props) => <Login priavteOrPublic= {"publicRoute"} {...props} />} />
                <Route path="/dashboard" exact={true} render={ (props) => <Dashboard priavteOrPublic= {"privateRoute"} {...props} />} />
                <Route path="/dashboard/:id" exact={true} render={ (props) => <Dashboard priavteOrPublic= {"privateRoute"} {...props} />} />
                <Route path="/allnotes"  exact={true} render={ (props) => <PublicNotes priavteOrPublic= {"privateRoute"} {...props} />} />
                <Route path="*" component={NotFound} />
            </Switch>
  </Router>
);

Tracker.autorun(() => {
      //set is authenticated to a boolean value,
      const isAuthenticated = !!Meteor.userId();

      //get the authentication status of the current page
      const currentPagePrivacy = Session.get('currentPagePrivacy');

      //if you are authenticated but are trying to go to a public page like the login page, redirect them to dashboard page
      if (isAuthenticated && currentPagePrivacy==="publicRoute") {
        history.push('/dashboard');
      }
        //if not logged in but try to go to a page that needs authentication, send them to login page
      else if (!isAuthenticated &&  currentPagePrivacy==="privateRoute") {
        history.push('/');
      }

});

//this tracker autorun will watch for chages with the session variable selectedNoteId, so when it changes update the url
Tracker.autorun(() => {
      //we use the get value to retrieve any value that was set, in this case, in notelistitem.js we set the session variable to an id
      const selectedNoteId = Session.get('selectedNoteId');
      //this will return undefied or a string
      //if we have a string we want to change the url
      if(selectedNoteId){
            Session.set('isNavOpen', false);//set the navigation to be closed if you select a note
            history.replace(`/dashboard/${selectedNoteId}`);
      }

});

Tracker.autorun(() => {
      const isNavOpen = Session.get('isNavOpen');
      //switch between true and false based on the isNavOpen value
      document.body.classList.toggle('is-nav-open', isNavOpen);
});




//on startup set the selected note to be undefined
Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);//set session id
  Session.set('isNavOpen', false);//set the navigation to be closed by default
  ReactDOM.render(routes, document.getElementById('app'));
});
