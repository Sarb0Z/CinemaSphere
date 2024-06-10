it('should render an image with the correct source URL', () => {
  const movieData = {
    image: 'https://image.tmdb.org/t/p/w500/poster_path.jpg',
  };
  const wrapper = shallow(<UserMovieCard movieData={movieData} />);
  expect(wrapper.find('img').prop('src')).toEqual(movieData.image);
});

it('should render the movie name', () => {
  const movieData = {
    name: 'Movie Name',
  };
  const wrapper = shallow(<UserMovieCard movieData={movieData} />);
  expect(wrapper.find('.name').text()).toEqual(movieData.name);
});

it('should render the movie genres', () => {
  const movieData = {
    genres: ['Genre 1', 'Genre 2'],
  };
  const wrapper = shallow(<UserMovieCard movieData={movieData} />);
  expect(wrapper.find('.genres li').length).toEqual(movieData.genres.length);
});

it('should display a hover state when the mouse hovers over it', () => {
  const movieData = {
    image: 'https://image.tmdb.org/t/p/w500/poster_path.jpg',
  };
  const wrapper = shallow(<UserMovieCard movieData={movieData} />);
  wrapper.simulate('mouseEnter');
  expect(wrapper.find('.hover').exists()).toBeTruthy();
});

it('should display a video preview in the hover state', () => {
  const movieData = {
    image: 'https://image.tmdb.org/t/p/w500/poster_path.jpg',
  };
  const wrapper = shallow(<UserMovieCard movieData={movieData} />);
  wrapper.simulate('mouseEnter');
  expect(wrapper.find('.image-video-container video').exists()).toBeTruthy();
});

it('clicking on the image should navigate to the player page', () => {
  const navigate = jest.fn();
  const movieData = {
    image: 'https://image.tmdb.org/t/p/w500/poster_path.jpg',
  };
  const wrapper = shallow(<UserMovieCard movieData={movieData} navigate={navigate} />);
  wrapper.find('img').simulate('click');
  expect(navigate).toHaveBeenCalledWith('/player');
});

it('clicking on the play icon should navigate to the player page', () => {
  const navigate = jest.fn();
  const movieData = {
    image: 'https://image.tmdb.org/t/p/w500/poster_path.jpg',
  };
  const wrapper = shallow(<UserMovieCard movieData={movieData} navigate={navigate} />);
  wrapper.find('.controls IoPlayCircleSharp').simulate('click');
  expect(navigate).toHaveBeenCalledWith('/player');
});
