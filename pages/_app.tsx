import { AppProps } from 'next/dist/next-server/lib/router/router';
import '../styles/globals.css';
import '../styles/tailwind.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
