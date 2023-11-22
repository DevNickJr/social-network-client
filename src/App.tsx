import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import { useAuthContext } from './hooks/useAuthContext'
// import ScrollToTop from './components/ScrollToTop';
import Chat from './pages/user/chat'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import './App.css'


// CapactiorApp.addListener('appStateChange', ({ isActive }) => {
//   console.log('App state changed. Is active?', isActive);
// });



function App() { 
  // const { user } = useAuthContext()

  return (
    <Router>
      <main className="App">
        {/* <ScrollToTop> */}
          <Routes>
            {/* <Route exact path="/" element={<Home />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        {/* </ScrollToTop> */}
      </main>
    </Router>
  )
}

export default App
