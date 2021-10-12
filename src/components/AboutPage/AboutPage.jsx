import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>This about page is for anyone to read!</p>
      <p>Tag-Tender is a Climbing app for logging specific routes in climbing gyms and viewing that information as provided by other users - like you!</p>
      </div>
    </div>
  );
}

export default AboutPage;
