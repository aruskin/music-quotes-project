import React from "react";
import NavigationSidebar from "../NavigationSidebar";

function PrivacyPolicy({loggedIn=false}){
    return(
        <div className="row mt-2">
            <div className="col-2">
                <NavigationSidebar active="privacy" loggedIn={loggedIn}/>
            </div>
            <div className="col-10">
                <h1>Privacy Policy</h1>
                <h2>Project requirements</h2>
                <ol>
                    <li style={{background: 'yellow'}}>Must be made available to your users when they first visit your website.</li>
                    <li style={{background: 'yellow'}}>Must be easily available for subsequent review.</li>
                    <li style={{background: 'yellow'}}>Must not employ any “dark patterns” for attaining user consent.</li>
                </ol>
            </div>
        </div>
    )
};

export default PrivacyPolicy;