import React from 'react';
import { Route, Routes } from 'react-router-dom';

import WalletTest from '../views/walletTest';

//import NotFound from '../components/views/default/NotFound'

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<WalletTest />}></Route>
      {/* <Route path="/walletTest" exact element={<WalletTest />}></Route> */}

      {/* <Route>
        <NotFound />
      </Route> */}
    </Routes>
  );
};

export default Router;
