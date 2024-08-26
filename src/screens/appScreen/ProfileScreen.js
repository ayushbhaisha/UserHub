import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { getUser, updateUser } from '../../services/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dateFormat } from '../../utils/dateFormat';
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");

  const handleUpdateName = async () => {
    if (!name) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    updateUser(user.email, name);
    await getUserData();
    setIsEditing(false);
    Alert.alert('Success', 'Name updated successfully');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const getUserData = async () => {
    try {
      const email = await AsyncStorage.getItem("loggedUser");
      const userData = await getUser(JSON.parse(email));
      setUser(userData[0]);
      setName(userData[0].name);
    } catch (err) {
      console.log("err", err)
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {user &&
        <View>
          <View style={styles.profileContainer}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>

            <Text style={styles.label}>User ID:</Text>
            <Text style={styles.value}>{user.id}</Text>

            <Text style={styles.label}>Join Date:</Text>
            <Text style={styles.value}>{dateFormat(user.joinDate)}</Text>

            <Text style={styles.label}>Name:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter new name"
              />
            ) : (
              <Text style={styles.value}>{user.name}</Text>
            )}

            {isEditing ? (
              <TouchableOpacity style={styles.button} onPress={handleUpdateName}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleEdit}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={{ ...styles.button, marginTop: 20 }} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  profileContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;