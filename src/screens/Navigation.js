import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack";
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileScreen from "./ProfileScreen";
import WorkoutScreen from "./WorkoutScreen";
import HistoryScreen from "./HistoryScreen";
import CurrentWorkoutModal from "./CurrentWorkoutModal";
import AddExerciseModal from "./AddExerciseModal";

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
const Tab = createBottomTabNavigator();
function TabGroup() {
    return (
        <Tab.Navigator
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
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="WorkoutStackGroup" component={WorkoutStackGroup}
                options={{ headerShown: false, tabBarLabel: "Workout" }}
            />
            <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <TabGroup />
        </NavigationContainer>
    );
}