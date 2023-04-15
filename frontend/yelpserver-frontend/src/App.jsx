import { useState } from 'react'
import { Navigation, Search } from './components'
import './index.css'

function App() {
  return (
    <div className="App">
      <div className="">
        <Navigation />
      </div>
      <Search />
    </div>
  )
}

export default App
