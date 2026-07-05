import { useEffect } from 'react';

export const OAuthRedirect = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (code && window.opener) {
      window.opener.postMessage({ code }, window.opener?.origin);
      window.close();
    }
  }, []);

  return <h1>OAuthPage</h1>;
};
