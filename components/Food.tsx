import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type PropType = {
  name: string;
};

export default function Food(prop: PropType) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      if (!prop.name) {
        setMeals([]);
        return;
      }

      setLoading(true);
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${prop.name}`;

      try {
        const response = await fetch(url);
        const result = await response.json();

        setMeals(result.meals || []);
      } catch (error) {
        console.error(error);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [prop.name]);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#007AFF" style={styles.centered} />
    );
  }

  if (meals.length === 0 && prop.name) {
    return (
      <View style={styles.centered}>
        <Text>Nenhum resultado encontrado para "{prop.name}"</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => {
              router.push(`/meals/${item.idMeal}`);
            }}
          >
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.thumbnail}
            />
            <Text style={styles.itemText}>{item.strMeal}</Text>
          </Pressable>
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  list: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#FFF",
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  itemText: {
    fontSize: 18,
    flex: 1,
  },
});
