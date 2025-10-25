import { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';
import './App.css'
import AddMoneyTab from './components/AddMoneyTab'
import TransactionHistory from './components/TransactionHistory';
function App() {
  
  const [balance,setBalance] = useState(0)
   const [transactions,setTransactions] = useState([]);
   useEffect(()=>
    {
      axios.get("http://localhost:8080/transactionsDetails")
        .then(res =>
          {
             setTransactions(res.data)

             setBalance(res.data.at(-1).balance)
             console.log(res.data);
             
             
          })
    },[]);
   
  const [showAddMoneyTab,setShowAddMoneyTab] = useState(false);
  const [showAddExpenseTab,setShowAddExpenseTab] = useState(false);
  return (
    <div className='full-app'>
      <div className="left-container">
        <div className='edit-container'>
          <button className="Add-money" onClick={()=>setShowAddMoneyTab(true)}>Add Money</button>
          
          {showAddMoneyTab && <AddMoneyTab setShowAddMoneyTab={setShowAddMoneyTab} transactions={transactions} setTransactions={setTransactions} touchedElement ="addMoney" balance={balance} setBalance={setBalance}/>}
          <button className="add-expense" onClick={()=>{setShowAddExpenseTab(true)}}>Add Expense</button>
          {showAddExpenseTab && <AddMoneyTab setShowAddMoneyTab={setShowAddExpenseTab} transactions={transactions} setTransactions={setTransactions} touchedElement ="expenses" balance={balance} setBalance={setBalance}/>}
        </div>
       
        <TransactionHistory transactions={transactions}
        setTransactions={setTransactions}/>
      </div>
      <div className="summary-container">
        <div className="summary">SUMMARY</div>
        <div className="balance-container">AVAILABLE BALANCE</div>
        <div className="balance">{balance}</div>
      </div>
    </div>
  )
}

export default App
