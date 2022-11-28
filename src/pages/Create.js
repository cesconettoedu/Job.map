import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useNavigate, Links } from "react-router-dom";
import axios from 'axios';
import { Navbar, Footer, Company } from '../components';

function Create() {
  const url = '/create/'
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState('');
  const [addNew, setAddNew] = useState(false)
  const [addExisting, setAddExisting] = useState(false)
  const [companies, setCompanies] = useState([])

  const handleChange = (e) => {
    setCompanyName(e.target.value);
  }

  // makes axios post to back end upon form submit to company name
  const companySubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { name: companyName }
      const response = await axios.post("http://localhost:8080/api/companies", body)
      const id = response.data[0].id
      navigate(`/create/${id}`)
    } catch (error) {
      console.error(error.message)
    }
    setCompanyName('')
  }

  //get all companies
  const getAllCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/companies');
      setCompanies(response.data)
    } catch (err) {
      console.error(err.message);
    }
  }

  console.log(companies);
  return (
    <Wrapper>
      <Navbar />
      <div className="title">
        <h2>Create Application</h2>
      </div>

      <div className="title create-btns">
        <button className='btn' onClick={() => {
          if (addNew) {
            setAddNew(false)
          }
          setAddExisting(true)
          getAllCompanies()
        }}>Add Existing Company</button>

        <button className='btn' onClick={() => {
          if (addExisting) {
            setAddExisting(false)
          }
          setAddNew(true)
        }}>Add New Company</button>
      </div>

      {addNew &&
        <form onSubmit={companySubmit} className="title company-form">
          <label>
            <span className='company-name'> Company Name: <br /></span>
            <input type='text' name="company" value={companyName} onChange={handleChange} placeholder="Add Company Name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      }
      {addExisting &&
        <ul className="company-container">
          {companies.map((company) => {
            return <Company key={company.id}{...company} url={url} />
          })}
        </ul>
      }
      <Footer />
    </Wrapper>
  )
}

const Wrapper = styled.main`
.title{
  color:white;
  margin-top: 2rem;
}
.company-form{
  margin-top: 3rem;
}
.company-name{
padding-bottom:1rem;
}
.create-btns{
  display:flex;
  justify-content: space-around;
}
`
export default Create