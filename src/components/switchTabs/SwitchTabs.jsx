import React, { useState } from 'react'
import './style.scss'
const SwitchTabs = ({data,onTabChange}) => {
    const [left,setLeft]=useState(0);
    const [selectedTab,setselectedTab]=useState(0);
    const selectThisTab=(tab,index)=>{
       
        setLeft(index*100)
        setTimeout(()=>(
            setselectedTab(index)
        )
        ,300);
        onTabChange(tab)
    }
  return (
     <div className="switchingTabs">
        <div className="tabItems">
            {
                data.map((tab,index)=>(
                    <span key={index} 
                    className={` tab ${selectedTab===index?"active":""}`}
                     onClick={()=>(selectThisTab(tab,index))} >
                    {tab}</span>
                ))
            }
            <span className="movingBg" style={{left}} />
        </div>
     </div>
  )
}

export default SwitchTabs;