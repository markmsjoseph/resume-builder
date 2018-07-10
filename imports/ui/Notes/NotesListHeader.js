import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import { Link } from 'react-router-dom';
//NOTE: DISPLAYS THE HEADER FOR ALL NOTES LIST AND A CRATE NOTES BUTTON

//stateless functional components dont have a render method, just return
export const NoteListHeader = (props) => {

  const createNoteClicked =()=>{
      console.log("Create Note Clicked from noteListHeader");
      props.meteorCall('notes.insert',[props.username], (err, res) => {

        //new note id will be available in res object
        if(res){
            console.log("res", res);
          props.Session.set('selectedNoteId',res)
        }
        else {
          console.log("ERROR",err);
        }
      });
  }

  return (
          <div className="item-list__header">
            <h3 className = "header__linksAllPoems"> <Link to ="/allnotes">View Public Poems</Link> </h3>
              <button className="button" onClick={createNoteClicked}>Create Poem</button>
          </div>
  );

};//end component


export default createContainer(() => {
  return {
      username:Meteor.user() != undefined ? Meteor.user().username : 'undefined',
    meteorCall: Meteor.call,
    Session
  };
}, NoteListHeader);






// import React from 'react';
// import { Meteor } from 'meteor/meteor';
//
//
// export default class NoteListHeader extends React.Component {
//
//   constructor(props){
//     super(props);
//     this.state = {
//       error:'',
//         };
//   }
//
//   createNote(){
//     console.log("Note being created");
//     Meteor.call('notes.insert');
//   }
//
//
//
//     render() {
//       return (
//         <div className="addpost__WrapperForm">
//             <h4>Total Notes:{this.props.length}</h4>
//             <button onClick={this.createNote.bind(this)}>Create Note</button>
//         </div>
//       );
//     }
//
//
//   }
