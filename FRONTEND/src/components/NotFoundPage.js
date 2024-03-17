import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function NotFoundPage(){
    return(
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <img src="https://cdn.acowebs.com/wp-content/uploads/2023/10/3acwebs-1.jpg" alt="Not Found" className="img-fluid" />
            <p className="display-4 mt-1 text-center text-danger">Wrong URL....</p>
        </div>
    )
}
export default NotFoundPage;
