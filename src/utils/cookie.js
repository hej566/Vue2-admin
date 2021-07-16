import Cookies from 'js-cookie';

const in30Minutes = new Date(new Date().getTime() + 30 * 60 * 1000);
const Key = 'user';

export function getUser() {
  return Cookies.get(Key);
}

export function setCookies(user) {
  Cookies.set(Key, user, { expires: in30Minutes });
}

export function removeCookies() {
  Cookies.remove(Key);
}

export function removeAllCookies() {
  Object.keys(Cookies.get()).forEach(cookieName => {
    Cookies.remove(cookieName);
  });
}
