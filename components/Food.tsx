import theme from "@/constants/theme";
import { useActionSheet } from "@expo/react-native-action-sheet";
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
  onClearSearch(): void;
};

export default function Food(prop: PropType) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showActionSheetWithOptions } = useActionSheet();

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

  const handleRemoveMeal = (mealId: string) => {
    setMeals((currentMeals) =>
      currentMeals.filter((meal) => meal.idMeal !== mealId)
    );
  };

  const onOpenActionSheet = (meal: Meal) => {
    const options = [
      "Ver Detalhes",
      "Adicionar aos Favoritos",
      "Remover",
      "Cancelar",
    ];
    const cancelButtonIndex = 3;
    const destructiveButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        // ANOTAÇÃO 2: Estilizando o ActionSheet para o tema escuro.
        // Isso deixa a aparência nativa consistente com o resto do app.
        containerStyle: { backgroundColor: theme.colors.surface },
        textStyle: { color: theme.colors.textPrimary },
        cancelButtonTintColor: theme.colors.textSecondary,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            router.push(`/meals/${meal.idMeal}`);
            break;
          case 1:
            // Futuramente, podemos trocar este alert por um componente de Toast/Snackbar.
            alert(`"${meal.strMeal}" adicionado aos favoritos!`);
            break;
          case 2:
            handleRemoveMeal(meal.idMeal);
            break;
          case cancelButtonIndex:
            // Ação de cancelar
            break;
        }
      }
    );
  };

  if (loading) {
    return (
      // ANOTAÇÃO 3: Usando a cor primária do tema no indicador de loading.
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        style={styles.centered}
      />
    );
  }

  if (meals.length === 0 && prop.name) {
    return (
      <View style={styles.centered}>
        <Text style={styles.messageText}>
          Nenhum resultado encontrado para "{prop.name}"
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.idMeal}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Pressable
            style={styles.mainAction}
            onPress={() => router.push(`/meals/${item.idMeal}`)}
          >
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.thumbnail}
            />
            <Text style={styles.itemText}>{item.strMeal}</Text>
          </Pressable>

          <Pressable
            style={styles.moreButton}
            onPress={() => onOpenActionSheet(item)}
          >
            <Text style={styles.moreButtonText}>•••</Text>
          </Pressable>
        </View>
      )}
      ListFooterComponent={() =>
        meals.length > 0 ? (
          <Pressable style={styles.clearButton} onPress={prop.onClearSearch}>
            <Text style={styles.clearButtonText}>Limpar Pesquisa</Text>
          </Pressable>
        ) : null
      }
      style={styles.list}
      contentContainerStyle={{ paddingBottom: theme.spacing.large }} // Garante um espaço no final da lista
    />
  );
}

// ANOTAÇÃO 5: Toda a folha de estilos agora usa as variáveis do nosso tema.
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.small,
    paddingLeft: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  mainAction: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  moreButton: {
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
  },
  moreButtonText: {
    fontSize: theme.fontSizes.xlarge,
    color: theme.colors.textSecondary,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
  },
  messageText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.medium,
    textAlign: "center",
  },
  list: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: theme.spacing.small,
    marginRight: theme.spacing.medium,
  },
  itemText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  clearButton: {
    margin: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.spacing.small,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  clearButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.medium,
  },
});
