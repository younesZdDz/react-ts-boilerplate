import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchRooms } from '../../redux/rooms/asyncActions';
import { selectRooms } from '../../redux/rooms/selectors';
import MediaCard from '../../components/Card';
import { Container } from '@material-ui/core';
import { useStyles } from './styles';

const Home: React.FC = () => {
    const rooms = useSelector(selectRooms);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(asyncFetchRooms());
    }, []);
    const classes = useStyles();
    return (
        <Container maxWidth="lg">
            <Grid
                container
                justify="center"
                direction="column"
                alignItems="center"
                spacing={4}
                className={classes.root}
            >
                {rooms.map(({ _id, title, description }) => (
                    <Grid key={_id} item>
                        <MediaCard title={title} description={description} navigationLink={`/rooms/${_id}`} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Home;
