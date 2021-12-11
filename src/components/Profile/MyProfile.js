import React, {useState} from "react";
import userService from '../../services/user-service';
import {useSelector} from "react-redux";

function ResetPassword(){
    const [password, setPassword] = useState({newPassword: '', validatePassword: ''});
    function handlePasswordReset(event){
        event.preventDefault();
        if(password.newPassword === ''){
            alert("You must enter a new password");
        } else if(password.newPassword !== password.validatePassword){
            alert("Your passwords do not match");
        } else{
            userService.resetPassword(password.newPassword);
            alert("Password reset!");
        }
    }

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

function MyProfile(){
    const user = useSelector((state) => state.user);
    return(
    <div>
        <h1>My Profile</h1>
        <p>Hello, {user.username}, this is your profile page!</p>
        <ResetPassword/>
    </div>
    )
}

export default MyProfile;