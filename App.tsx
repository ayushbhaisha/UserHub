import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { createTables } from './src/services/database';
import LoginScreen from './src/screens/authScreen/LoginScreen';
import SignupScreen from './src/screens/authScreen/SignupScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigator from './src/navigation/TabNavigator';

const Stack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user: any) => {
      if (user) {
        AsyncStorage.setItem("loggedUser", JSON.stringify(user.email))
        setUser(user);
      } else {
        setUser(null)
      }
      if (initializing) setInitializing(false);
    });

    createTables();
    return () => unsubscribe();
  }, []);

  if (initializing) {
    return (
      <View style={styles.container}>
        <Text>UserHub...</Text>
        <ActivityIndicator size={'small'} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {user ? (
        <TabNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row"
  },
});

export default App;
