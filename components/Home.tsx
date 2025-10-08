import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Food from "./Food";
import Form from "./Form";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const foodName = (name: string) => {
    setSearch(name);
  };

  return (
    <View style={styles.container}>
      <Form foodName={foodName} />
      <Food name={search} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313234ff",
  },
});
