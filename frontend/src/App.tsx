import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './component/Naviagtion/navbar'
import Navtop from './component/Naviagtion/navtop';
import Defaultpage from './component/defaultpage';
import Register from './component/Registration/register';
import Home from './component/home/home';
import Wallet from './component/wallet/wallet';
import Transaction from './component/transaction/transaction';
import Transfer from './component/transfer/transfer';
import SearchPeople from './component/searchPeople/search';
import Auth from './component/authentication/auth';
import Payment from './component/payment/payment';
import Notfound from './component/notfound/notfound'

function App() {
  return (
    <div className='h-screen bg-gradient-to-l from-cyan-500 to-blue-500'><RecoilRoot>
      <BrowserRouter>
      <Navtop/>
      <Routes>
        <Route path = '/' element={<Defaultpage/>}/>
        <Route path = '/register' element = {<Register/>}/>
        <Route path = '/home' element={<Auth><Navbar/> <Home/></Auth>}/>
        <Route path = '/Wallet' element={<Auth><Navbar/> <Wallet/></Auth>}/>
        <Route path = '/transaction' element={<Auth><Navbar/> <Transaction/></Auth>}/>
        <Route path = '/transfer' element={<Auth><Navbar/> <Transfer/></Auth>}/>
        <Route path = '/search' element={<Auth><Navbar/> <SearchPeople/></Auth>}/>
        <Route path = '/payment' element ={<Auth><Payment/></Auth>}/>
        <Route path = '*' element = {<Notfound/>}/>
      </Routes>
      </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App;
