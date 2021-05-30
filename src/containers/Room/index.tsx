import { Avatar, Container, Grid } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { DateTime } from 'luxon';
import config from '../../config';
import useInputState from '../../shared/hooks/useInputState';
import { IDetailedRoom } from '../../redux/rooms/slice';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors';
import { useStyles } from './styles';
import axios from 'axios';

const socket = socketIOClient.io(`${config.SOCKET_URI}/rooms`, {
    auth: { token: localStorage.getItem('token') },
});

const Room: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { _id: roomId } = useParams();
    const [currentMessageContent, handleChangeCurrentMessageContent, resetCurrentMessageContent] = useInputState('');
    const [messages, setMessages] = useState<
        {
            sentBy: string;
            content: string;
            createdAt: number;
        }[]
    >([]);
    const user = useSelector(selectAuthUser);

    const messagesEndRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const classes = useStyles();

    useEffect(() => {
        const fetchRoomData = async () => {
            const {
                data: { messages },
            } = await axios.get<IDetailedRoom>(`${config.API_URI}/api/v1/rooms/${roomId}`);
            setMessages(messages);
        };
        fetchRoomData();
    }, []);

    useEffect(() => {
        socket.on('room.message', (message) => {
            setMessages((messages) => [...messages, message]);
        });
        socket.emit('room.join', roomId);
        return () => {
            socket.emit('room.leave', roomId);
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const onEnterPress: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === 'Enter' && e.shiftKey == false) {
            e.preventDefault();
            resetCurrentMessageContent();
            socket?.emit('room.message', {
                content: currentMessageContent,
                createdAt: DateTime.utc().toSeconds(),
                roomId,
            });
        }
    };
    const messagesRender = messages.map(({ content, sentBy, createdAt }) => {
        const isOwnMessage = sentBy === user?._id;
        const date = DateTime.fromSeconds(createdAt);
        const [messageDate, messageTime] = [date.toLocaleString(), date.toLocaleString(DateTime.TIME_24_WITH_SECONDS)];
        return (
            <Grid
                key={createdAt}
                container
                justify="space-between"
                direction={isOwnMessage ? 'row-reverse' : 'row'}
                alignItems="center"
            >
                <Avatar className={`${classes.avatar} ${isOwnMessage ? classes.ownAvatar : classes.othersAvatar}`}>
                    {user?.email.substring(1, 3)}
                </Avatar>
                <div
                    className={`${classes.messageContent} ${
                        isOwnMessage ? classes.ownMessageContent : classes.othersMessageContent
                    }`}
                >
                    {content}
                </div>
                <div className={classes.timestamp}>
                    <p>{messageDate}</p>
                    <p>{messageTime}</p>
                </div>
            </Grid>
        );
    });
    return (
        <Container className={classes.root} maxWidth="md">
            <Grid className={classes.messagesWrapper} container justify="center" direction="row" spacing={4}>
                {messagesRender}
                <div ref={messagesEndRef} />
            </Grid>
            <Grid className={classes.textAreaWrapper} container>
                <textarea
                    value={currentMessageContent}
                    onChange={handleChangeCurrentMessageContent}
                    className={classes.textArea}
                    placeholder="Aa"
                    onKeyDown={onEnterPress}
                />
            </Grid>
        </Container>
    );
};

export default Room;
