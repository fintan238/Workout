import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack";
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileScreen from "../screens/ProfileScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import HistoryScreen from "../screens/HistoryScreen";
import CurrentWorkoutModal from "../screens/CurrentWorkoutModal";
import AddExerciseModal from "../screens/AddExerciseModal";

// Stack
const WorkoutStack = createStackNavigator();
function WorkoutStackGroup() {
  return (
    <WorkoutStack.Navigator screenOptions={{ headerShown: false }}>
      <WorkoutStack.Screen name="Workout" component={WorkoutScreen} />
      <WorkoutStack.Screen name="CurrentWorkoutModal" component={CurrentWorkoutModal} />
      <WorkoutStack.Screen name="AddExerciseModal" component={AddExerciseModal} />
    </WorkoutStack.Navigator>
  );
}

// Tab Bottom
const MyTab = createBottomTabNavigator();
export default function MyBottomTab() {
  return (
    <MyTab.Navigator
    screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === "Profile") {
            iconName = "user";
          } else if (route.name === "WorkoutStackGroup") {
            iconName = "plus";
          } else if (route.name === "History") {
            iconName = "clockcircleo";
          }
          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#89CFF0",
      })}
    >
      <MyTab.Screen name="Profile" component={ProfileScreen} />
      <MyTab.Screen name="WorkoutStackGroup" component={WorkoutStackGroup}
        options={{ headerShown: false, tabBarLabel: "Workout" }}
      />
      <MyTab.Screen name="History" component={HistoryScreen} />
    </MyTab.Navigator>
  );
}
