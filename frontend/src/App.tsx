import React, { Suspense ,ReactNode} from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {NextUIProvider} from "@nextui-org/react";
import Navbar from './component/Naviagtion/navbar';


// Lazy loading the components
const Defaultpage = React.lazy(() => import('./component/defaultpage'));
const Register = React.lazy(() => import('./component/Registration/register'));
const Home = React.lazy(() => import('./component/home/home'));
const Wallet = React.lazy(() => import('./component/wallet/wallet'));
const Transaction = React.lazy(() => import('./component/transaction/transaction'));
const Transfer = React.lazy(() => import('./component/transfer/transfer'));
const SearchPeople = React.lazy(() => import('./component/searchPeople/search'));
const Auth = React.lazy(() => import('./component/authentication/auth'));
const Payment = React.lazy(() => import('./component/payment/payment'));
const Notfound = React.lazy(() => import('./component/notfound/notfound'));
const Loan = React.lazy(() => import('./component/loan/loan'));
const Bills = React.lazy(() => import('./component/Bills/Bills'));

function App() {
  return (
    <div className="h-screen w-screen">
      <RecoilRoot>
        <NextUIProvider>
        <BrowserRouter>
            <AnimatedRoutes />
        </BrowserRouter>
        </NextUIProvider>
      </RecoilRoot>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence>
        <Suspense fallback={<div className='h-screen flex justify-center items-center'>Loading...</div>}>
          <Routes location={location} key={location.pathname}>
            <Route element={<Auth />}>
              <Route path="/home" element={<Animate><Home /></Animate>} />
              <Route path="/Wallet" element={<Animate><Wallet /></Animate>} />
              <Route path="/transaction" element={<Animate><Transaction /></Animate>} />
              <Route path="/transfer" element={<Animate><Transfer /></Animate>} />
              <Route path="/search" element={<Animate><SearchPeople /></Animate>} />
              <Route path="/loan/*" element={<Animate><Loan /></Animate>} />
              <Route path="/bills" element={<Animate><Bills /></Animate>} />
              <Route path="/payment" element={<Payment />} />
            </Route>
            <Route>
              <Route path="/" element={<Defaultpage />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Notfound />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

function Animate({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col-reverse sm:flex-row w-screen'>
      <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='w-full h-full'
        >
          {children}
        </motion.div>
    </div>
  );
}

export default App;
