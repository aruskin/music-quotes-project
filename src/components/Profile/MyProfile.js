import React, {useState} from "react";
import userService from '../../services/user-service';

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

function MyProfile(whoseProfile){
    if(whoseProfile.user.username){
        return(
            <div>
                <h2 className="mt-2">Manage Account</h2>
                <ResetPassword/>
                {whoseProfile.user.role !== 'DEFAULT' ?
                    <><h2 className="mt-2">Just for you</h2>
                    {whoseProfile.user.role === 'ADMIN' && whoseProfile.user.adminContact ?
                    <div>Your email: {whoseProfile.user.adminContact}</div>
                    : ''}
                    {whoseProfile.user.role === 'BANNED' && whoseProfile.user.banReason ?
                    <div>You were banned for: {whoseProfile.user.banReason}</div>
                     : ''}</>
                : ''}
            </div>
            )
    }else{
        return(null)
    }

}

export default MyProfile;