// pages/_app.js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Script from 'next/script';
import BootstrapClient from '../components/bootstrapClient';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/home/footer';
import "./../styles/globals.css";
import { WizardProvider } from '../context/WizardContext';

function MyApp({ Component, pageProps }) {
  return (
    <WizardProvider>
      <Script src="/js/main.js" strategy="afterInteractive" />

      {/* Navbar */}
      <Navbar />

      {/* Main content with padding */}
      <main style={{ paddingTop: '80px' }}>
        <Component {...pageProps} />
      </main>

      {/* Footer */}
      <BootstrapClient>
        <Footer />
      </BootstrapClient>
    </WizardProvider>
  );
}

export default MyApp;
