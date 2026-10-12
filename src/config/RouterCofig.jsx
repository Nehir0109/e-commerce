import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';

function RouterCofig() {
  return (
   <Routes>
    <Route path='/' element={<Home />}/>
   </Routes>
  )
}

export default RouterCofig