// pages/_app.js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Script from 'next/script';
import BootstrapClient from '../components/bootstrapClient';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/home/footer';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import './../styles/globals.css';
import { WizardProvider } from '../context/WizardContext';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove Next.js badge
    const badge = document.querySelector('[data-nextjs-toast]');
    if (badge) {
      badge.remove();
    }
  }, []);

  return (
    <>
      <Script src="/js/main.js" strategy="afterInteractive" />
      
      <Provider store={store}>
        <WizardProvider>
          <Navbar />

          <main style={{ paddingTop: '80px' }}>
            <Component {...pageProps} />
          </main>

          <BootstrapClient>
            <Footer />
            <WhatsAppIcon />
          </BootstrapClient>
        </WizardProvider>
      </Provider>
    </>
  );
}

export default MyApp;
