
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import ContentEditable from 'react-contenteditable';
import ResumeSection from './ResumeSection'

export  class Resume extends React.Component {


    constructor(props) {
           super(props);
            this.state={
             title:'',
             body:'',
             isOpen:false,
             sections:0,
             html: "<b>Hello <i>World</i></b>"
            }
    }

    //update the sections counter which will display the amount of divs to show
    createSection = ()=>{
            this.setState( (prevState)=>{
              return{
                sections:prevState.sections + 1
              }
            });
    }


    handleChange = evt => {
         this.setState({html: evt.target.value});
    };


    returnSections(){
          //number of sections to display
            const iterations = this.state.sections;
            let sectionsToDisplay =[];
            const styles={    border: 'solid 2px #6200ee',
                              margin: '10px',
                              padding: '10px',

                            }
            var i;

            for( i = 0; i < iterations; i++){
                sectionsToDisplay.push(<div style={styles}><ResumeSection/></div>);
            }
            return sectionsToDisplay;
    }


    render(){
                      console.log("Sections", this.state.sections);
                      return (
                          <div className="editor">
                                    <p className = "empty-item">
                                      { this.props.selectedNoteId ? 'Poem not found.' : 'Pick or create a poem to get started.'}
                                    </p>
                                     <button className = "" onClick={this.createSection}>Create Section </button>
                                     {this.returnSections()}
                          </div>
                      );
    }

};//endclass







export default createContainer(() => {

  return {
  };
}, Resume);
