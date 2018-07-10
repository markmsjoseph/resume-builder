import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';


//NOTE: DISPLAYS INDIVIDUAL note, IE THEIR TITLE, DATE AND WHETEER OR NOT THEY ARE SELECTED
export const NoteListItem = (props) => {

      const className = props.note.selected ? 'item item--selected': 'item';
      //when we click a note, we want to set it as the selected note for the url and css styling purposes
      const setNoteId = ()=>{
          props.Session.set('selectedNoteId', props.note._id);
      }

      return (
          <div className={className} onClick={setNoteId}>
                  <h5 className = "item__title">{ props.note.title || 'Untitled note' }</h5>
                  <p className = "item__date">{ moment(props.note.updatedAt).format('M/DD/YY') }</p>
          </div>
      );

};





//create container takes 2 arguments, a function and the component to render stuff to
export default createContainer(() => {
  //returns an object with all the stuff that we want to pass down as props to the component
  return {
    Session:Session
   };
}, NoteListItem);
