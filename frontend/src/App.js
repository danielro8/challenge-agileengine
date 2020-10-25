import './App.css';
import axios from "axios"
import { useState, useEffect, useCallback } from "react"
import Collapsible from 'react-collapsible';

const App = () => {
  const [transactions, setTransactions] = useState([])
  console.log('dasdas', transactions.data)
  const fetch = async () => {
    const rta = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/transactions/history`)
    setTransactions(rta.data)
   console.log('rta', rta)
  }
  const stableFetch = useCallback(fetch, [])
  useEffect(()=> {
    stableFetch()
  }, [stableFetch])
  return (
    <div className="container">
   <div className="row">
     <h2>
       Transaction List
     </h2>
     </div>
     <div className="row">
     <h3>
       {transactions.map(transaction => <Collapsible className="collapsed-element" trigger="Transaction"><p>Type: {transaction.type} Amount: ${transaction.amount} </p></Collapsible>)}
     </h3>
     </div>
   </div>
  );
}

export default App;
