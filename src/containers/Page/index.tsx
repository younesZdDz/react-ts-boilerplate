import React, { Suspense } from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../redux/auth/selectors';
import Loading from '../../components/Loading';
import appRoutes from '../App/routes';
import errorImg from '../../assets/500.svg';

const Page: React.FC<IProps> = ({
    title,
    description,
    errorImage = errorImg,
    fallback = <Loading />,
    requireLogin = true,

    children,
}) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (requireLogin && !isAuthenticated) {
        return <Redirect to={appRoutes.auth.path} />;
    }

    return (
        <div className="page">
            <>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                </Helmet>
                <ErrorBoundary errorImage={errorImage}>
                    <Suspense fallback={fallback}>{children}</Suspense>
                </ErrorBoundary>
            </>
        </div>
    );
};
interface IProps {
    title: string;
    description: string;
    errorImage?: string;
    fallback?: NonNullable<React.ReactNode>;
    requireLogin?: boolean;

    children: React.ReactNode;
}

export default Page;
