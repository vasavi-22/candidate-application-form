import React, {useState, useEffect} from "react";
import JobCard from "./JobCard";
import "./styles.css";

const Body = () => {
    const [jobsCount, setJobsCount] = useState(0);
    const [jobsData, setJobsData] = useState([]);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
        "limit": 10,
        "offset": 0
    });
       
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
    };

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = () => {
        fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            setJobsCount(result.totalCount)
            setJobsData(result.jdList)
        })
        .catch((error) => console.error(error));
    }
    
    return(
        <div style={{display:"flex", gap:"30px", flexWrap: "wrap", justifyContent:"center"}}>
            {
                jobsData.map((item) => {
                    return <JobCard key={item.jdUid} job={item}/>
                })
            }
        </div>
    )
};

export default Body;