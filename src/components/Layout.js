import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//render the childen of the outlet component 
//gives us one parent where we can add extra things if we want to
const Layout = () => {
    return <Outlet />
}
export default Layout