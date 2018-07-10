import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';

export const Notes = new Mongo.Collection('notes');

if(Meteor.isServer){
  //meteor publish only runs on server not both client and server
  //publish takes a string and a function determining what data each client should have access too
  //must use es5 function because we need this binding
  Meteor.publish('notes', function(){
    //we get the user id because of the this binding from es5 functions, the user calling this publication will have that id
    return Notes.find({userId:this.userId});
  });
  Meteor.publish('publicNotes', function(){
    //we get the user id because of the this binding from es5 functions, the user calling this publication will have that id
    return Notes.find({isPublic:true});
  });

}

Meteor.methods({
      'notes.insert'(array){
        //if there is no user, you cannot insert a note
        if(!this.userId){
          throw new Meteor.Error('not authorized');
        }
        console.log("CREATING A NEW NOTE");
        //notes.insert gives the  reutn value of id.
        return Notes.insert({
            title:'',
            body:'',
            userId:this.userId,
            dateAdded:moment().valueOf(),
            isPublic:false,
            comments:[],
            postedBy:array[0]
        })
      },


      'notes.update'(_id, updates) {
        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }
          Notes.update({
          _id,
          userId: this.userId
        }, {
          $set: {
            updatedAt: moment().valueOf(),
            ...updates
          }

        });
      },


      'notes.delete'(id){
        //if there is no user, you cannot insert a note
        if(!this.userId){
          throw new Meteor.Error('not authorized');
        }
        console.log("Deleting A NOTE");
        Notes.remove({
          _id:id
        })
      },

      //takes in the id of the note we are editing, and from that we push comments to the comments array 
      'notes.updateComments'(_id, data){
        if(!this.userId){
          throw new Meteor.Error('not authorized');
        }
        console.log("ADDING:", _id, " AND ", data);
        Notes.update({_id},
        {$push:{comments :data}}
        )
      },

    });
