import React, {useState} from "react";

function ResetPassword(){
    const [password, setPassword] = useState({newPassword: '', validatePassword: ''});
    function handlePasswordReset(event){}

    return(
        <form>
            <div className="form-group">
                <label htmlFor="new-password">Enter new password</label>
                <input
                    value={password.newPassword}
                    onChange={(e) => setPassword({...password, newPassword: e.target.value})}
                    className="form-control"
                    placeholder="password"
                    type="password"
                    id="new-password"/>
                <label htmlFor="validate-password">Re-enter new password</label>
                <input
                    value={password.validatePassword}
                    onChange={(e) => setPassword({...password, validatePassword: e.target.value})}
                    className="form-control"
                    placeholder="password"
                    type="password"
                    id="validate-password"/>
            </div>
            <button onClick={handlePasswordReset}
                    className="btn btn-primary mt-2">
                    Reset Password
            </button>
        </form>
    )
}

function MyProfile({user}){
    return(
    <div>
        <h1>My Profile</h1>
        <p>Hello, {user.username}, this is your profile page!</p>
        <ResetPassword/>
    </div>
    )
}

export default MyProfile;