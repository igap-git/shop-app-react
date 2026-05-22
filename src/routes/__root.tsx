import { Outlet, Link, createRootRoute } from '@tanstack/react-router'


export const Route = createRootRoute({
  component:() => (
    <>
    <h1>My App</h1>
    <ul>
        <li>
            <Link to="/"> HOME</Link>
        </li>
        <li>
            <Link to="/profile"> PROFILE</Link>
        </li>
    </ul>
    <Outlet />
    </>
  ),
})


