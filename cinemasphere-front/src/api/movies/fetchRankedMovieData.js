import axios from "axios";

export default function fetchMovies(setMovies){
  
    (async () => {
        try {
            const movies = await axios.request({
            method: "GET",
            url: `${process.env.REACT_APP_BACKEND_URL}/MoviesRanked`,
            });
            // console.log(`${process.env.REACT_APP_BACKEND_URL}/Movies/${user_id}`)
            setMovies(movies.data);
            // console.log(userMovies);
        } catch (error) {
            // setError(error);
            console.log(error);
        }
    })();
}

