export default function storeToken(token) {
  window.addEventListener('beforeunload', function () {
    const tokenJSON = JSON.stringify(token);
    window.localStorage.setItem('X-Access-Token', tokenJSON);
  });
}
