import { Box } from '@mui/material'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import { Outlet } from 'react-router'

function App() {

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box component="main" flexGrow={1} p={2}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default App
