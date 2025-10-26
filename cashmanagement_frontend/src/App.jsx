import React from 'react'
import { Box } from '@mui/material'
import DashboardPage from './component/dashboard/DashboardPage/DashboardPage'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'

function App() {

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box component="main" flexGrow={1} p={2}>
        <DashboardPage />
      </Box>
      <Footer />
    </Box>
  )
}

export default App
