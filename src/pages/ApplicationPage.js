import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { Networks, Notes, Stages, Navbar } from '../components';
import styled from 'styled-components'


function CompanyPage(props) {
  const [company, setCompany] = useState({})
  const navigate = useNavigate();
  // take the id   
  let applicationId = useParams();

  // get all information about the company by id
  async function getCompany() {
    const response = await axios.get(`http://localhost:8080/api/applications/custom/${applicationId.id}`)
    setCompany(response.data[0])
  }


  ////////////////////////////////////////////////////////////////////
  const deleteApplication = (id) => {
    const choice = window.confirm("Are you sure you want to delete this contact?")
    if (choice) {
      try {
        axios.delete(`http://localhost:8080/api/applications/${id}`)
          .then((res) => {
            alert("Application Deleted")
            navigate(-1)
          })
      } catch (err) {
        console.error(err.message);
      }
    }
  }



  useEffect(() => {
    // eslint-disable-next-line
    getCompany()
  }, []);

  return (
    <Wrapper>
      <Navbar />
      <div >
      <button type="button" className="btn d" onClick={() => deleteApplication(applicationId.id)}>DELETE Application</button>
        <h1 className='title underline'>{company.name}</h1>
        <h3>Stack: {company.stack}</h3>
        {company.front_end && <h3>Position: Front End</h3>}
        {company.back_end && <h3>Position: Back End</h3>}
        {company.full_stack && <h3>Position: Full Stack</h3>}
      </div>
      <Notes applicationID={applicationId.id} />
      <Stages />
      <Networks applicationID={applicationId.id} />
      <div className="footer">
        <h5>
          &copy; {new Date().getFullYear()}
          <span> job.map()</span>
        </h5>
        <h5> All rights reserved</h5>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.main`
color: var(--clr-white);
text-align: center;
.title{
  padding-top:2rem;
  text-decoration-line: underline;  
  font-family: 'Delight Coffee', sans-serif;
  color: var(--clr-complement-1);
  font-size:4rem;
}

.d{
  display: flex;
  float: right;
  margin-right: 24%;
  background: var(--c5);
}
.d:hover {
  background: var(--c4);
}


h3{
  font-family: 'Delight Coffee', sans-serif;
  color: var(--clr-complement-1);
  font-size:3rem;
}
.notes-component-wrapper {
  display: flex;
  justify-content: center;
}

.footer { 
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  bottom: 0;
  width: 100%;
  height: 5rem;
  background: var(--clr-primary-400);


  span {
    color: var(--clr-primary-5);
  }
  h5 {
    font-family: 'Delight Coffee', sans-serif;
    color: var(--clr-complement-1);
    font-size:1.5rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
}
`
export default CompanyPage