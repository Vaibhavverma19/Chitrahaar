import React, { useState } from 'react'
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel';
const Trending = () => {
  const [category,setcategory]=useState("movie")
  const {data,loading}=useFetch(`/trending/${category}/week`)

  const onTabChange=(tab)=>{
    console.log(tab);
    setcategory((tab==="Movies")? "movie" : "tv") ;
    
  }
  return (
    <div className="carouselSection">

    <ContentWrapper>
        <div className="contentTitle">
            <span className='title'>Trending</span>
           
            <SwitchTabs
                data={["Movies","TV Shows"]}
                onTabChange={onTabChange}
            ></SwitchTabs>
         
        </div>
    </ContentWrapper>
        <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending;