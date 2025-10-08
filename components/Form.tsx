import theme from "@/constants/theme";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type PropType = {
  foodName(name: string): void;
};

export default function Form(prop: PropType) {
  const [name, setName] = useState<string>("");

  const handleSubmit = () => {
    if (name.trim()) {
      prop.foodName(name.trim());
      setName("");
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Procure sua comida preferida</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Pizza, Lasagna..."
        placeholderTextColor={theme.colors.placeholder}
        value={name}
        onChangeText={setName}
        onSubmitEditing={handleSubmit}
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Buscar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: theme.spacing.large,
    width: "100%",
  },
  title: {
    fontSize: theme.fontSizes.xlarge,
    color: theme.colors.textPrimary,
    textAlign: "center",
    marginBottom: theme.spacing.large,
    textTransform: "capitalize",
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.spacing.small,
    padding: theme.spacing.medium,
    fontSize: theme.fontSizes.medium,
    marginBottom: theme.spacing.large,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: theme.fontSizes.medium,
  },
});
