import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserMovieCard from "../components/UserMovieCard";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase";
// import fetchUserMovies from "../api/fetchUserMovies";
import fetchMovies from "../api/fetchMovies";
import AddMovieModal from "../components/AddMovieModal";
import axios from "axios";


const UserListedMovies = () => {
  // const movies = useSelector((state) => state.netflix.movies);
  const [movies, setMovies] = useState(undefined);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // const [userMovies, setUserMovies] = useState([]);

  const [session, setSession] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      console.log(session.user.id)
      fetchMovies(setMovies);
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    // if (session) {
    //   fetchUserMovies(session.user.id, setMovies);
    // }
    return () => subscription.unsubscribe()
  }, [])
  if (!session) {
    navigate("/login");
  }

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const handleDeleteMovie = async (movieId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/Movies/${movieId}`,
        {
          data: {
            user_id: session.user.id,
          },
        }
      );
      if (response.status === 200) {
        const updatedMovies = movies.filter((movie) => movie.id !== movieId);
        setMovies(updatedMovies);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditMovie = (movie) => {
    if (movie.user_id !== session.user.id) {
      // Display error message or redirect
      return;
    }
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleUpdateMovie = async (updatedMovie) => {
    // if (updatedMovie.user_id !== session.user.id) {
    //   // Display error message or redirect
    //   return;
    // }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/Movies/${updatedMovie.id}`,
        updatedMovie
      );
      if (response.status === 200) {
        const updatedMovies = movies.map((movie) =>
          movie.id === updatedMovie.id ? updatedMovie : movie
        );
        setMovies(updatedMovies);
        setSelectedMovie(null);
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} sessionData = {session}/>
      <div className="content flex column">
        <h1>Custom Movies List</h1>
        <div className="buttons flex">
          <button onClick={() => setShowModal(true) } 
          className="flex j-center a-center"> Add Movie </button>
        </div>
        <div className="grid flex">
        {movies ?
          movies.map((movie, index) => {
            return (
              <UserMovieCard
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
                handleDeleteMovie={handleDeleteMovie}
                handleEditMovie={handleEditMovie}

              />
            );
          }) :
          <p>Loading...</p>
        }
        </div> 
        {showModal && (
          <AddMovieModal 
            showModal={showModal} 
            setShowModal={setShowModal} 
            session={session}
            selectedMovie={selectedMovie}
            handleUpdateMovie={handleUpdateMovie}
          />
        )}
        
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
    .buttons {
      gap: 2rem;
      button {
        font-size: 1.4rem;
        gap: 1rem;
        border-radius: 0.2rem;
        padding: 0.5rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: none;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
          opacity: 0.8;
        }
        &:nth-of-type(2) {
          background-color: rgba(109, 109, 110, 0.7);
          color: white;
          svg {
            font-size: 1.8rem;
          }
        }
      }
    }
  }
`;

export default UserListedMovies;