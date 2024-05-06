import './styles.css';
import Badge from '@mui/material/Badge';

const Header = ({count}) => {

    // Including the count of jobs in a badge, count value obtained from the Body component using props
    return(
        <div className="header">
            <Badge badgeContent={count} color="primary" overlap="circular" anchorOrigin={{vertical: 'top', horizontal: 'right',}}>
                <p>Search jobs</p>
            </Badge>
        </div>
    );
};

export default Header;