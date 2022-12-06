import React from 'react'
import styled from 'styled-components';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from '../hooks/useDebounce';

function AllApplication() {
  const [inputSearch, setInputSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [getAll, setGetAll] = useState([]);


  //debounce used to wait user type couple words before call
  const debouncedValue = useDebounce(inputSearch, 500);


  async function allApplications(parameter) {
    try {
      const res = await axios.get(`http://localhost:8080/api/applications/all/`);
      setGetAll(res.data);
      const filteredData = res.data.filter(app => app.name.includes(parameter))
      setSearchData(filteredData);
    } catch (err) {
      console.error(err.message);
    }
  }

  const listAll = () => {
    allApplications("");
    setSearchData(getAll);
  }

  const clear = () => {
    setSearchData([]);
  }

  const navigate = useNavigate();
  const listApplications = (id) => {
    navigate(`/application/${id}`)
  }

  const handleChange = (event) => {
    setInputSearch(event.target.value.charAt(0).toUpperCase());
  };

  useEffect(() => {
    inputSearch === '' ? setSearchData([]) : allApplications(inputSearch);
  }, [debouncedValue])

  return (
    <Wrapper>
      <section className='section-container'>
        <button className='btn' onClick={listAll}>
          See All Applications
        </button >
        <button className='btn' onClick={clear}>
          Clear
        </button >
        <br />
        <div>OR</div>
        <br />
        <span>Search by company name: </span>
        <input
          id="parameter"
          type="text"
          onChange={handleChange}
          placeholder="Company name"
        ></input>
        <br />
        <br />
        <br />
        <div className='container'>
          <div className='column-description'>
            Company Name
          </div>
          <div className='column-description'>
            Application Date
          </div>
          <div className='column-description'>
            Stage
          </div>
          <div className='column-description'>
            Applied Position
          </div>
        </div>

        {searchData.length > 0 &&
          searchData.map((stage) => {
            let message;
            let color;
            if (stage.resume_sent) {
              message = "Resume Sent"
              color = 'resume-sent'
            }
            if (stage.hr_interview) {
              message = "Hr Interview"
              color = 'hr-interview'
            }
            if (stage.tech_interview) {
              message = "Tech Interview"
              color = 'tech-interview'
            }
            if (stage.job_offer) {
              message = "⭐ Got a Offer"
              color = 'job-offer'
            }
            return (
              <div className='container b' key={stage.id}>
                <div className={`${color} child btn`} onClick={() => listApplications(stage.id)}>
                  {stage.name}
                </div>
                <div className="title">{stage.resume_sent_date.slice(0, 10)}</div>
                <div className="title">{message}</div>
                <div className="title">
                  {stage.front_end ? "Front End" : " "}
                  {stage.back_end ? "Back End" : " "}
                  {stage.full_stack ? "Full Stack" : " "}
                </div>
              </div>
            )
          }
          )}
      </section>
    </Wrapper>
  )
}



const Wrapper = styled.main`
text-align: center;
.title{
  font-size:1.5rem;
}
.section-container{
  font-family: 'Delight Coffee', sans-serif;
  color: var(--clr-complement-1)
}
.btn{
  margin: 1%;
  border-radius: 0.5rem;
  font-size:1rem;
}

.b:hover {
  transform: scale(1.03);
  background: var(--clr-primary-700);
  border-radius: 0.5rem;
}

.childa {
  flex-basis: calc(100% - 40px);
  height: 8vw;
  border-radius: 0.5rem;
  background-color: rgb(238, 160, 70);
  color: var(--clr-complement-1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4% 30% 4% 30%;
  font-size: 2vw;
  white-space:pre;
}

.childa .quantity{
  font-size:5vw
}

.container {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  gap: 10px;
  justify-content: center;
  align-items: space-between;
  font-size: 1.5vw;
}

.container .column-description {
  background-color: var(--clr-complement-3);
  flex-basis: calc(50% - 40px);
  height: 3vw;
  border-radius: 0.5rem;
  color: var(--clr-complement-1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2vw;
}

.resume-sent {
  background-color: var(--c7);
  font-size:1.5rem;
}


.hr-interview {
  background-color: var(--c8);
  font-size:1.5rem;
}

.tech-interview {
  background-color: var(--c9);
  font-size:1.5rem;
}

.job-offer {
background-color:var(--clr-primary-300);
font-size:1.5rem;
}

`
export default AllApplication