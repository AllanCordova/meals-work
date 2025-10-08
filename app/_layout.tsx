import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { LoginIcon } from "./LoginIcon";

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1C1C1E" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Meal Work",
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/login")}
              style={{ marginRight: 15 }}
            >
              <LoginIcon color="#fff" />
            </Pressable>
          ),
        }}
      />
      {/* ... Suas outras telas ... */}
      <Stack.Screen name="login" options={{ title: "Acessar Conta" }} />
      <Stack.Screen name="meals/[id]" />
    </Stack>
  );
}
