const response = await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/Movies/${movieId}`,
    {
      data: {
        user_id: session.user.id,
      },
    }
  );