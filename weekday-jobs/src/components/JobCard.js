import React, {useState} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./styles.css";

//Modal box styles
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: 500,
    width: '45%',
    transform: 'translate(-50%, -50%)',
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
};

const JobCard = ({job}) => {

    //Modal box essentials to display modal when we click on show more on job description
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Destructuring the intermediate values from props (job)
    const {companyName, jobRole, location, maxJdSalary, minJdSalary, jobDetailsFromCompany, minExp} = job;
    
    //Formatting salary for User Interface
    const findSalary = (maxJdSalary, minJdSalary) => {
        if(maxJdSalary!=null && minJdSalary!=null){
            return <p style={{display:"inline"}}>{minJdSalary} - {maxJdSalary}</p>
        }
        else if(maxJdSalary!=null && minJdSalary==null){
            return <p style={{display:"inline"}}>Upto {maxJdSalary}</p>
        }
        else if(maxJdSalary==null && minJdSalary!=null){
            return <p style={{display:"inline"}}>Min {minJdSalary}</p>
        }
        else{
            return <p style={{display:"inline"}}>null</p>
        }
    };

    return(
        <Card sx={{ maxdWidth: "275px"}} style={{width: "400px"}}>
            {/* Job Related content */}
            <CardContent>
                <div className="card-header">
                    <div>
                        <img className="company-logo" src={job.logoUrl} alt="logo"/>
                    </div>
                    <div>
                        <p>{companyName}</p>
                        <p>{jobRole}</p>
                        <p>{location}</p>
                    </div>
                </div>
                <div className="card-body">
                    <span>Estimated Salary: &#8377; {findSalary(maxJdSalary, minJdSalary)} LPA</span>
                    <div className="sidebar-box">
                        <h3>About Company:</h3>
                        <h4>About us</h4>
                        <p>{jobDetailsFromCompany}</p>
                        <p className="show-more"><button id="view-btn" onClick={handleOpen}>Show more</button></p>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Job Description
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <p>{companyName}</p>
                                    {jobDetailsFromCompany}
                                </Typography>
                            </Box>
                        </Modal>
                    </div>
                    <div className="exp">
                        {minExp ? <span>Minimum Experience<p>{minExp} years</p></span> : <p></p>}
                    </div>
                </div>
            </CardContent>

            {/* Apply Button */}
            <CardActions>
                <Button variant="contained" size="medium" id="apply-btn" disableRipple>Easy Apply</Button>
            </CardActions>
        </Card>
    )
};

export default JobCard;