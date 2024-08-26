import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { getUsers } from '../../services/database';
import { dateFormat } from '../../utils/dateFormat';
import { useIsFocused } from '@react-navigation/native';

const UserSignupScreen = () => {
  const focus = useIsFocused();
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const results = await getUsers();
    setUsers(results);
  }

  useEffect(() => {
    if (focus) {
      fetchUsers();
    }
  }, [focus]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{item.email}</Text>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{item.name}</Text>
      <Text style={styles.label}>Joining Date:</Text>
      <Text style={styles.value}>{dateFormat(item.joinDate)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>List of all users signup in this device</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No users found.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  itemContainer: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
});

export default UserSignupScreen;