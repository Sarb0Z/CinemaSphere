import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { supabase } from "../lib/supabase";
import { BsX } from "react-icons/bs";
import postUserMovie from "../api/postUserMovie";
import { tmdbGenres } from "../utils/tmdbGenres"; // Import the TMDb genre list
import fetchMovies from "../api/fetchMovies";

const AddMovieModal = ({ showModal, setShowModal, session, selectedMovie , setMovies}) => {
  const [movieName, setMovieName] = useState(selectedMovie ? selectedMovie.name : "");
  const [movieDescription, setMovieDescription] = useState(selectedMovie ? selectedMovie.description : "");
  const [movieAvatarUrl, setMovieAvatarUrl] = useState(selectedMovie ? selectedMovie.avatar_url : "");
  const [movieGenres, setMovieGenres] = useState(selectedMovie ? selectedMovie.genres || [] : []); // Handle null movieGenres
  const [movieGenresInput, setMovieGenresInput] = useState("");
  const [response, setResponse] = useState(null);

  const handleAddMovie = async (e) => {
    e.preventDefault();

    postUserMovie({
        name: movieName,
        description: movieDescription,
        user_id: session.user.id,
        avatar_url: movieAvatarUrl,
        genres: movieGenres,
    }, setResponse);

    fetchMovies(setMovies);
    setMovieName("");
    setMovieDescription("");
    setMovieAvatarUrl("");
    setMovieGenres([]);
    setMovieGenresInput("");
    setShowModal(false);

  }

  const handleUpdateMovie = async (e) => {
    e.preventDefault();

    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/Movies/${selectedMovie.id}`,
        {
          name: movieName,
          description: movieDescription,
          user_id: session.user.id,
          avatar_url: movieAvatarUrl,
          genres: movieGenres,
        });
    console.log(response);
    setResponse(response.data);
    
    setMovieName("");
    setMovieDescription("");
    setMovieAvatarUrl("");
    setMovieGenres([]);
    setMovieGenresInput("");
    setShowModal(false);
  }

  
  const handleAddGenre = (e) => {
    e.preventDefault();
    if (movieGenresInput.trim() !== "" && tmdbGenres.includes(movieGenresInput.trim())) {
      setMovieGenres([...movieGenres, movieGenresInput]);
      setMovieGenresInput("");
    }
    else {
      alert("Please enter a valid genre from the TMDb genre list.");
    }
  };

  const handleRemoveGenre = (index) => {
    setMovieGenres(movieGenres.filter((_, i) => i !== index));
  };

  return (
    <>
      {showModal && (
        <ModalContainer>
          <ModalContent>
            <BsX
              className="close-button"
              onClick={() => setShowModal(false)}
            />
            <h2>{selectedMovie ? "Edit Movie" : "Add New Movie"}</h2>
            <form onSubmit={selectedMovie ? handleUpdateMovie : handleAddMovie}>
              <div className="input-group">
                <label htmlFor="movieName">Movie Name:</label>
                <input
                  type="text"
                  id="movieName"
                  value={movieName}
                  onChange={(e) => setMovieName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="movieDescription">Description:</label>
                <textarea
                  id="movieDescription"
                  value={movieDescription}
                  onChange={(e) => setMovieDescription(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="movieAvatarUrl">Avatar URL:</label>
                <input
                  type="text"
                  id="movieAvatarUrl"
                  value={movieAvatarUrl}
                  onChange={(e) => setMovieAvatarUrl(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="movieGenres">Genres:</label>
                <div className="genres-container">
                  {movieGenres.map((genre, index) => (
                    <span key={index} className="genre">
                      {genre}
                      <BsX
                        className="remove-genre"
                        onClick={() => handleRemoveGenre(index)}
                      />
                    </span>
                  ))}
                  <input
                    type="text"
                    id="movieGenresInput"
                    value={movieGenresInput}
                    onChange={(e) => setMovieGenresInput(e.target.value)}
                    placeholder="Add genre"
                  />
                  <button onClick={handleAddGenre}>Add</button>
                </div>
              </div>
              <button type="submit">{selectedMovie ? "Update Movie" : "Add Movie"}</button>
            </form>
            {response && (
              <p className={response.success ? "success" : "error"}>
                {response.message}
              </p>
            )}
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 500px;
  max-width: 90%;
  position: relative;
  color: #000; /* Black text color */


  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    color: #000; /* White text color */

  }

  h2 {
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      label {
        font-weight: bold;
      }

      input,
      textarea {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.3rem;
      }

      textarea {
        resize: vertical;
      }
    }

    .genres-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;

      .genre {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.3rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .remove-genre {
          cursor: pointer;
        }
      }

      input {
        flex-grow: 1;
      }

      button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.3rem;
        background-color: #007bff;
        color: #fff;
        cursor: pointer;
      }
    }

    button[type="submit"] {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 0.3rem;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0062cc;
      }
    }
  }

  .success {
    color: green;
  }

  .error {
    color: red;
  }
`;

export default AddMovieModal;
