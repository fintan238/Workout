// facebookSignInConfig.js
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

export const facebookSignIn = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    return auth.signInWithCredential(facebookCredential);
  } catch (error) {
    console.error(error);
  }
};