import theme from "@/constants/theme";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { LoginIcon } from "./LoginIcon";

export default function RootLayout() {
  const router = useRouter();

  return (
    <ActionSheetProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.surface },

          headerTintColor: theme.colors.primary,
          headerTitleStyle: {
            color: theme.colors.textPrimary,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Meal Work",
            headerRight: () => (
              <Pressable
                onPress={() => router.push("/login")}
                style={{ marginRight: theme.spacing.medium }}
              >
                <LoginIcon color={theme.colors.primary} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen name="login" options={{ title: "Acessar Conta" }} />
      </Stack>
    </ActionSheetProvider>
  );
}
