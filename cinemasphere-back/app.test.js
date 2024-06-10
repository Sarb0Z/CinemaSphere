it('should return a list of all users', async () => {
  const response = await request(app).get('/api/Users');
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
});

it('should return a single user', async () => {
  const userId = 1; // Replace with a valid user ID
  const response = await request(app).get(`/api/Users/${userId}`);
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(userId);
});

it('should update a user', async () => {
  const userId = 1; // Replace with a valid user ID
  const updatedUser = {
    username: 'new_username',
    full_name: 'New Full Name',
  };
  const response = await request(app)
    .put(`/api/Users/${userId}`)
    .send(updatedUser);
  expect(response.status).toBe(200);
  expect(response.text).toBe('updated!!');
});
it('should return a single movie', async () => {
  const movieId = 1; // Replace with a valid movie ID
  const response = await request(app).get(`/api/Movies/${movieId}`);
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(movieId);
});

it('should return a list of all movies', async () => {
  const response = await request(app).get('/api/Movies');
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
});

it('should create a new movie', async () => {
  const newMovie = {
    name: 'New Movie',
    description: 'A new movie description',
    user_id: 1, // Replace with a valid user ID
    avatar_url: 'https://example.com/avatar.jpg',
    genres: ['Genre 1', 'Genre 2'],
  };
  const response = await request(app).post('/api/Movies').send(newMovie);
  expect(response.status).toBe(200);
  expect(response.text).toBe('created!!');
});

it('should update a movie', async () => {
  const movieId = 1; // Replace with a valid movie ID
  const updatedMovie = {
    name: 'Updated Movie',
    description: 'An updated movie description',
  };
  const response = await request(app)
    .put(`/api/Movies/${movieId}`)
    .send(updatedMovie);
  expect(response.status).toBe(200);
  expect(response.text).toBe('updated!!');
});

it('should delete a movie', async () => {
  const movieId = 1; // Replace with a valid movie ID
  const response = await request(app).delete(`/api/Movies/${movieId}`);
  expect(response.status).toBe(200);
  expect(response.text).toBe('deleted!!');
});

it('should return a list of all reviews', async () => {
  const response = await request(app).get('/api/Reviews');
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
});

it('should return a list of reviews for a specific movie', async () => {
  const movieId = 1; // Replace with a valid movie ID
  const response = await request(app).get(`/api/Reviews/${movieId}`);
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
});

it('should create a new review', async () => {
  const newReview = {
    description: 'A new review description',
    rating: 5,
    created_by: 1, // Replace with a valid user ID
    movie_id: 1, // Replace with a valid movie ID
  };
  const response = await request(app).post('/api/Reviews').send(newReview);
  expect(response.status).toBe(200);
  expect(response.text).toBe('created!!');
});

it('should update a review', async () => {
  const reviewId = 1; // Replace with a valid review ID
  const updatedReview = {
    description: 'An updated review description',
    rating: 4,
  };
  const response = await request(app)
    .put(`/api/Reviews/${reviewId}`)
    .send(updatedReview);
  expect(response.status).toBe(200);
  expect(response.text).toBe('updated!!');
});

it('should delete a review', async () => {
  const reviewId = 1; // Replace with a valid review ID
  const response = await request(app).delete(`/api/Reviews/${reviewId}`);
  expect(response.status).toBe(200);
  expect(response.text).toBe('deleted!!');
});


