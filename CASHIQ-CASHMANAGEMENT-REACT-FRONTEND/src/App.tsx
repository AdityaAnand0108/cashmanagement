import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup/Signup'
import Layout from './components/Layout/Layout'
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login'; // Import Login
import IncomeSources from './components/IncomeSources/IncomeSources';
import Transactions from './components/Transactions/Transactions';
import SavingsGoals from './components/SavingsGoals/SavingsGoals';
import DebtsIOUs from './components/DebtsIOUs/DebtsIOUs';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/Auth/ProtectedRoute';
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
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/income-sources" element={<IncomeSources />} />
            <Route path="/savings-goals" element={<SavingsGoals />} />
            <Route path="/debts" element={<DebtsIOUs />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
