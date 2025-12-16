import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup/Signup'
import Layout from './components/Layout/Layout'
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login'; // Import Login
import QuickAddTransaction from './components/QuickAddTransaction/QuickAddTransaction';
import Dashboard from './components/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/smart-expense" element={<QuickAddTransaction />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
