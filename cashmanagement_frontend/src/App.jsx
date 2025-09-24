import React from 'react'
import SpendingOverview from './component/dashboard/Spending_overview';

function App() {

  return (
    <>
        <SpendingOverview monthAmount="$2,450" daySpent="$150" />
    </>
  )
}

export default App
