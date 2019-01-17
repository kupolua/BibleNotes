import axios from 'axios';
import { Auth } from 'aws-amplify';

export const PUT_PRESENTER = 'PUT_PRESENTER';

export function putPresenterAction (presenter) {
    const AuthToken = Auth.user.signInUserSession.idToken.jwtToken;
    console.log(presenter);
    let response = new Promise(function(resolve, reject) {
        resolve(axios.put(
            'https://hyqpo1v4pf.execute-api.us-east-1.amazonaws.com/putPresenter',
            presenter,
            {headers: {'Content-Type': 'application/json', 'Authorization': AuthToken}}
        ));
    });

    return dispatch => {
        response.then(result => {
            console.log('result', result);
            dispatch({
                type: PUT_PRESENTER,
                payload: 'OK'
            });
        });
    };
}
