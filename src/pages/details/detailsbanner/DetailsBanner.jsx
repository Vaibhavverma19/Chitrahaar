import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import PosterFallback from "../../../assets/no-poster.png";
import "./style.scss";
import Img from "../../../components/lazyloadimg/Img";
import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import CircleRating from "../../../components/circleRating/CircleRating";
import { PlayIcon } from "./PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
const DetailsBanner = ({ crew }) => {
  // console.log(crew);
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { data: videos } = useFetch(`/${mediaType}/${id}/videos`);

  const [show, setShow] = useState(false);
  const [vid, setVid] = useState();

  const { url } = useSelector((state) => state.home);
  console.log(url);

  const directors = crew?.filter(
    (f) => f.job === "Director" || f.job === "Executive Producer"
  );

  const writers = crew?.filter(
    (f) => f.job === "Writer" || f.known_for_department === "Writing"
  );

  const creaters = crew?.filter((f) => f.job === "Creater");

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    <Img
                      className="posterImg"
                      src={
                        data.poster_path
                          ? url.poster + data.poster_path
                          : PosterFallback
                      }
                    ></Img>
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <div className="genres">
                      {data?.genres?.map((item,index) => (
                        <span key={index} className="genre">
                          {" "}
                          {item.name}
                        </span>
                      ))}
                    </div>
                    <div className="row">
                      <CircleRating
                        rating={data?.vote_average.toFixed(1)}
                      ></CircleRating>
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVid(videos?.results?.[0].key);
                        }}
                      >
                        <span className="icon">
                          <PlayIcon />
                        </span>
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data?.overview}</div>
                    </div>
                    <div className="info">
                      <div className="infoItem">
                        <span className="text bold">Status: </span>
                        <span className="text">{data?.status}</span>
                      </div>
                      <div className="infoItem">
                        <span className="text bold">Released Date: </span>
                        <span className="text">
                          {dayjs(data?.release_date).format("MMM D, YYYY")}
                        </span>
                      </div>
                      {data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Duration: </span>
                          <span className="text">
                            {toHoursAndMinutes(data?.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {directors?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Directors: </span>
                        <span className="text">
                          {directors.map((data, id) => (
                            (id < 3 && 
                            
                            <span key={id}>
                              {data.name}
                              {directors.length - 1 != id && id<2? ", " : " "}
                            </span>
                          )
                          ))}
                        </span>
                      </div>
                    )}
                    {writers?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writers: </span>
                        <span className="text">
                          {writers.map((data, id) => (
                             (id < 3 && 
                            
                              <span key={id}>
                                {data.name}
                                {writers.length - 1 != id && id<2? ", " : " "}
                              </span>
                            )
                          ))}
                        </span>
                      </div>
                    )}
                    {creaters?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creaters: </span>
                        <span className="text">
                          {creaters.map((data, id) => (
                             (id < 3 && 
                            
                              <span key={id}>
                                {data.name}
                                {creaters.length - 1 != id && id<2? ", " : " "}
                              </span>
                            )
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  videoId={vid}
                  setVideoId={setVid}
                  show={show}
                  setShow={setShow}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
