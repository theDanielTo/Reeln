export default function storeToken(token) {
  window.localStorage.setItem('X-Access-Token', token);
}
