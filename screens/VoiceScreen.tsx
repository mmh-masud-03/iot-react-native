import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useVoiceRecognizer } from "../components/useVoiceRecognizer";
const VoiceScreen = () => {
  const { state, startRecognizing, destroyRecognizing, stopRecognizing } =
    useVoiceRecognizer();

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.container}
        onPressIn={() => {
          startRecognizing();
        }}
        onPressOut={() => {
          stopRecognizing();
        }}
      >
        <Icon name="microphone" size={100} color="green" />
        <Text>Press and hold to speak</Text>
        <Text style={styles.output}>{JSON.stringify(state)}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VoiceScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "green",
    padding: 20,
    marginHorizontal: 50,
  },
  output: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
});
