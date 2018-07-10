import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
//NOTE: DISPLAYS THE HEADER FOR ALL NOTES LIST AND A CRATE NOTES BUTTON

//stateless functional components dont have a render method, just return
export class CommentComponent extends React.Component {

  constructor(props) {
       super(props);
        this.state={
         body:''
        }
     }

  addComment =(e)=>{
      e.preventDefault();
      // console.log("ID", this.props.id);

      //get the comment and trim of all unnecessary spaces
      let newComment = this.state.body;
      // console.log("COMMENT" , newComment);
      //combine comment and the username of the poster into 1
      if(newComment!=''){
        let userAndMessage = {message:newComment, yourId:this.props.username};
        console.log(userAndMessage);
        this.props.meteorCall('notes.updateComments', this.props.id, {userAndMessage});
      }
        this.setState({body:''});
        e.target.reset();
  }

  //everytime the input changes, set the changes to the state
  handleChange = (e)=> {
          const body = e.target.value;
          this.setState({body});
  }



  render(){
          return (
            <div className="comment-form">
                      <form onSubmit={this.addComment}>
                            <textarea className = "comment-textbox" placeholder="Add a comment" onChange={this.handleChange}></textarea>
                            <button className='button-comment'  >Add Comment </button>

                      </form>
                </div>
        );
  };

};//end component


export default createContainer(() => {
  return {
    username:Meteor.user() != undefined ? Meteor.user().username : 'undefined',
    meteorCall: Meteor.call

  };
}, CommentComponent);
