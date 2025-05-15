let isRedirecting = false;

export const safeRedirectToLogin = () => {
  if (typeof window !== 'undefined' && !isRedirecting) {
    isRedirecting = true;
    if (window.location.pathname !== '/login') {
      window.location.assign('/login');
    }
  }
};