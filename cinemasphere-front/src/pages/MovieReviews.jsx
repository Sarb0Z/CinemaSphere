import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { MdModeEditOutline } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";
import video from "../assets/video.mp4";
import movie_1 from "../assets/posters/movie_1.jpg";
import movie_2 from "../assets/posters/movie_2.jpg";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";

const MovieReviews = () => {
  const [session, setSession] = useState(null)
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const { movieId } = useParams();
  // console.log(movieId);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    description: "",
    rating: 0,
    created_by: "",
    movie_id: 0,
  });
  const [movieData, setMovieData] = useState(null);
  const fetchReviews = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Reviews/${movieId}`);
    
    // console.log(response.data);
    setReviews(response.data);
  };

  const fetchMovieData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Movies/movie_id/${movieId}`);
    setMovieData(response.data);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setNewReview({ description: "",rating: 0, created_by: session.user.id, movie_id: movieId });

    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setNewReview({ description: "",rating: 0, created_by: session.user.id, movie_id: movieId });

    })

    return () => subscription.unsubscribe()
  }, [])
  if (!session) {
    navigate("/login");
  }

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    console.log(movieId);

    fetchReviews();
    fetchMovieData();
  }, [movieId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    // Send new review data to backend API
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Reviews`, newReview);

    // Update reviews state and clear the form
    // setReviews([...reviews, response.data]);
    // setNewReview({ description: "",rating: 0, created_by: session.user.id, movie_id: movieId });

    fetchReviews();
  };

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} sessionData={session}/>
      </div>
      {movieData && <MovieHeader movieData={movieData} /> }
      {reviews && <ReviewSection reviews={reviews} session ={session} fetchReviews={fetchReviews}/> }
      <WriteReviewSection newReview={newReview} setNewReview={setNewReview} handleReviewSubmit={handleReviewSubmit} />
    </Container>
  );
};

const MovieHeader = ({ movieData }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-header flex column">
      <img
        // src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        src={movie_1}
        alt="card"
        onClick={() => navigate("/player")}
      />
      <div className="info-container flex column">
        <h3 className="name" onClick={() => navigate("/player")}>
          {movieData.name}
        </h3>
        <div className="icons flex j-between">
          <div className="controls flex">
            <IoPlayCircleSharp
              title="Play"
              onClick={() => navigate("/player")}
            />
            <RiThumbUpFill title="Like" />
            <RiThumbDownFill title="Dislike" />
            {/* <ImCross
              title="Remove from My List"
              onClick={() => handleDeleteMovie(movieData.id)}
            />
            <MdModeEditOutline
              title="Edit Movie Details"
              onClick={() => handleEditMovie(movieData)}
            />
            <button onClick={() => navigate(`/reviews/${movieData.id}`)}>
              <MdOutlineRateReview title="Review" />
            </button> */}
          </div>
          <div className="info">
            <BiChevronDown title="More Info" />
          </div>
        </div>
        {movieData.genres ? (
          <div className="genres flex">
            <ul className="flex">
              {movieData.genres.map((genre) => (
                <li>{genre}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const ReviewSection = ({ reviews , session, fetchReviews}) => {
  return (
    <div className="review-section">
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="reviews-list">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} session={session} fetchReviews={fetchReviews}/>
          ))}
        </ul>
      )}
    </div> 
  );
};

// const ReviewItem = ({ review }) => {
//   const [reviewUser, setReviewUser] = useState(null);
//   const fetchReviewUser = async () => {
//     const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Users/${review.created_by}`);
//     // console.log(response.data);
//     setReviewUser(response.data);
//   };
//   useEffect(() => {
//     fetchReviewUser();
//   }, []);

//   return (
//     <li className="review-item">
//       {reviewUser && 
//       <div className="user-info flex">
//         <img src={reviewUser.avatar_url} alt="user avatar" />
//         <div className="user-details">
//           <h3>{reviewUser.full_name}</h3>
//           <p>{review.created_at}</p>
//         </div>
//       </div> }

//       <p className="review-text">{review.description}</p>
//       <div className="rating">
//         {[...Array(review.rating)].map((_, index) => (
//           <span key={index}>★</span>
//         ))}
//         {[...Array(5 - review.rating)].map((_, index) => (
//           <span key={index}>☆</span>
//         ))}
//       </div>
//     </li>
//   );
// };

const ReviewItem = ({ review, session, fetchReviews}) => {
  const [reviewUser, setReviewUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedReview, setUpdatedReview] = useState(review.description);

  const fetchReviewUser = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Users/${review.created_by}`);
    setReviewUser(response.data);
  };

  useEffect(() => {
    fetchReviewUser();
    // console.log(session.user.id);
    // console.log(review.created_by);
    console.log(reviewUser);
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedReview(review.description);

  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedReview(review.description);
  };

  const handleSaveClick = async () => {
    // Update the review on the backend
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Reviews/${review.id}`, {
      description: updatedReview,
      rating: review.rating,
      created_by: review.created_by,
      movie_id: review.movie_id,
    });

    // Update the review in the state
    // setReviews(reviews.map((r) => (r.id === review.id ? response.data : r)));
    setIsEditing(false);
    fetchReviews();
  };

  const handleDeleteClick = async () => {
    // Delete the review from the backend
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/Reviews/${review.id}`);

    // Remove the review from the state
    // setReviews(reviews.filter((r) => r.id !== review.id));
    fetchReviews();
  };

  return (
    <li className="review-item">
      {reviewUser && (
        <div className="user-info flex">
          <img src={reviewUser[0].avatar_url} alt="user avatar" />
          <div className="user-details">
            <h3>{reviewUser[0].full_name}</h3>
            {/* <p>{review.created_at}</p> */}
          </div>
        </div>
      )}

      {isEditing ? (
        <textarea
          value={updatedReview}
          onChange={(e) => setUpdatedReview(e.target.value)}
        />
      ) : (
        <p className="review-text">{review.description}</p>
      )}

      <div className="rating">
        {[...Array(review.rating)].map((_, index) => (
          <span key={index}>★</span>
        ))}
        {[...Array(5 - review.rating)].map((_, index) => (
          <span key={index}>☆</span>
        ))}
      </div>

      {session && session.user.id === review.created_by && (
        <div className="edit-buttons">
          {isEditing ? (
            <>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
          <div>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
          )}
        </div>
      )}
    </li>
  );
};


const WriteReviewSection = ({ newReview, setNewReview, handleReviewSubmit}) => {
  return (
    <div className="write-review-section">
      <h2>Write a Review</h2>
      <form onSubmit={handleReviewSubmit}>
        <div className="rating-input">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
          >
            {[...Array(5)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1} stars
              </option>
            ))}
          </select>
        </div>
        <div className="text-input">
          <label htmlFor="review-text">Review:</label>
          <textarea
            id="review-text"
            value={newReview.text}
            onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

const Container = styled.div`
  margin: 2.3rem;
  margin-top: 8rem;
  gap: 3rem;

  .movie-header {
    gap: 1rem;

    img {
      border-radius: 0.2rem;
      width: 100%;
      height: 300px;
      object-fit: cover;
    }

    .info-container {
      h3 {
        margin-bottom: 0.5rem;
      }

      .icons {
        gap: 1rem;

        .controls {
          display: flex;
          gap: 1rem;

          svg {
            font-size: 2rem;
            cursor: pointer;
            transition: 0.3s ease-in-out;

            &:hover {
              color: #b8b8b8;
            }
          }
        }

        .info {
          svg {
            font-size: 2rem;
            cursor: pointer;
          }
        }
      }

      .genres {
        ul {
          gap: 1rem;

          li {
            padding-right: 0.7rem;

            &:first-of-type {
              list-style-type: none;
            }
          }
        }
      }
    }
  }

  .review-section {
    h2 {
      margin-bottom: 1rem;
    }

    .reviews-list {
      list-style: none;
      padding: 0;
      margin: 0;

      .review-item {
        border: 1px solid #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 0.3rem;

        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;

          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }

          .user-details {
            h3 {
              margin-bottom: 0.5rem;
            }

            p {
              font-size: 0.8rem;
              color: #666;
            }
          }
        }

        .review-text {
          margin-bottom: 1rem;
        }

        .rating {
          display: flex;
          gap: 0.5rem;

          span {
            font-size: 1.5rem;
            color: #ffc107;
          }
        }
      }
    }
  }

  .write-review-section {
    h2 {
      margin-bottom: 1rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .rating-input,
      .text-input {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        label {
          font-weight: bold;
        }

        select,
        textarea {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 0.3rem;
        }

        textarea {
          resize: vertical;
        }
      }

      button {
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: 0.3rem;
        background-color: #007bff;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #0062cc;
        }
      }
    }
  }
`;

export default MovieReviews;
