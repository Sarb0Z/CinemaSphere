import axios from "axios";

export default function postUserMovie(movieData, setResponse){
  
    (async () => {
        try {
          const res = await axios.request({
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}/movies`,
            data: movieData
          });
          // setFlag(true);
          setResponse(res);
        } catch (error) {
          // setError(error);
          console.log(error);
        }
    })();
}