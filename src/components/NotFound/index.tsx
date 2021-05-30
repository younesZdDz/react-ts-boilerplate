import { WithStyles, withStyles } from '@material-ui/core';
import React from 'react';
import notFoundImage from '../../assets/something-lost.png';
import { styles } from './styles';

const NotFound: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
    return (
        <div className={classes.root}>
            <img className={classes.image} src={notFoundImage} alt="Not found" />
            <h1>Oops, looks like the page is lost</h1>
            <p>This is not a fault, just an accident that was not intentional.</p>
        </div>
    );
};

export default withStyles(styles)(NotFound);
