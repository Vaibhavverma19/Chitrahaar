import React, { useEffect, useState } from 'react'
import './style.scss'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import Spinner from './tools/spinner/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from './tools/moviecard/MovieCard';
import errorimg from "../../assets/resultnotfound.webp";
const SearchResult = () => {
  const {query}=useParams();
  const [data,setdata]=useState(null);
  const [loading,setloading]=useState();
  const [pageNum,setpageNum]=useState(1);
  
  //now get data
  const fetchInitialData=()=>{
    setloading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res)=>{
         setdata(res);
         setloading(false);
         setpageNum((prev)=>prev+1);
    })
    
  }

  const fetchNextPage=()=>{
    
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res)=>{
        setdata({
          ...data, 
          results:[...data.results,...res.results]
        });
        
        setpageNum((prev)=>prev+1);
    })
  }

  useEffect(()=>{
    fetchInitialData();
  },[query]);
  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial="initial" ></Spinner>}
      {!loading && (
        <ContentWrapper>
          { data?.results?.length >0?(
            <>
             <div className="pageTitle">
              {`showing results for '${query}'`}
             </div>
            <InfiniteScroll
              className="content"
              dataLength={data?.results?.length || []}
              next={fetchNextPage}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner />}
            >
               {data?.results?.map((item)=>{
                   if(item.media_type !== "person ")
                   {
                    return (
                      <MovieCard
                      key={item.id}
                       data={item}
                       />
                      
                    )
                   }
               })}
            </InfiniteScroll>
            </>
          ):(
            <div className="resultNotFound">
              <h1> Oops!! No Result Found!!</h1>
              <img src={errorimg}></img>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult