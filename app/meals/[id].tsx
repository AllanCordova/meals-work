import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type DetailedMeal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  strIngredient1: string;
  strMeasure1: string;
  strIngredient2: string;
  strMeasure2: string;
};

export default function MealDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [mealDetails, setMealDetails] = useState<DetailedMeal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMealDetails() {
      if (!id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        setMealDetails(result.meals ? result.meals[0] : null);
      } catch (error) {
        console.error("Erro ao buscar detalhes da refeição:", error);
        setMealDetails(null);
      } finally {
        setLoading(false);
      }
    }

    fetchMealDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>
          Carregando detalhes da refeição...
        </Text>
      </View>
    );
  }

  if (!mealDetails) {
    return (
      <View style={styles.centered}>
        <Text>Detalhes da refeição não encontrados ou houve um erro.</Text>
      </View>
    );
  }

  const getIngredients = () => {
    const ingredients: { ingredient: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = mealDetails[`strIngredient${i}` as keyof DetailedMeal];
      const measure = mealDetails[`strMeasure${i}` as keyof DetailedMeal];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : "",
        });
      }
    }
    return ingredients;
  };

  const ingredientsList = getIngredients();

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{ title: `${mealDetails.strMeal}` }}
      ></Stack.Screen>
      {mealDetails.strMealThumb && (
        <Image
          source={{ uri: mealDetails.strMealThumb }}
          style={styles.mealImage}
        />
      )}
      <View style={styles.content}>
        <Text style={styles.mealTitle}>{mealDetails.strMeal}</Text>
        <Text style={styles.mealCategory}>
          Categoria: {mealDetails.strCategory} | Área: {mealDetails.strArea}
        </Text>

        <Text style={styles.sectionTitle}>Ingredientes:</Text>
        {ingredientsList.length > 0 ? (
          <View>
            {ingredientsList.map((item, index) => (
              <Text key={index} style={styles.ingredientItem}>
                • {item.measure} {item.ingredient}
              </Text>
            ))}
          </View>
        ) : (
          <Text style={styles.ingredientItem}>Nenhum ingrediente listado.</Text>
        )}

        <Text style={styles.sectionTitle}>Instruções:</Text>
        <Text style={styles.instructionsText}>
          {mealDetails.strInstructions}
        </Text>

        {mealDetails.strYoutube && (
          <Text style={styles.youtubeLink} onPress={() => {}}>
            Ver vídeo no YouTube
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F4F8",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  mealImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  content: {
    padding: 20,
  },
  mealTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  mealCategory: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  ingredientItem: {
    fontSize: 16,
    marginBottom: 5,
    color: "#444",
  },
  instructionsText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  youtubeLink: {
    fontSize: 16,
    color: "#007AFF",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});
