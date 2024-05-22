const response = await axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/Movies/${selectedMovie.id}`,
    {
        name: movieName,
        description: movieDescription,
        user_id: session.user.id,
        avatar_url: movieAvatarUrl,
        genres: movieGenres,
    });