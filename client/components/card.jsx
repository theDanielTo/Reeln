import React from 'react';

export default function Card(props) {
  // let i = 0;
  // function cardDetails() {
  //   return props.cardDetails.map(detail => {
  //     i += 1;
  //     return (
  //       <p className="card-text" key={i}>
  //         {detail}
  //       </p>
  //     );
  //   });
  // }

  return (
    <div className="card">
      <img className="card-img" src={props.src} alt="Photo of fish" />
      <div className="card-details">
        { /* {cardDetails()} */}
        <p className="card-text">Kicking Bass</p>
        <p className="card-text">Jul 16 - Aug 16</p>
        <p className="card-text">10 participants</p>
      </div>
    </div>
  );
}
