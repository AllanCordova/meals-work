import theme from "@/constants/theme";
import { Stack } from "expo-router";
import React from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen
        options={{
          title: "Acessar Conta",
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.primary,
        }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo de volta!</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>

        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor={theme.colors.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          placeholderTextColor={theme.colors.placeholder}
          secureTextEntry
        />

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: theme.spacing.large,
  },
  title: {
    fontSize: theme.fontSizes.xlarge,
    color: theme.colors.textPrimary,
    textAlign: "center",
    marginBottom: theme.spacing.small,
  },
  subtitle: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginBottom: theme.spacing.xlarge,
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.spacing.small,
    padding: theme.spacing.medium,
    fontSize: theme.fontSizes.medium,
    marginBottom: theme.spacing.medium,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    alignItems: "center",
    marginTop: theme.spacing.small,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: theme.fontSizes.medium,
  },
});
