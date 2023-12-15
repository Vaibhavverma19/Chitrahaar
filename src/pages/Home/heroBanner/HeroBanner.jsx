import React from 'react'
import './style.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Img from '../../../components/lazyloadimg/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
const HeroBanner = () => {
  const [query,setQuery]=useState("");
  const [background,setbackground]=useState();
  const {url}=useSelector((state)=>state.home)
  
  const Navigate=useNavigate();

  const {data,loading}=useFetch('/movie/top_rated')
  

  useEffect(()=>{
    const bg= url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    setbackground(bg);


    const intervalId = setInterval(() => {
      const newBackground =
        url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
      setbackground(newBackground);
    }, 5000);

    // Clear the interval when the component is unmounted or when the dependencies change
    return () => clearInterval(intervalId);
 
  },[url,data]);

  const handlequery=(event)=>{
    if(event.key==="Enter" && query.length>0)
    {
      //console.log(query);
      Navigate(`/search/${query}`)
    }
  }

  return (
    <>
    <div className="herobanner">
      {!loading && (<div className="backdrop" >

        <Img className="backdrop-img" src={background}></Img>
      </div>) }
      <div className="opacity-layer">
        
      </div>
      <ContentWrapper>

        <div className="main-content">
          <h1>Welcome</h1>
          <h2>watch million of TV shows and movies at your comfort.</h2>
          <div className="inputsection">
            <input 
            type="text"
            placeholder='search for movies or TV shows...'
            onChange={(e)=>setQuery(e.target.value)}
            onKeyUp={handlequery}
            />
            <button >Search</button>
          </div>
        </div>
      </ContentWrapper>
      
    </div>
    </>
  )
}

export default HeroBanner;