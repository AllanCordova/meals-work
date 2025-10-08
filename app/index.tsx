import Home from "@/components/Home";
import theme from "@/constants/theme";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
