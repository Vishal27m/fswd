import React from 'react';
import './EventBlog.css';

const EventBlog = () => {
  return (
    <div className="event-blog-container">
      <h1>Community Events</h1>
      <p>Welcome to the Community Hub! Here are the latest events happening in our town:</p>
      <div className="event-post">
        <h2>Town Fair</h2>
        <p>Date: August 30, 2024</p>
        <p>Description: Join us for a day of fun, food, and entertainment at the annual Town Fair. There will be games, live music, and a variety of food stalls.</p>
      </div>
      <div className="event-post">
        <h2>Neighborhood Cleanup</h2>
        <p>Date: September 5, 2024</p>
        <p>Description: Help us keep our neighborhood clean and beautiful. Meet at the community center at 9 AM. Trash bags and gloves will be provided.</p>
      </div>
      {/* Add more event posts as needed */}
    </div>
  );
};

export default EventBlog;
