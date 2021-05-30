import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import React from 'react';
const Copyright: React.FC = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://zadi-younes.pro">
                ZADI Younes
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Copyright;
