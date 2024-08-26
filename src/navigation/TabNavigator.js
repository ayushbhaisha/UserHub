import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/appScreen/HomeScreen";
import DashboardScreen from "../screens/appScreen/DashboardScreen";
import ContactFormScreen from "../screens/appScreen/ContactFormScreen";
import ProfileScreen from "../screens/appScreen/ProfileScreen";
import UserSignupListScreen from "../screens/appScreen/UserSignupListScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowIcon: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#6200ee',
                tabBarInactiveTintColor: '#888',
                tabBarIcon: () => null,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
                tabBarItemStyle: {
                    paddingBottom: 15,
                    maxWidth: 100,
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Home'
                }}
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