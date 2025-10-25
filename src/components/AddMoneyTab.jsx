import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../App.css'
const AddMoneyTab = ({setShowAddMoneyTab,transactions,setTransactions,touchedElement,balance,setBalance}) => {
    const [amount,setAmount] = React.useState(0);
    const [reason,setReason] = React.useState('');
    
    // useEffect(()=>
    // {
    //   axios.get("http://localhost:8080/transactionsDetails")
    //     .then(res => setTransactions(res.data))
    // },[]);
   
    function displayTransactions()
    {
        if(reason == '' && balance == 0) 
        {
           alert("Give a Valid Input")
           return;
        }
        if(touchedElement == 'expenses')
        {
            if(balance - amount < 0)
            {
               alert("Insufficient balance ")
            return;
            }

        }
       
        axios.post("http://localhost:8080/addTransaction", {
                serialNo : transactions.length+1,
                type : (touchedElement == "expenses") ? "debited" : "credited",
                reason : reason,
                amount : amount,
                date : new Date().toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
              }), 
              key :transactions.length+1
            })
        .then(res => 
          {
            setTransactions([...transactions,res.data]);
            setBalance(res.data.balance)
            setAmount(0);
            setReason('');
            setShowAddMoneyTab(false);
            console.log(res.data);
            
          }
          )
         .catch(err => console.error("Error adding transaction:", err));
    }

  return (
    <div className='add-money-tab' onClick={()=>
    {
        setShowAddMoneyTab(false)
    }
     }>
    <div  className='add-money-content' onClick={e => e.stopPropagation()}>
       <form>
          <div>
            <label >Amount :</label>
            <input type="number" onChange={(e)=>
                {
                   setAmount(Number(e.target.value));
                }
            }/>
          </div>
          <div>
            <label >Reason :</label>
            <input type="text" onChange={(e)=>
                {
                   setReason(e.target.value);
                }} />
          </div>
           <button className="add-money-save-button" type="submit" onClick={
            (e)=>
            {
                
                 e.preventDefault();
                 displayTransactions();
                 setAmount(0);
                setReason('');
                if ((touchedElement === "expenses" && amount > balance) ||(reason == '' && balance == 0))return; 

                setShowAddMoneyTab(false);               
            }
           }>Save</button>
       </form>     
    </div>
    </div>
  )
}

export default AddMoneyTab
