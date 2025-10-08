import theme from "@/constants/theme";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StatusBar,
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
  strIngredient3: string;
  strMeasure3: string;
  strIngredient4: string;
  strMeasure4: string;
  strIngredient5: string;
  strMeasure5: string;
  strIngredient6: string;
  strMeasure6: string;
  strIngredient7: string;
  strMeasure7: string;
  strIngredient8: string;
  strMeasure8: string;
  strIngredient9: string;
  strMeasure9: string;
  strIngredient10: string;
  strMeasure10: string;
  strIngredient11: string;
  strMeasure11: string;
  strIngredient12: string;
  strMeasure12: string;
  strIngredient13: string;
  strMeasure13: string;
  strIngredient14: string;
  strMeasure14: string;
  strIngredient15: string;
  strMeasure15: string;
  strIngredient16: string;
  strMeasure16: string;
  strIngredient17: string;
  strMeasure17: string;
  strIngredient18: string;
  strMeasure18: string;
  strIngredient19: string;
  strMeasure19: string;
  strIngredient20: string;
  strMeasure20: string;
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

  const handleOpenYoutube = () => {
    if (mealDetails?.strYoutube) {
      Linking.openURL(mealDetails.strYoutube).catch((err) =>
        console.error("Não foi possível abrir o link", err)
      );
    }
  };

  const getIngredients = () => {
    if (!mealDetails) return [];
    const ingredients: { ingredient: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = mealDetails[`strIngredient${i}` as keyof DetailedMeal];
      const measure = mealDetails[`strMeasure${i}` as keyof DetailedMeal];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : "",
        });
      }
    }
    return ingredients;
  };
  const ingredientsList = getIngredients();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.messageText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (!mealDetails) {
    return (
      <View style={styles.centered}>
        <Text style={styles.messageText}>Refeição não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ title: mealDetails.strMeal }} />
      <ScrollView>
        <Image
          source={{ uri: mealDetails.strMealThumb }}
          style={styles.mealImage}
        />
        <View style={styles.content}>
          <Text style={styles.mealTitle}>{mealDetails.strMeal}</Text>
          <Text style={styles.mealCategory}>
            {mealDetails.strCategory} | {mealDetails.strArea}
          </Text>

          <Text style={styles.sectionTitle}>Ingredientes</Text>
          {ingredientsList.map((item, index) => (
            <Text key={index} style={styles.ingredientItem}>
              • {item.measure} {item.ingredient}
            </Text>
          ))}

          <Text style={styles.sectionTitle}>Instruções</Text>
          <Text style={styles.instructionsText}>
            {mealDetails.strInstructions}
          </Text>

          {mealDetails.strYoutube && (
            <Pressable onPress={handleOpenYoutube}>
              <Text style={styles.youtubeLink}>Ver vídeo no YouTube</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.large,
  },
  messageText: {
    marginTop: theme.spacing.medium,
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textSecondary,
  },
  mealImage: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: theme.spacing.large,
  },
  mealTitle: {
    fontSize: 28,
    marginBottom: theme.spacing.small,
    color: theme.colors.textPrimary,
  },
  mealCategory: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.large,
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: theme.fontSizes.large,
    marginTop: theme.spacing.large,
    marginBottom: theme.spacing.medium,
    color: theme.colors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.spacing.small,
  },
  ingredientItem: {
    fontSize: theme.fontSizes.medium,
    marginBottom: theme.spacing.small,
    color: theme.colors.textPrimary,
  },
  instructionsText: {
    fontSize: theme.fontSizes.medium,
    lineHeight: 24,
    color: theme.colors.textPrimary,
  },
  youtubeLink: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.primary,
    marginTop: theme.spacing.large,
  },
});
