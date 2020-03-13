import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

type TProps = { isAuthenticated: boolean; children: any };

function isWhiteListedRoute(route: string) {
  return ['/', '/login/', '/calendar/'].some((str) => str === route);
}

export default function AuthContainer(props: TProps) {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!props.isAuthenticated && !isWhiteListedRoute(location.pathname)) {
      history.push('/login');
    }
  }, [props.isAuthenticated, history, location.pathname]);

  return <Container>{props.children}</Container>;
}
