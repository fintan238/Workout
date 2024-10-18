import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { restoreToken } from '../features/auth';
import { setUser } from '../features/user';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import MyBottomTab from './MyBottomTab';
import AuthStack from './AuthStack';
import Splash from '../screens/Splash';

export default function Wrapper() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

function Navigator() {
  const { userToken } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async user => {
      if (user) {
        const userToSave = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          createdAt: user.metadata.creationTime,
        };
        dispatch(restoreToken(user.email));
        dispatch(setUser(userToSave));
      } else {
        dispatch(restoreToken(null));
      }
      setIsLoading(false);
    });
    return unsubscribeAuth;
  }, []);

  // Show splash screen while loading
  if (isLoading) {
    return <Splash />;
  }

  return <>{userToken ? <MyBottomTab /> : <AuthStack />}</>;
}
