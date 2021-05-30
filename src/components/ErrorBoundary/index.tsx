import React, { Component, ErrorInfo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

class ErrorBoundary extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error,
            errorInfo,
        });
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            const { classes, errorImage } = this.props;
            // Error path
            return (
                <div className={classes.root}>
                    <img className={classes.errorImage} src={errorImage} alt="Unexpected error" />
                    <h2>Ooops ... something went wrong!</h2>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}
interface IProps extends WithStyles<typeof styles> {
    errorImage: string;
}

interface IState {
    error: Error | null;
    errorInfo: ErrorInfo | null;
}
export default withStyles(styles)(ErrorBoundary);
