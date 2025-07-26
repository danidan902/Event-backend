import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import DashBoard from './Pages/Dashboard.jsx'
import CreateEvent from './Pages/CreateEvent.jsx'
import Header from './components/Header.jsx'
import Event from './Pages/Event.jsx'

 function App() {
   return (  
   
        <Router>
            <div className='bg-gry-50 min-h-screen'>
            <Header/>
        <Routes>
            <Route path='/createEvent' element={<Event/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/dashboard' element={<DashBoard/>} />
            <Route path='/' element={<CreateEvent/>} />
        </Routes>
        <ToastContainer/>
        </div>
    </Router>
    
     
   )
 }
 
 export default App