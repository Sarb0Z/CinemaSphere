const response = await axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/Movies/${updatedMovie.id}`,
    updatedMovie
  );