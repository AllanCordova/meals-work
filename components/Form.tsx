import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type PropType = {
  foodName(name: string): void;
};

export default function Form(prop: PropType) {
  const [name, setName] = useState<string>("");

  const handleSubmit = () => {
    prop.foodName(name);
    setName("");
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>search your prefer food</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Pizza, Lasagna..."
        placeholderTextColor="#8E8E93"
        value={name}
        onChangeText={setName}
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Buscar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1C1C1E",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#4A4A4A",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
