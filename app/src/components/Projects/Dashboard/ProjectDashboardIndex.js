import React from 'react';

import ProjectDashboard from './ProjectDashboard';
import { ProjectProvider } from './ProjectProvider';

export default function ProjectDashboardIndex(props) {

  const id = props.match.params.id;

  const initialState = {
    id: id,
    counters: {
      people: 0,
      total: 0,
      done: 0,
      late: 0,
    },
    project: null,
    tasks: [],
    users: []
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_COUNTERS':
        return {
          ...state,
          counters: action.payload
        };
      case 'UPDATE_PROJECT':
        return {
          ...state,
          project: action.payload
        };
      default:
        return state;
    }
  };


  return (
    <ProjectProvider initialState={initialState} reducer={reducer}>
      <ProjectDashboard />
    </ProjectProvider>
  );
}