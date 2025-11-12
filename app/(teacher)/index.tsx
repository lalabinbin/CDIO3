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

export default function TeacherDashboard() {
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
    Alert.alert(t("dashboard.selectLanguage"), "", [
      { text: "English", onPress: () => setLanguage("en") },
      { text: "Tiếng Việt", onPress: () => setLanguage("vi") },
      { text: "한국어", onPress: () => setLanguage("ko") },
      { text: "日本語", onPress: () => setLanguage("ja") },
      { text: "中文", onPress: () => setLanguage("zh") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const showThemeOptions = () => {
    Alert.alert(t("dashboard.selectTheme"), "", [
      { text: t("dashboard.light"), onPress: () => setThemeMode("light") },
      { text: t("dashboard.dark"), onPress: () => setThemeMode("dark") },
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
            {t("dashboard.title") || "Dashboard"}
          </Text>
          <Text
            style={[styles.headerSubtitle, { color: colors.textSecondary }]}
          >
            {t("dashboard.welcome").replace("{name}", userName || "Teacher")}
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

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Card */}
        <View style={[styles.welcomeCard, { backgroundColor: colors.surface }]}>
          <View>
            <Text style={[styles.welcomeTitle, { color: colors.text }]}>
              {t("dashboard.welcome").replace("{name}", userName || "Teacher")}
            </Text>
            <Text style={[styles.welcomeSub, { color: colors.textSecondary }]}>
              {t("dashboard.readyToManage")}
            </Text>
            <TouchableOpacity
              style={[styles.levelTag, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.levelText}>{t("dashboard.teacher")}</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.teacherImage}
          />
        </View>

        {/* Quick Links */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t("dashboard.quickLinks")}
        </Text>
        <View style={styles.extraContainer}>
          <TouchableOpacity
            style={[styles.extraBox, { backgroundColor: colors.surface }]}
            onPress={() => router.push("/courses")}
          >
            <Ionicons name="book-outline" size={26} color={colors.primary} />
            <Text style={[styles.extraTitle, { color: colors.text }]}>
              {t("dashboard.courses")}
            </Text>
            <Text style={[styles.extraSub, { color: colors.textSecondary }]}>
              {t("dashboard.manageCourses")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.extraBox, { backgroundColor: colors.surface }]}
            onPress={() => router.push("/students")}
          >
            <Ionicons name="people-outline" size={26} color="#E53E3E" />
            <Text style={[styles.extraTitle, { color: colors.text }]}>
              {t("dashboard.students")}
            </Text>
            <Text style={[styles.extraSub, { color: colors.textSecondary }]}>
              {t("dashboard.trackProgress")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.extraContainer}>
          <TouchableOpacity
            style={[styles.extraBox, { backgroundColor: colors.surface }]}
            onPress={() => router.push("/quizzes")}
          >
            <Ionicons name="pencil-outline" size={26} color="#38B2AC" />
            <Text style={[styles.extraTitle, { color: colors.text }]}>
              {t("dashboard.quizzes")}
            </Text>
            <Text style={[styles.extraSub, { color: colors.textSecondary }]}>
              {t("dashboard.createAndGrade")}
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
  teacherImage: { width: 60, height: 60, resizeMode: "contain" },
  sectionTitle: { fontSize: 17, fontWeight: "600", marginBottom: 10 },
  extraContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
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
  extraTitle: { fontSize: 15, fontWeight: "600", marginTop: 6 },
  extraSub: { fontSize: 13, textAlign: "center", marginTop: 4 },
});
