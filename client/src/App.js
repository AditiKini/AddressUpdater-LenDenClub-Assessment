import React, { useState } from "react";
import {Box} from '@mui/material';
import Home from './components/home/Home';
import DataProvider from './context/DataProvider';
import Header from './components/header/header';
import Main from './components/dashboard/main';
import AllRecord from './components/record/AllRecord';
import UpdateRecord from './components/record/UpdateRecord';
import {BrowserRouter, Routes, Route ,Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = ({ isUserAuthenticated, ...props}) => {

  return isUserAuthenticated ? 
  <>
    <Outlet />
  </> : <Navigate replace to='/' />
}

function App() {

  const [isUserAuthenticated, setUser] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter> 
          <Header setUser={setUser}/>
          <Box>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/main' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
                   <Route path='/main' element={<Main />} />
                </Route>
                <Route path='/allrecords' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
                   <Route path='/allrecords' element={<AllRecord />} />
                </Route>
                <Route path='/update/:id' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
                   <Route path='/update/:id' element={<UpdateRecord />} />
                </Route>
            </Routes>
          </Box>
      </BrowserRouter>
      </DataProvider>
  );
}

export default App;
