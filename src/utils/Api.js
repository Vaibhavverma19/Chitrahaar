import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2E1NjdmNTQ4YWE4ODFkNWFhMTZhNmRlNTgyMzZmZSIsInN1YiI6IjY1MmQzNjMyNjYxMWI0MDEzOWI0YTZhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yIkfs0ScO9CgG1QjCHLzTTucj4Q4If181qcSyeXpGlU";

const headers = {
    Authorization:'bearer ' +
    TMDB_TOKEN,
};

export const fetchDataFromApi = async(url,params) =>{
    try{
        const {data}=await axios.get( BASE_URL + url,
            {
               headers,
               params
            })
            return data;
    }catch(e){
        console.log(e);
        return e;
    }
}