import Home from "@/components/Home";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function index() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
});
