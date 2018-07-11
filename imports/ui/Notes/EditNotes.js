
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../../api/notes';
import { history } from '../../../client/main.js';
import Modal from 'react-modal';

export  class Editor extends React.Component {

    constructor(props) {
       super(props);
        this.state={
         title:'',
         body:'',
         isOpen:false,
         sections:0
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



    returnSections(){
      //number of sections to display
        const iterations = this.state.sections;
        let sectionsToDisplay =[];
        const styles={    border: 'solid 2px #6200ee',
                          margin: '10px',
                          padding: '10px',
                          textAlign: 'center'
                        }
        var i;

        for( i = 0; i < iterations; i++){
            sectionsToDisplay.push(<div key = {i} style={styles}><p>New Section</p></div>);
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
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId:selectedNoteId,
    note:Notes.findOne(selectedNoteId),
    call: Meteor.call,
    history:history
  };
}, Editor);

// import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import moment from 'moment';
// import {Session} from 'meteor/session';
// import {Notes} from '../../api/notes';
//
// export default class EditNotes extends React.Component {
//
//     constructor(props) {
//       super(props);
//       this.state={
//         noteStatus:'',
//         foundNote:undefined
//       }
//     }
//
//     componentDidMount() {
//         Tracker.autorun(() => {
//             const selectedNoteId = Session.get('selectedNoteId');
//             const allYourNotes = Notes.findOne(Session.get('selectedNoteId'));
//             console.log("ALL NOTES", allYourNotes);
//
//             this.setState({ foundNote: allYourNotes },() =>
//             console.log("STATE IS ",this.state.foundNote)
//             );
//             // this.setState({foundNote:allYourNotes});
//             console.log("In Edit Note Component, session value is : ",Session.get('selectedNoteId'));
//
//           });
//     }
//
//     //whenever we change the input of the selected note, we update it in the database
//     onTextAreaChange(e){
//         const selectedNoteId = Session.get('selectedNoteId');
//       const text = e.target.value;
//       Meteor.call('notes.update',[selectedNoteId, text])
//     }
//     onTitleChanged(e){
//       const selectedNoteId = Session.get('selectedNoteId');
//       const text = e.target.value;
//       Meteor.call('notes.updateTitle',[selectedNoteId, text])
//     }
//
//     render() {
//       //if we have a note that is selected we display the editing boxes otherwise we have not selected a note
//             if(this.state.foundNote){
//                   return (
//                       <div className = "wrapper wrapper__post" >
//                         <h5>Edit Note</h5>
//                         <input value = {this.state.foundNote.title} onChange={this.onTitleChanged.bind(this)}/>
//                         <textarea value = {this.state.foundNote.body} onChange={this.onTextAreaChange.bind(this)}></textarea>
//                         <button/>
//                       </div>
//                   );
//             }
//             else{
//                     return (
//                         <div className = "wrapper wrapper__post" >
//                           <h5>No Note Found</h5>
//                           {this.state.noteStatus}
//                         </div>
//                     );
//             }
//
//
//     }
//
//   }
