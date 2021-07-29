import { getToken } from '.';

export default function calcScore(tId, weight) {
  fetch(`/api/tourneys/${tId}`, {
    headers: {
      'x-access-token': getToken()
    }
  })
    .then(res => res.json())
    .then(results => {
      console.log('fn score:', weight * results.pointsPerPound);
      return weight * results.pointsPerPound;
    });
}
