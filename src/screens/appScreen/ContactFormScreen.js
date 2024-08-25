import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ContactFormScreen = () => {
  const handleSubmit = (values, {resetForm}) => {
    console.log('Form values:', values);
    resetForm();
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ name: '', email: '', message: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          email: Yup.string().email('Invalid email address').required('Email is required'),
          message: Yup.string().required('Message is required'),
        })}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              placeholder="Name"
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

            <TextInput
              placeholder="Message"
              style={[styles.input, styles.textArea]}
              onChangeText={handleChange('message')}
              onBlur={handleBlur('message')}
              value={values.message}
              multiline
            />
            {touched.message && errors.message ? <Text style={styles.error}>{errors.message}</Text> : null}

            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ContactFormScreen;
