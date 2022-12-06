import React from 'react';
import Axios from 'axios';
import styled from 'styled-components'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Levels(props) {
  const [quantity, setQuantity] = useState([]);
  //get the quantity of applications from the server
  const fetchData = () => {
    try {
      Axios.get(`http://localhost:8080/api/applications`).then((res) => {
        console.log(res.data);
        setQuantity(res.data)
      })
        .catch(err => console.log(err))

    } catch (error) {
      console.error(error.message);
    }
  };
  // fetch applications data after page is rendered
  useEffect(() => {
    fetchData()
  }, []);
  const navigate = useNavigate();
  const buttonClicked = (button) => {
    props.setLevelClicked(button)
    navigate("/companies")
  }
  return (
    <Wrapper>
      <div className="statistics parent">
        <div
          className="statistics-btn offers_btn offer" onClick={() => buttonClicked(1)}>
          <h4>{` Offers:`} <span className="statistics_number">{quantity[3]}</span></h4>
        </div>

        <div
          className="statistics-btn tech-interviews-btn btn" onClick={() => buttonClicked(2)}>
          <h4>{`Tech Interviews:`} <span className="statistics_number">{quantity[2]} </span></h4>
        </div>

        <div className="statistics-btn hr-interviews-btn btn" onClick={() => buttonClicked(3)}>
          <h4>{`HR Interviews:`} <span className="statistics_number"> {quantity[1]}</span></h4>
        </div>

        <div className="statistics-btn resume-btn btn" onClick={() => buttonClicked(4)}>
          <h4>{`Resumes Sent:`} <span className="statistics_number"> {quantity[0]}</span></h4>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
.parent{
  min-height:78.5vh;
}
h4 {
  font-family: 'Delight Coffee', sans-serif;
   color: var(--clr-complement-1);
}
.statistics_number {
  font-family: 'Delight Coffee', sans-serif;
  font-size: 2vw;
  color:var(--clr-complement-1);
}
.statistics {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-around;
  column-gap: 40px;
  width: 100%;
  height: 68.5vh;
  align-items: flex-start;   
  background: rgb(35, 6, 51)
}
.statistics-btn {
  display: flex;
  width: 80%;
  height: 9vh;
  justify-content:center;
  align-items:center;
  font-size: min(3vh, 4vw);
  transition-property: color;
  transition-duration: 0s;
  transition-delay: 5s;
  animation: progress 2s ease-in, font 2.25s;
  color: white;
  
}
.statistics-btn:hover {
  background-color: var(--clr-primary-700);
  cursor: pointer;
}

.resume-btn {
  width: 70%;
  margin-left: 15%;
  background-color: var(--c7);
}

.hr-interviews-btn {
  width: 55%;
  margin-left: 22.5%;
  background-color: var(--c8);
}

.tech-interviews-btn {
  width: 40%;
  margin-left: 30%;
  background-color: var(--c9);
}

.offers_btn {
  width: 25%;
  margin-left: 37.5%;
  
}

.all_companies_btn {
  width: 10%;
  margin-left: 45%;
  font-size: min(2vh, 2vw);
  /* background:purple; */
}
 h4, h5{
  margin:0;
  line-height:0;
 }
@keyframes progress {
  from {width: 0%;}
  0% {
    background-color: var(--clr-primary-100);
  }
 
  25% {
    background-color: var(--clr-primary-300);
  }
  
  75% {
    background-color: var(--clr-primary-400);
  }
}

@keyframes font {
  25% {color: transparent;}
  50%{color: transparent;}
  75% {color: inherit;}
}


.offer {
  border-radius: 0.5rem;
  background: var(--clr-primary-700);
  font-size: 2vw;
  margin-top: 0.3em;
  color: var(--clr-complement-1);
  position: relative;
  z-index: 0;
} 

.offer:before {
  content: '';
 background: linear-gradient(45deg, 
  #681e8a, 
  #9525eb, 
  #bc60fa, 
  #e5bffe,
  #ae3bf6, 
  #efdbfe, 
  #d393fd, 
  #8d1dd8, 
  #751eaf
  );
  position: absolute;
  top: -2px;
  left:-2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity .3s ease-in-out;
  border-radius: 10px;
  opacity: 1;
}


.offer:after {
  color: white;
  z-index: -1;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color:var(--clr-primary-300);
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
} 

`
export default Levels
