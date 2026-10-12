import { useState } from 'react'
import './App.css'
import PageContainer from './container /PageContainer';
import Header from './components/Header';
import RouterCofig from './config/RouterCofig';
import Loading from './components/Loading';

function App() {
  
  return (
    <div>
      <PageContainer>
        <Header/>
        <RouterCofig/>
        <Loading/>
      </PageContainer>
    </div>
  )
}

export default App
