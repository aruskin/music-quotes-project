import React from "react";
import NavigationSidebar from "../NavigationSidebar";

function PrivacyPolicy(){
    return(
        <div className="row mt-2">
            <div className="col-2">
                <NavigationSidebar active="privacy"/>
            </div>
            <div className="col-10">
                <h1>Privacy Policy</h1>
                <h3>What We Collect</h3>
                <h4>Information You Provide</h4>
                <p>Account information: We only ask (non-admin) users to provide a username and password. Your username will be public.</p>
                <p>Submissions: We collect the quotes that you submit and associate them with your account.</p>
                <h4>Information We Collect Automatically</h4>
                <p>We keep a record of when your account was created and when you submitted quotes and make those public.</p>
                <h3>Why Are We Collecting This Information</h3>
                <p>We require users to register to submit quotes in order to discourage vandalism. We keep track of the date your account was created and the quotes you've submitted to help us weed out bad actors.</p>
                <h3>Who Will Have Access to This Information</h3>
                <p>Your username, account creation date, role, and submitted quotes will be visible to all users of the site. The database administrator will have access to your passwords.</p>
                <h3>How Are We Protecting and Storing the Information</h3>
                <p>All the user information we collect is stored in a MongoDB database. Sensitive information will not be encrypted. While some of this information is accessible via a web API, your password should only be accessible to you and the database administrator.</p>
                <h3>What Control Do You Have Over Your Data</h3>
                <p>You can change your password whenever you want. At the moment, you cannot change your username or delete your account or submitted quotes. Only administrators may delete submitted quotes.</p>
            </div>
        </div>
    )
};

export default PrivacyPolicy;