import theme from "@/constants/theme";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Food from "./Food";
import Form from "./Form";

export default function Home() {
  const [search, setSearch] = useState<string>("");

  const foodName = (name: string) => {
    setSearch(name);
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <Form foodName={foodName} />
        <View style={{ flex: 1, width: "100%" }}>
          <Food name={search} onClearSearch={clearSearch} />
        </View>
      </View>
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
  },
});
