import { Outlet } from 'react-router-dom'

//render the childen of the outlet component 
//gives us one parent where we can add extra things if we want to
const Layout = () => {
    return <Outlet />
}
export default Layout