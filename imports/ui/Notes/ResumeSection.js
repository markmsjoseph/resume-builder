
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import ContentEditable from 'react-contenteditable';

export  class ResumeSection extends React.Component {

    constructor(props) {
       super(props);
        this.state={
            html: "<b>Hello <i>World</i></b>"
        }
  }

   handleChange = evt => {
     this.setState({html: evt.target.value});
   };



    render(){
                  return (
                        <ContentEditable
                             html={this.state.html} // innerHTML of the editable div
                             disabled={false}       // use true to disable edition
                             onChange={this.handleChange} // handle innerHTML change

                       />
                  );

    }

};//endclass

export default createContainer(() => {
  return {

  };
}, ResumeSection);
