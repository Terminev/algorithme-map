export function isLoggedIn() {
  let pseudonyme = localStorage.getItem("pseudo");
  return !!pseudonyme;
}