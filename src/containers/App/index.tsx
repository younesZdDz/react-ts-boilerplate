import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page from '../Page';
import NotFound from '../../components/NotFound';
import NavBar from '../NavBar';
import appRoutes from './routes';
import './styles.css';

const App: React.FC = () => {
    return (
        <>
            <NavBar hideRoutes={['/auth']} />
            <Switch>
                {Object.entries(appRoutes).map(([key, { path, title, description, requireLogin, Component }]) => (
                    <Route
                        key={key}
                        exact
                        path={path}
                        render={() => (
                            <Page title={title} description={description} requireLogin={requireLogin}>
                                <Component />
                            </Page>
                        )}
                    />
                ))}
                <Route
                    render={() => (
                        <Page title="Oop, something lost" description="Page not found">
                            <NotFound />
                        </Page>
                    )}
                />
            </Switch>
        </>
    );
};

export default App;
