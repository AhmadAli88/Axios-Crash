import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserList from './components/UserList'
import UserForm from './components/UserForm'
import FileUpload from './components/FileUpload'
import SearchComponent from './components/SearchComponent'
import Dashboard from './components/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <UserList/>
     {/* <UserForm/> */}
     {/* <FileUpload/> */}
     {/* <SearchComponent/> */}
     {/* <Dashboard/> */}
    </>
  )
}

export default App
