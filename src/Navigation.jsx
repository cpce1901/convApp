import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Messages from "./pages/stackMessages/Messages";
import DetailMessage from "./pages/stackMessages/DetailMessage";
import Notification from "./pages/stackSettings/Notifications";
import Utills from "./pages/stackUtills/Capacitor";
import { Color } from "./utills/Colors";

const Stack = createNativeStackNavigator();

function StackGroup() {
    return (
        <Stack.Navigator>
            <Stack.Screen component={Messages} name="Messages" options={{ headerShown: false }} />
            <Stack.Screen component={DetailMessage} name="DetailMessage" options={{
                presentation: "modal",
                headerShown: false,
            }} />
            <Stack.Screen component={Notification} name="Notifications" options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const StackSettings = createNativeStackNavigator();

function StackSettingsGroup() {
    return (
        <StackSettings.Navigator>
            <StackSettings.Screen component={Notification} name="Notifications" options={{ headerShown: false }} />
        </StackSettings.Navigator>
    )
}


const Stackutills = createNativeStackNavigator();

function StackUtillsGroup() {
    return (
        <Stackutills.Navigator>
            <Stackutills.Screen component={Utills} name="utills" options={{ headerShown: false }} />
        </Stackutills.Navigator>
    )
}


const Tabs = createBottomTabNavigator();

function TabsGroup() {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                headerShown :false,
                tabBarIcon: ({ color, focused, size }) => {
                    let iconName;
                    color = Color.fourth
                    if (route.name === "stackMessages") {
                        iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline";
                    }
                    else if (route.name === "stackSettings") {
                        iconName = focused ? "settings" : "settings-outline";
                    }
                    else if (route.name === "stackUtills") {
                        iconName = focused ? "build" : "build-outline";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />
                }
            
            })}>
            <Tabs.Screen component={StackGroup} name="stackMessages"/>
            <Tabs.Screen component={StackUtillsGroup} name="stackUtills" />
            <Tabs.Screen component={StackSettingsGroup} name="stackSettings" />
        </Tabs.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <TabsGroup />
        </NavigationContainer>
    );
}