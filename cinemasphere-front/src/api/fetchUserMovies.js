import axios from "axios";

export default function fetchUserMovies(user_id, setUserMovies){
  
    (async () => {
        try {
            const userMovies = await axios.request({
            method: "GET",
            url: `${process.env.REACT_APP_BACKEND_URL}/Movies/${user_id}`,
            });
            // console.log(`${process.env.REACT_APP_BACKEND_URL}/Movies/${user_id}`)
            setUserMovies(userMovies.data);
            // console.log(userMovies);
        } catch (error) {
            // setError(error);
            console.log(error);
        }
    })();
}

