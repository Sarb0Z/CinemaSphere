import axios from "axios";

export default function fetchDataService(api_path, setData, body){
  
    (async () => {
        try {
            const response = await axios.request({
            method: "PUT",
            url: `${process.env.REACT_APP_BACKEND_URL}/${api_path}`,
            data: body

            });
            setData(response.data);
            // console.log(userMovies);
        } catch (error) {
            // setError(error);
            console.log(error);
        }
    })();
}

