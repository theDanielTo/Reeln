export default function storeToken(token) {
  const previousTokenJSON = window.localStorage.getItem('token-local-storage');
  if (previousTokenJSON !== null) token = JSON.parse(previousTokenJSON);

  window.addEventListener('beforeunload', function () {
    const tokenJSON = JSON.stringify(token);
    window.localStorage.setItem('X-Access-Token', tokenJSON);
  });
}
