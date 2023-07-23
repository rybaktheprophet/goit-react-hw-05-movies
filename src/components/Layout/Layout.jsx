import { Suspense } from 'react';
import { Outlet, NavLink} from 'react-router-dom';
import styled from "styled-components";


const StyledLink = styled(NavLink)`
  color: white;
  &.active {
    color: orange;
  }
`;

export const Layout = () => {


  return (
    <>
      <header>
        <nav>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/movies">Movies</StyledLink>
        </nav>
      </header>

      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
}
