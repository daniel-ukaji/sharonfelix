// _app.js

import '@/styles/globals.css'
import { AuthProvider } from '@/services/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

