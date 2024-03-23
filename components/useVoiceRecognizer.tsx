import Voice, {
  SpeechEndEvent,
  SpeechErrorEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechStartEvent,
  SpeechVolumeChangeEvent,
} from "@react-native-voice/voice";
import { useCallback, useEffect, useState } from "react";

interface State {
  recognized: string;
  pitch: string;
  error: string;
  end: string;
  started: string;
  results: string[];
  partialResults: string[];
  isRecording: boolean;
}

export const useVoiceRecognizer = () => {
  const [state, setState] = useState<State>({
    recognized: "",
    pitch: "",
    error: "",
    end: "",
    started: "",
    results: [],
    partialResults: [],
    isRecording: false,
  });

  const resetState = useCallback(() => {
    setState({
      recognized: "",
      pitch: "",
      error: "",
      end: "",
      started: "",
      results: [],
      partialResults: [],
      isRecording: false,
    });
  }, []);

  const startRecognizing = useCallback(async () => {
    resetState();
    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  }, [resetState]);

  const stopRecognizing = useCallback(async () => {
    resetState();
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const cancelRecognizing = useCallback(async () => {
    resetState();
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const destroyRecognizing = useCallback(async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    resetState();
  }, [resetState]);

  useEffect(() => {
    Voice.onSpeechStart = (e: SpeechStartEvent) => {
      setState((prev) => ({ ...prev, started: "√", isRecording: true }));
    };
    Voice.onSpeechRecognized = (e: SpeechRecognizedEvent) => {
      setState((prev) => ({ ...prev, recognized: "√" }));
    };
    Voice.onSpeechEnd = (e: SpeechEndEvent) => {
      setState((prev) => ({ ...prev, end: "√", isRecording: false }));
    };
    Voice.onSpeechError = (e: SpeechErrorEvent) => {
      setState((prev) => ({ ...prev, error: JSON.stringify(e.error) }));
    };
    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
      setState((prev) => ({ ...prev, results: e.value || [] }));
    };
    Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
      setState((prev) => ({ ...prev, partialResults: e.value || [] }));
    };
    Voice.onSpeechVolumeChanged = (e: SpeechVolumeChangeEvent) => {
      setState((prev) => ({
        ...prev,
        pitch: e.value?.toString() ?? "",
        recognized: "√",
      }));
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return {
    state,
    setState,
    resetState,
    startRecognizing,
    stopRecognizing,
    cancelRecognizing,
    destroyRecognizing,
  };
};
