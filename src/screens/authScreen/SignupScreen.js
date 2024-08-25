import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, createUserWithEmailAndPassword } from '../../services/firebase';
import { insertUser } from '../../services/database';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            insertUser(email, name, new Date().toISOString())
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Signup Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Sign Up" onPress={handleSignup} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    input: { height: 40, borderColor: 'gray', borderBottomWidth: 1, marginBottom: 16 },
});

export default SignupScreen;
