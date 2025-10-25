import React from 'react'
import Transaction from './Transaction'
const Transactions = ({transactions,setTransactions}) => {
    
    
    const TransactionsComponent = transactions.map(
        (transaction)=>
        {
            return (
                <Transaction 
                serialNo={transaction.key}
                type = {transaction.type}
                reason = {transaction.reason}
                amount={transaction.type == "credited" ?
                    '+'+transaction.amount :
                    '-'+transaction.amount
                }
                date = {transaction.date}
                key = {crypto.randomUUID()}
                />
            )
        }
    )
    const noDataFound = <div className="no-data-found">NO DATA FOUND</div>
    return (
        <> 
        {transactions.length == 0 ? noDataFound : TransactionsComponent}
    </>
  )
}

export default Transactions
