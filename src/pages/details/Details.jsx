import React, { useEffect } from 'react'
import './style.scss';
import DetailsBanner from './detailsbanner/DetailsBanner';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import TopCast from './topCast/TopCast';
import VideosSection from './videoSection/VideosSection';
import Recommendation from './recommendation/Recommendation';
import Similar from './similar/Similar';
export const Details = () => {

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
      `/${mediaType}/${id}/credits`
  );
 
  useEffect(()=>{
    window.scrollTo(0,0);
  })
  return (
    <div>
      <DetailsBanner crew={credits?.crew}>
        
      </DetailsBanner>
      
      <TopCast data={credits?.cast}/>
      <VideosSection data={data} loading={loading} />
      <Recommendation mediaType={mediaType} id={id}/>
      <Similar mediaType={mediaType} id={id}/>

    </div>
  )
}

export default Details;
