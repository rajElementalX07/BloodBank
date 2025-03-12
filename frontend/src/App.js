import { useEffect } from 'react';
import './App.css';
import Aos from 'aos';
import { Toaster } from 'react-hot-toast';
import {  Route, Routes,  } from 'react-router-dom';
import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import DonorList from './components/DonorList';
import DonorDetails from './components/DonorDetails';
import ReceiverList from './components/ReceiverList';
import ReceiverDetails from './components/ReceiverDetails';

function App() {
  useEffect(()=>{
        
    Aos.init();

},[]);

  return (
    <>
    <Toaster position="top-center"  reverseOrder={false} toastOptions={{duration: 5000}}/>
   <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}  />   
      <Route path='/auth/farmer-login' element={<AuthPage/>}  />   
      <Route path='/auth/farmer-reg' element={<AuthPage/>}  />   
      <Route path='/donors' element={<DonorList/>}  />   
      <Route path='/donor/:id' element={<DonorDetails/>}  />   
      <Route path='/receivers' element={<ReceiverList/>}  />   
      <Route path='/receiver/:id' element={<ReceiverDetails/>}  />   
      <Route path='*' element={<NotFound/>}  />   
    </Routes>
    </>
  );
}

export default App;
