import axios from 'axios';
import {GoogleLogin} from 'react-google-login';

function GoogleCalendar() {
    const responseGoogle = response => {
        const { code } = response;
        axios.post('http://localhost:8080/petbay/api/v1/reminders/create-tokens/', {code})
        .then(response => {
            console.log(response.data)
        })
        .catch(error => console.log(error))
    }

    const responseError = () => {

    }
    return (
        <div>
            <div className="Calendare">
                <h1>Add your reminder to Google Calendar</h1>
            </div>
            <div>
                <GoogleLogin clientId='1098307464443-f77re9crnoghbgt3bjf1mfvravtue0bj.apps.googleusercontent.com'
                buttonText='Sign in with Google'
                onSuccess={responseGoogle}
                onFailure={responseError}
                cookiePolicy={'single_host_origin'}
                responseType='code'
                accessType='offline'
                scope='openid email profile https://www.googleapis.com/auth/calendar'/>
            </div>
        </div>
    )
}

export default GoogleCalendar;