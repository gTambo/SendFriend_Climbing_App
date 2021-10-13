import React from 'react';
import GymForm from '../GymForm/GymForm';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function GymSelect() {
  return (
    <div className="container">
      <p>Select a Gym</p>
      <GymForm />
    </div>
  );
}

export default GymSelect;
