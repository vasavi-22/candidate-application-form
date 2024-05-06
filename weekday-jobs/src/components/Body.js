import React, {useState, useEffect} from "react";
import Header from "./Header";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import JobCard from "./JobCard";
import "./styles.css";

const Body = () => {
    //Total count of jobs
    const [jobsCount, setJobsCount] = useState(0);

    //Jobs data fetched from th API
    const [jobsData, setJobsData] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAllDataFetched, setIsAllDataFetched] = useState(false);

    //state variables used for filters
    const [experience, setExperience] = useState('');
    const [jobType, setJobType] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [tech, setTech] = useState('');
    const [role, setRole] = useState('');
    const [pay, setPay] = useState('');

    //Fetching jobs data from the API
    useEffect(() => {
        fetchData();
    },[]);

    //Filtering jobs based on different criteria (companyName, location, experience, role, pay, etc.)
    useEffect(() => {
        fetchJobs();
    },[name, location, experience, role, pay]);

    //Fetching data when we scroll down (Infinite scroll)
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
                && !isLoading
                && !isAllDataFetched // Check if all data is not fetched yet
            ) {
                fetchData();
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, isAllDataFetched]);

    const fetchData = () => {
        setIsLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({
            "limit": 10,
            "offset": filteredJobs.length
        });
       
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body
        };

        fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
        .then((response) => response.json())
        .then((result) => {
             // Check if all jobs are fetched
            if (filteredJobs.length + result.jdList.length >= result.totalCount) {
                setIsAllDataFetched(true); // Set a state to indicate all data is fetched
            }

            setJobsCount(result.totalCount);
            setJobsData((prevData) => [...prevData, ...result.jdList]);
            setFilteredJobs((prevData) => [...prevData, ...result.jdList]);
            setIsLoading(false);
        })
        .catch((error) => console.error(error));

    };

    const fetchJobs = () => {
        const filtered = jobsData.filter((job) => {
            // Filter based on name
            const nameMatch = name === '' || job.companyName.toLowerCase().includes(name.toLowerCase());
            
            // Filter based on location
            const locationMatch = location === '' || job.location.toLowerCase().includes(location.toLowerCase());

            //Filter based on experience
            const experienceMatch = experience === '' || (job.minExp <= experience && job.maxExp >= experience);

            //Filter based on role
            const roleMatch = role === '' || job.jobRole.toLowerCase().includes(role.toLowerCase());

            //Filter based on pay
            const payMatch = pay === '' || (job.minJdSalary >= pay);
            
            // Filter conditions
            return nameMatch && locationMatch && experienceMatch && roleMatch && payMatch

        });
        setFilteredJobs(filtered);
        setJobsCount(filtered.length);
    };
    
    return(
        <div>
            <Header count={jobsCount}/>

            {/* Filters */}
            <div className="filters-tab">
            <FormControl>
                <InputLabel id="demo-simple-select-label">Experience</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={experience}
                    onChange={(e) => {
                        setExperience(e.target.value)
                    }}
                    label="Experience"
                    endAdornment={
                        experience && (
                          <IconButton edge="start" onClick={() => setExperience('')} size="small">
                            <ClearIcon />
                          </IconButton>
                        )
                    }
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                </Select>
            </FormControl>
            <TextField id="outlined-basic" label="Company name" variant="outlined" value={name} 
            onChange={(e) => {
                setName(e.target.value);
            }}
            />
            <TextField id="outlined-basic" label="Location" variant="outlined" value={location} onChange={(e) => {
                setLocation(e.target.value)
            }} />
            <FormControl>
                <InputLabel id="demo-simple-select-label">Remote/on-site</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={jobType}
                    onChange={(e) => {
                        setJobType(e.target.value)
                    }}
                    label="Remote/on-site"
                    endAdornment={
                        jobType && (
                          <IconButton edge="start" onClick={() => setJobType('')} size="small">
                            <ClearIcon />
                          </IconButton>
                        )
                    }
                >
                    <MenuItem value={"Remote"}>Remote</MenuItem>
                    <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
                    <MenuItem value={"In=office"}>In-office</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Tech stack</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tech}
                    onChange={(e) => {
                        setTech(e.target.value)
                    }}
                    label="Remote/on-site"
                    endAdornment={
                        tech && (
                          <IconButton edge="start" onClick={() => setTech('')} size="small">
                            <ClearIcon />
                          </IconButton>
                        )
                    }
                >
                    <MenuItem value={"c++"}>C++</MenuItem>
                    <MenuItem value={"python"}>Python</MenuItem>
                    <MenuItem value={"java"}>Java</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    onChange={(e) => {
                        setRole(e.target.value)
                    }}
                    label="Remote/on-site"
                    endAdornment={
                        role && (
                          <IconButton edge="start" onClick={() => setRole('')} size="small">
                            <ClearIcon />
                          </IconButton>
                        )
                    }
                >
                    <MenuItem value={"frontend"}>Frontend</MenuItem>
                    <MenuItem value={"backend"}>Backend</MenuItem>
                    <MenuItem value={"full-stack"}>Full-stack</MenuItem>
                    <MenuItem value={"android"}>Android</MenuItem>
                    <MenuItem value={"ios"}>IOS</MenuItem>
                    <MenuItem value={"tech lead"}>Tech Lead</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Min base pay</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pay}
                    onChange={(e) => {
                        setPay(e.target.value)
                    }}
                    label="Experience"
                    endAdornment={
                        pay && (
                          <IconButton edge="start" onClick={() => setPay('')} size="small">
                            <ClearIcon />
                          </IconButton>
                        )
                    }
                >
                    <MenuItem value={10}>10L</MenuItem>
                    <MenuItem value={20}>20L</MenuItem>
                    <MenuItem value={30}>30L</MenuItem>
                    <MenuItem value={40}>40L</MenuItem>
                    <MenuItem value={50}>50L</MenuItem>
                    <MenuItem value={60}>60L</MenuItem>
                    <MenuItem value={70}>70L</MenuItem>
                </Select>
            </FormControl>
            </div>

            {/* Map through each job to display it in Job Card */}
            <div className="jobs-container" >
                {
                    filteredJobs.length === 0 && isLoading === false ? 
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <img src="https://jobs.weekday.works/_next/static/media/nothing-found.4d8f334c.png" width="150px" height="150px" />
                            <h4>No Jobs available for this category at this moment</h4>
                        </div> : 
                    <>
                        {
                        filteredJobs.map((item, index) => {
                            return <JobCard key={index} job={item}/>
                        })
                        }
                        {/* {isLoading && <div>Loading...</div>} */}
                    </>
                }
            </div>
        </div>
    )
};

export default Body;