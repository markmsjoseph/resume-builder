import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Resume from './Resume';
import SidebarEditor from './SidebarEditor';


export const Container = (props) => {
  return (
            <div className="page-content">
                    <div className="page-content__sidebar">
                          <SidebarEditor />
                    </div>

                    <div className="page-content__main">
                          <Resume/>
                    </div>
          </div>
  );
};



export default createContainer(() => {

  // Take notes add selected property to object
  // Set to true if match, false if not
  return {
  };
}, Container);
