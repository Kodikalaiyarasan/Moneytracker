import React, { useState } from 'react'
import Transactions from './Transactions';
const TransactionHistory = ({transactions,setTransactions}) => {
   
  return (
    <> 
    {transactions.length !=0 && <div className="trans-line">TRANSACTION-HISTORY</div>}
    <div className='transaction-history-container'>
    <Transactions transactions = {transactions} setTransactions= {setTransactions}/>
    </div>
    </>
  )
}

export default TransactionHistory
