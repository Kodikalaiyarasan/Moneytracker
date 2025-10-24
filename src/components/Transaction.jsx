import React from 'react'

const Transaction = ({serialNo,type,reason,amount,date,key}) => {
  return (
    <div className='transaction-container'>
      <div className="serial-no">{serialNo}</div>
      <div className='type'>{type}</div>
      <div className='reason'>{reason}</div>
      <div className="amount">{amount}</div>
      <div className='date'>{date}</div>
    </div>
  )
}

export default Transaction
