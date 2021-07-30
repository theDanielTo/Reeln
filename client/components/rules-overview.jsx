import React from 'react';

export default function RulesOverview(props) {
  const {
    startDate, endDate,
    minWeight, maxWeight,
    heaviestFive,
    perPound, pointsPerPound,
    heaviest, pointsHeaviest,
    longest, pointsLongest,
    mostCaught, pointsMostCaught,
    additionalRules
  } = props.tourney;
  const {
    firstName, lastName, username
  } = props.host;
  return (
    <div className="rules-overview-container">
      <h2 className="text-center">Rules Overview</h2>
      <p className="text-center">{startDate} - {endDate}</p>
      <p className="text-center">Hosted by: {username} ({firstName} {lastName})</p>

      <div className="rules-overview-section">
        <h2>Point System</h2>
        <p>Minimum weight: {minWeight}</p>
        <p>Maximum weight: {maxWeight}</p>
        <p className={(heaviestFive) ? '' : 'line-through'}>
          Heaviest Five</p>
        <p className={(perPound) ? '' : 'line-through'}>
          Per Pound</p>
        {pointsPerPound} points per pound
      </div>

      <div className="rules-overview-section">
        <h2>Bonus</h2>
        <p>
          <span className={(heaviest) ? '' : 'line-through'}>Heaviest</span>
          : {pointsHeaviest} points
        </p>
        <p>
          <span className={(longest) ? '' : 'line-through'}>Longest</span>
          : {pointsLongest} points
        </p>
        <p>
          <span className={(mostCaught) ? '' : 'line-through'}>Most Caught</span>
          : {pointsMostCaught} points
        </p>
      </div>

      <div className="rules-overview-section">
        <h2>Additional Rules / Notes</h2>
        {additionalRules}
      </div>

    </div>
  );
}
