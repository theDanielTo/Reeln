import { getToken } from '.';

export default function calcScore(tId, weight) {
  fetch(`/api/tourneys/${tId}`, {
    headers: {
      'x-access-token': getToken()
    }
  })
    .then(res => res.json())
    .then(results => {
      return weight * results.pointsPerPound;
    });
}
