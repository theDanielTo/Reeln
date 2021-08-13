import React from 'react';
import Card from './card';

export default function RecentCatches(props) {
  const { recentCatches, onCardClick } = props;
  return (
    <div className="cards-container">
      {
        recentCatches.map(c => {
          return (
            <Card key={c.catchId}
              id={c.catchId}
              onCardClick={onCardClick}
              line1={c.firstName + ' ' + c.lastName}
              line2={'Weight: ' + c.weight + ' pounds'}
              line3={'Points: 10'}
              src={'./images/' + c.photo} />
          );
        })
      }
    </div>
  );
}
