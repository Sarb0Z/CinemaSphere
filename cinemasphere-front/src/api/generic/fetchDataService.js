import axios from "axios";

export default function fetchDataService(api_path, setData){
  
    (async () => {
        try {
            const response = await axios.request({
            method: "GET",
            url: `${process.env.REACT_APP_BACKEND_URL}/${api_path}`,
            });
            setData(response.data);
            // console.log(userMovies);
        } catch (error) {
            // setError(error);
            console.log(error);
        }
    })();
}

