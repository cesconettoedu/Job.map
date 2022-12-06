import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

function ListCompanies(props) {

  const [list, setList] = useState([])
  const [stage, setStage] = useState([])
  const [strStage, setStrStage] = useState([])
  const [color, setColor] = useState([])
  const navigate = useNavigate();


  //const x = 0   //change the parameter depends how is configurate on Landing Page  props

  // case 0 = AllCompanies
  // case 1 = Offers
  // case 2 = Tech interviews
  // case 3 = Hr Interviews
  // case 4 = resume sent
  const getList = async (stage) => {
    try {
      switch (stage) {
        case 0:
          const all = await axios.get("http://localhost:8080/api/companies/")
          setList(all.data);
          setStage(0)
          setStrStage('  All Companies')
          setColor('purple')
          break;

        case 1:
          const offers = await axios.get("http://localhost:8080/api/applications/job_offers")
          setList(offers.data);
          setStage(1)
          setStrStage('  Job Offers')
          setColor('job-offer')
          break;

        case 2:
          const tech = await axios.get("http://localhost:8080/api/applications/tech_interviews")
          setList(tech.data);
          setStage(2)
          setStrStage('  Tech Interviews')
          setColor('tech-interview')
          break;

        case 3:
          const hr = await axios.get("http://localhost:8080/api/applications/hr_interviews")
          setList(hr.data);
          setStage(3)
          setStrStage('  HR Interviews')
          setColor('hr-interview')
          break;

        case 4:
          const resumeSent = await axios.get("http://localhost:8080/api/applications/resumes")
          setList(resumeSent.data);
          setStage(4)
          setStrStage('  Resumes Sent')
          setColor('resume-sent')
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err.message);
    }
  }


  useEffect(() => {
    getList(props.levelClicked || 0)
  }, [props.levelClicked]);

  //pass the id 
  const btnSingleCompany = (id) => {
    if (stage === 0) {
      navigate(`/companies/${id}`)
    } else {
      navigate(`/application/${id}`)
    }
  }

  return (
    <Wrapper>
      <div className={`${color} main-header`}>
        <span className="quantity">{list.length}</span>   {strStage}
      </div>
      <div className='container'>
        <div className='description'>
          Company Name
        </div>
        <div className='description'>
          stack
        </div>
        <div className='description'>
          application date
        </div>
        {/* <div className='description'> Resume Submission Date base on the request </div> */}
      </div>
      {list.map((info) =>
        <div className='container hover-feature' key={info.id}>
          <div className={`${color} company-name btn`} onClick={() => btnSingleCompany(info.id)}>
            {info.name}
          </div>
          <div className="title">{info.stack}</div>
          <div className="title">{info.resume_sent_date.slice(0, 10)}</div>
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
button {
  cursor: pointer;
}
.title{
  font-family: 'Delight Coffee', sans-serif;
  color: var(--clr-complement-1)
}
.main-header {
  flex-basis: calc(100% - 40px);
  height: 8vw;
  font-family: 'Delight Coffee', sans-serif;
  color: var(--clr-complement-1)
  border-radius: 0.5rem;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4% 30% 4% 30%;
  font-size: 2vw;
  white-space:pre;
}

.main-header .quantity{
  font-size:5vw
}

.container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  justify-content: center;
  align-items: space-between;
  font-size: 1.5vw;
}

.container .description {
  font-family: 'Delight Coffee', sans-serif;
  color: var(--clr-complement-1);
  background-color: var(--clr-primary-800);
  flex-basis: calc(50% - 40px);
  height: 3vw;
  border-radius: 0.5rem;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2vw;
}

.company-name {
  flex-basis: calc(50% - 40px);
  font-family: 'Delight Coffee', sans-serif;
  color: var(--clr-complement-1);
  height: 2.5vw;
  border-radius: 0.5rem;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5vw;
  font-size: 1.5vw;
  margin: 1%;
  border-radius: 0.5rem;
}

.hover-feature:hover {
  transform: scale(1.03);
  background: var(--clr-primary-300);
  border-radius: 0.5rem;
}

.purple {
  background-color: purple;
}

.job-offer {
  background-color:var(--clr-primary-400);
}

.tech-interview {
background-color: var(--c9);
}

.hr-interview {
  background-color: var(--c8);
}

.resume-sent {
  background-color: var(--c7);
}

.container .hover-feature {
  background-color: rgb(189,183,107);
}

`
export default ListCompanies