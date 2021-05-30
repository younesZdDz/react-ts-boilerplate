import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { styles } from './styles';

const Loading: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
};

export default withStyles(styles)(Loading);
