// pages/_app.js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Script from 'next/script';
import BootstrapClient from '../components/bootstrapClient';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/home/footer';
import './../styles/globals.css';
import { WizardProvider } from '../context/WizardContext';
import { Provider } from 'react-redux';
import store from '../redux/store';

function MyApp({ Component, pageProps }) {
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
          </BootstrapClient>
        </WizardProvider>
      </Provider>
    </>
  );
}

export default MyApp;
