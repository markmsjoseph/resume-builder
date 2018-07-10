import React from 'react';


//NOTE DISPLAYS ONLY IF THERE ARE NO NOTES
const NoteListEmptyItem = () => {
  return (
   <div className = " ">

      <p className = "empty-item">Create a poem to get started!</p>
    </div>
  );
};

export default NoteListEmptyItem;



// import React from 'react';
// import { Meteor } from 'meteor/meteor';
//
//
// export default class NoteListEmptyItem extends React.Component {
//
//     constructor(props) {
//       super(props);
//     }
//
//     //render the note name otherwies if no name render untitled note
//     render() {
//       return (
//           <div className = "wrapper wrapper__post">
//             <h5>No Notes </h5>
//
//           </div>
//       );
//     }
//
//   }
