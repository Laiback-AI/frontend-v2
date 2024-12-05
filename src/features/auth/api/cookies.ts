import { parse, serialize } from 'cookie';

// Set a cookie
export function setCookie(name: string, value: string, options = {}) {
  const defaultOptions = {
    path: '/',
    secure: true,
    httpOnly: false,
    sameSite: 'strict' as const,
    ...options,
  };
  document.cookie = serialize(name, value, defaultOptions);
}

// Get a specific cookie
export function getCookie(name: string): string | undefined {
  const cookies = parse(document.cookie || '');
  return cookies[name];
}

// Delete a cookie
export function deleteCookie(name: string) {
  setCookie(name, '', { maxAge: -1 });
}
