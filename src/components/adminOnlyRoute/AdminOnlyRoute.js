import { useSelector } from 'react-redux'
import { selectEmail } from '../../redux/slice/authSlice'
import {Link} from 'react-router-dom';

const AdminOnlyRoute = ({children}) =>  {
    const userEmail = useSelector(selectEmail)
    // console.log(userEmail);

if(userEmail === "vishwajeetkumar0766@gmail.com") {
    return children;
}
return (
    <section>
        <div className='container'>
        <h2>Permission Denied</h2>
        <p>This page can only be view by an Admin User</p>
        <br />
        <Link to="/">
        <button className='btn-2'>Back To Home</button>
        </Link>
        </div>
    </section>
)
}
export const AdminOnlyLink = ({children}) =>  {
    const userEmail = useSelector(selectEmail)
    // console.log(userEmail);

if(userEmail === "vishwajeetkumar0766@gmail.com") {
    return children;
}
return null;
}

export default AdminOnlyRoute