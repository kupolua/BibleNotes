import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';
import VersesList from '../Bible';

Auth.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:5a8e8b96-3736-4577-a1cb-a7f109c008ae',
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_wMuuEKI4z',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '1v8gtbj914scjmkjpdfdkbve2b',
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
    // OPTIONAL - Configuration for cookie storage
    cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      domain: '.localhost',
      // OPTIONAL - Cookie path
      path: '/',
      // OPTIONAL - Cookie expiration in days
      expires: 365,
      // OPTIONAL - Cookie secure flag
      secure: true
    }
  }
});

class Notes extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        WeekNotesList component
        <VersesList />
      </div>
    )
  }
}

// export default App;
export default withAuthenticator(Notes);
// export default connect(mapStateToProps, mapDispatchToProps)(process.env.REACT_APP_MODE === 'autologin' ? App : withAuthenticator(App));
