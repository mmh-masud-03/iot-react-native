import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
const Welcome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to Bangla voice controlled app
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 100,
  },
});

export default Welcome;
