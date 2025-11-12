import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const { t, language, setLanguage } = useLanguage();
  const { colors, themeMode, setThemeMode } = useTheme();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("currentUser");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (userData.name) setUserName(userData.name);
        }
      } catch (err) {
        console.error("Lỗi khi đọc user:", err);
      }
    };
    getUser();
  }, []);

  const showLanguageOptions = () => {
    Alert.alert(t("home.selectLanguage"), "", [
      { text: "English", onPress: () => setLanguage("en") },
      { text: "Tiếng Việt", onPress: () => setLanguage("vi") },
      { text: "한국어", onPress: () => setLanguage("ko") },
      { text: "日本語", onPress: () => setLanguage("ja") },
      { text: "中文", onPress: () => setLanguage("zh") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const showThemeOptions = () => {
    Alert.alert(t("home.selectTheme"), "", [
      { text: t("home.light"), onPress: () => setThemeMode("light") },
      { text: t("home.dark"), onPress: () => setThemeMode("dark") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {t("home.title")}
          </Text>
          <Text
            style={[styles.headerSubtitle, { color: colors.textSecondary }]}
          >
            {t("home.welcome").replace("{name}", userName || "Student")}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={showLanguageOptions}
            style={styles.actionButton}
          >
            <Ionicons name="language" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showThemeOptions}
            style={styles.actionButton}
          >
            <Ionicons
              name={
                themeMode === "dark"
                  ? "moon"
                  : themeMode === "light"
                  ? "sunny"
                  : "contrast"
              }
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.welcomeCard, { backgroundColor: colors.surface }]}>
          <View>
            <Text style={[styles.welcomeTitle, { color: colors.text }]}>
              {t("home.welcome").replace("{name}", userName || "Student")}
            </Text>
            <Text style={[styles.welcomeSub, { color: colors.textSecondary }]}>
              {t("home.ready")}
            </Text>
            <TouchableOpacity
              style={[styles.levelTag, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.levelText}>{t("home.beginner")}</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.studentImage}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t("home.newLesson")}
        </Text>
        <View style={[styles.lessonCard, { backgroundColor: colors.surface }]}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2936/2936886.png",
            }}
            style={styles.vietnamImage}
          />
          <View style={styles.lessonContent}>
            <Text style={[styles.lessonTitle, { color: colors.text }]}>
              {t("home.vietnameseAlphabet")}
            </Text>
            <Text style={[styles.lessonSub, { color: colors.textSecondary }]}>
              {t("home.alphabetDesc")}
            </Text>
            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push("/(tabs)/lesson")}
            >
              <Text style={styles.startText}>{t("home.startLearning")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t("home.exploreMore")}
        </Text>
        <View style={styles.extraContainer}>
          <TouchableOpacity
            style={[styles.extraBox, { backgroundColor: colors.surface }]}
            onPress={() => router.push("/speak")}
          >
            <Ionicons name="mic-outline" size={26} color={colors.primary} />
            <Text style={[styles.extraTitle, { color: colors.text }]}>
              {t("home.pronunciation")}
            </Text>
            <Text style={[styles.extraSub, { color: colors.textSecondary }]}>
              {t("home.pronunciationDesc")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.extraBox, { backgroundColor: colors.surface }]}
            onPress={() => router.push("/quiz")}
          >
            <Ionicons
              name="game-controller-outline"
              size={26}
              color="#E53E3E"
            />
            <Text style={[styles.extraTitle, { color: colors.text }]}>
              {t("home.games")}
            </Text>
            <Text style={[styles.extraSub, { color: colors.textSecondary }]}>
              {t("home.gamesDesc")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 28, fontWeight: "bold", marginBottom: 4 },
  headerSubtitle: { fontSize: 16 },
  headerActions: { flexDirection: "row", gap: 12 },
  actionButton: { padding: 8 },
  content: { flex: 1, padding: 16 },
  welcomeCard: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: { fontSize: 16, fontWeight: "700", marginTop: 4 },
  welcomeSub: { fontSize: 14, marginTop: 4 },
  levelTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  levelText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  studentImage: { width: 60, height: 60, resizeMode: "contain" },
  sectionTitle: { fontSize: 17, fontWeight: "600", marginBottom: 10 },
  lessonCard: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vietnamImage: { width: "100%", height: 150, resizeMode: "contain" },
  lessonContent: { marginTop: 8 },
  lessonTitle: { fontSize: 16, fontWeight: "700" },
  lessonSub: { fontSize: 14, marginVertical: 6 },
  startButton: {
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  startText: { color: "#fff", fontWeight: "600" },
  extraContainer: { flexDirection: "row", justifyContent: "space-between" },
  extraBox: {
    width: "48%",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  extraTitle: { fontSize: 15, textAlign: "center", fontWeight: "600", marginTop: 6 },
  extraSub: { fontSize: 13, textAlign: "center", marginTop: 4 },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#E2E8F0",
    marginTop: 20,
  },
});
