import axios from 'axios';
import { Auth } from 'aws-amplify';

export const GET_PRESENTER = 'GET_PRESENTER';

export function getPresenterAction () {
    const AuthToken = Auth.user.signInUserSession.idToken.jwtToken;
    let response = new Promise(function(resolve, reject) {
        resolve(axios.get(
            'https://hyqpo1v4pf.execute-api.us-east-1.amazonaws.com/getPresenters/presenters',
            {headers: {'Content-Type': 'application/json', 'Authorization': AuthToken}}
        ));
    });

    return dispatch => {
        response.then(result => {
            dispatch({
                type: GET_PRESENTER,
                payload: {presenters: JSON.parse(result.data.presenters)}
            });
        });
    };
}
