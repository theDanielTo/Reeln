import React from 'react';
import Card from './card';

export default function RecentCatches(props) {
  const { recentCatches } = props;
  return (
    <div className="cards-container">
      {
        recentCatches.map(c => {
          return (
            <Card key={c.catchId}
              id={c.catchId}
              line1={c.firstName + ' ' + c.lastName}
              line2={'Caught on: ' + c.dateCaught }
              line3={'Weight: ' + c.weight}
              src={'./images/' + c.photo} />
          );
        })
      }
    </div>
  );
}
