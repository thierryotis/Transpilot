import { BrowserRouter, HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// component
import { StyledChart } from './component/chart';
import ScrollToTop from './component/scroll-to-top';
import { RoleContextProvider } from './RoleContext'; 

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <RoleContextProvider>
            <Router />
          </RoleContextProvider>
        </ThemeProvider>
        <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </HashRouter>
    </HelmetProvider>
  );
}