import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { logout } from '../../redux/auth/slice';
import styles from './styles';

const NavBar: React.FC<WithStyles<typeof styles> & IProps> = ({ classes, hideRoutes }) => {
    const { pathname } = useLocation();
    if (hideRoutes.some((hideRoute) => pathname === hideRoute)) {
        return null;
    }
    const dispatch = useDispatch();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        React TS Boilerplate
                    </Typography>
                    <Button onClick={() => dispatch(logout())} color="inherit">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};
interface IProps {
    hideRoutes: string[];
}
export default withStyles(styles)(NavBar);
