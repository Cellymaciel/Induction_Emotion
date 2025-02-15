import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "@/app/home";
import Neutral from "@/app/neutral";
import Sad from "@/app/sad";

const Tab = createBottomTabNavigator();

export function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="sad" component={Sad} />
            <Tab.Screen name="neutral" component={Neutral} />
        </Tab.Navigator>
    );
}