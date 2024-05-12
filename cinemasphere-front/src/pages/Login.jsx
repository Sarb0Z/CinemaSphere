import styled from "styled-components";
import logo from "../assets/logo.png";
import background from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
// import { supabase } from "../lib/supabase";
import { useState } from "react";
import { createClient } from '@supabase/supabase-js'

const Login =() => {

  const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
  )
  console.log(REACT_APP_SUPABASE_URL);

  const [data, setData] = useState(
    {
        email: '',
        password: ''
    }
  )

  const navigate = useNavigate();

  const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prev) => ({
          ...prev,
          [name]: value

      }));
  }

  const login = async () => {
      try {
        let { data: dataUser, error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password
        
        })
        if (dataUser) {
            console.log(dataUser);
            navigate("/");
        }
      }
      
      catch (error) {
          console.log(error)
      }
  }

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="text"
                placeholder="Email"
                onChange={handleChange}
                value={data.email}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={data.password}
              />
              <button onClick={login}>Login to your account</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
`;

export default Login;