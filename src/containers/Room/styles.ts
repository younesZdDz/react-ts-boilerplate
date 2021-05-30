import { makeStyles, createStyles } from '@material-ui/core/styles';
import greyColor from '@material-ui/core/colors/grey';

export const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: `${16 * 4}px`,
        },
        avatar: {
            color: 'white',
        },
        othersAvatar: {
            backgroundColor: 'orange',
        },
        ownAvatar: {
            backgroundColor: 'grey',
        },
        messageContent: {
            flex: 1,
            padding: '1.3rem',
            margin: '0.7rem 2rem',
            borderRadius: '3rem',
        },
        ownMessageContent: {
            backgroundColor: greyColor[400],
            color: 'black',
        },
        othersMessageContent: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
        timestamp: {
            color: 'grey',
            fontStyle: 'italic',
            lineHeight: '2px',
            fontSize: '0.9rem',
        },
        messagesWrapper: {
            height: '75vh',
            overflowY: 'scroll',
            overflowX: 'hidden',
        },
        textAreaWrapper: {
            margin: '3rem auto 1rem auto',
            height: '7vh',
        },
        textArea: {
            width: '100%',
            height: '100%',
            '&:focus': {
                outline: 'None',
            },
        },
    }),
);
