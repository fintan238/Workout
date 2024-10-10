// // App.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import ProfileScreen from './src/screens/ProfileScreen';
// import WorkoutScreen from './src/screens/WorkoutScreen';
// import HistoryScreen from './src/screens/HistoryScreen';
// import { googleSignIn, facebookSignIn, signUpWithEmail, signInWithEmail, signOut } from './src/auth';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;

//             if (route.name === 'Profile') {
//               iconName = 'user';
//             } else if (route.name === 'Workout') {
//               iconName = 'plus';
//             } else if (route.name === 'History') {
//               iconName = 'history';
//             }

//             return <FontAwesome name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: 'tomato',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//         <Tab.Screen name="Workout" component={WorkoutScreen} />
//         <Tab.Screen name="History" component={HistoryScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// // });

// App.js
import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}

export default App;