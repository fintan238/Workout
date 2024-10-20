import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { Button } from 'react-native';
import { auth } from '../../firebaseConfig';
import { FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { ResponseType } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function FacebookSignInButton() {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: '563225649384232',
    redirectUri: 'https://auth.expo.io/@fintan238/workout',
  });

  React.useEffect(() => {
    if (response) {
      console.log('Response:', response);
      if (response.type === 'success') {
        const { access_token } = response.params;
        const credential = FacebookAuthProvider.credential(access_token);
        signInWithCredential(auth, credential)
          .then(() => {
            console.log('Facebook Sign-In Successful!');
          })
          .catch((error) => {
            console.error('Error signing in with Facebook: ', error);
          });
      }
    }
  }, [response]);

  return (
    <Button
      title="Sign In with Facebook"
      disabled={!request}
      onPress={() => promptAsync()}
    />
  );
}