import React, { useState } from 'react'
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"

import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';
const Similar = ({mediaType,id}) => {
  
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
   

  return (
           <>
           {
            data?.results.length>0 && (
                <div className="carouselSection">
    
                <ContentWrapper>
                    <div className="contentTitle">
                        <span className='title'>{title}</span>
                    </div>
                </ContentWrapper>
                <Carousel data={data?.results} loading={loading} category={mediaType}/>
                
                
                </div>
            )
           }
           </>
          
        )
    
}

export default Similar;