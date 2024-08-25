import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../appScreen/HomeScreen";
import DashboardScreen from "../appScreen/DashboardScreen";
import ContactFormScreen from "../appScreen/ContactFormScreen";
import ProfileScreen from "../appScreen/ProfileScreen";
import UserSignupListScreen from "../appScreen/UserSignupListScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: true,
                tabBarIcon: () => null,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Home' }}
            />
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ title: 'Dashboard' }}
            />
            <Tab.Screen
                name="Contact Form"
                component={ContactFormScreen}
                options={{ title: 'Contact Form' }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profile' }}
            />
            <Tab.Screen
                name="User Signup List"
                component={UserSignupListScreen}
                options={{ title: 'Signup List' }}
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;