
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const emptyValues: FormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const emptyErrors: FormErrors = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterScreen() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>(emptyErrors);

  function validate(form: FormValues): FormErrors {
    const next: FormErrors = { ...emptyErrors };

    if (!form.name.trim()) {
      next.name = 'Full name is required.';
    } else if (form.name.trim().length < 3) {
      next.name = 'Name must be at least 3 characters.';
    }

    const email = form.email.trim();
    const at = email.indexOf('@');

    if (!email) {
      next.email = 'Email address is required.';
    } else if (
      at < 1 ||
      email.indexOf('.', at + 1) === -1
    ) {
      next.email = 'Enter a valid email with @ and a full stop after it.';
    }

    if (!form.password) {
      next.password = 'Password is required.';
    } else if (form.password.length < 8) {
      next.password = 'Password must be at least 8 characters.';
    }

    if (!form.confirmPassword) {
      next.confirmPassword = 'Please confirm your password.';
    } else if (form.password !== form.confirmPassword) {
      next.confirmPassword = 'Passwords do not match.';
    }

    return next;
  }

  const currentErrors = validate(values);
  const isValid = Object.values(currentErrors).every(
    (message) => message === ''
  );

  function updateField(field: keyof FormValues, value: string) {
    const updated = { ...values, [field]: value };
    setValues(updated);
    setErrors(validate(updated));
  }

  function handleSubmit() {
    const result = validate(values);
    setErrors(result);

    if (Object.values(result).some((message) => message !== '')) {
      return;
    }

    Alert.alert(
      'Registration Successful',
      `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}`
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Complete all fields to register.
        </Text>

        <Text style={styles.label}>Full name</Text>
        <TextInput
          style={[styles.input, errors.name ? styles.invalid : null]}
          value={values.name}
          onChangeText={(text) => updateField('name', text)}
          placeholder="Enter your full name"
          autoCapitalize="words"
        />
        {errors.name !== '' && (
          <Text style={styles.error}>{errors.name}</Text>
        )}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, errors.email ? styles.invalid : null]}
          value={values.email}
          onChangeText={(text) => updateField('email', text)}
          placeholder="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.email !== '' && (
          <Text style={styles.error}>{errors.email}</Text>
        )}

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, errors.password ? styles.invalid : null]}
          value={values.password}
          onChangeText={(text) => updateField('password', text)}
          placeholder="At least 8 characters"
          secureTextEntry
          autoCapitalize="none"
        />
        {errors.password !== '' && (
          <Text style={styles.error}>{errors.password}</Text>
        )}

        <Text style={styles.label}>Confirm password</Text>
        <TextInput
          style={[
            styles.input,
            errors.confirmPassword ? styles.invalid : null,
          ]}
          value={values.confirmPassword}
          onChangeText={(text) =>
            updateField('confirmPassword', text)
          }
          placeholder="Re-enter password"
          secureTextEntry
          autoCapitalize="none"
        />
        {errors.confirmPassword !== '' && (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        )}

        <Pressable
          style={[styles.button, !isValid && styles.disabledButton]}
          disabled={!isValid}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F3864',
    marginBottom: 6,
  },
  subtitle: {
    color: '#666666',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  invalid: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#1F3864',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  disabledButton: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
