

import Header from '../components/Header';
import { Link } from 'react-router';
function Page_404() {


    return (
        <>
           
            <div>
                <h1>404 Page not Found</h1>
                <Link to="/">Go Back</Link>
            </div>
        </>
    )
}

export default Page_404;