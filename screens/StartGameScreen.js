import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../componenets/Card";
import Color from "../constants/color";
import Input from "../componenets/Input";
import NumberContainer from "../componenets/NumberContainer";

const StartGameScreen = (props) => {
  const [enteredVal, setEnteredVal] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submittedVal, setSubmittedVal] = useState("");

  const handleNumberInput = (inputText) => {
    setEnteredVal(inputText.replace(/[^0-9]/g, ""));
  };

  const handleReset = () => {
    setEnteredVal("");
    setConfirmed(false);
  };

  const handleSubmit = () => {
    const chosenNum = parseInt(enteredVal);
    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      Alert.alert("Invalid Num", "1-99", [
        { text: "okay", style: "destructive", onPress: handleReset },
      ]);
      return;
    }
    setSubmittedVal(chosenNum);
    setEnteredVal("");
    setConfirmed(true);
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.popUp}>
        <Text>Selected Number:</Text>
        <NumberContainer>{submittedVal}</NumberContainer>
        <Button
          onPress={() => props.onGameStart(submittedVal)}
          title="Start Game"
        ></Button>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new game</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a number</Text>
          <Input
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            styles={styles.input}
            maxLength={2}
            onChangeText={handleNumberInput}
            value={enteredVal}
          ></Input>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                color={Color.accent}
                onPress={handleReset}
                title="Reset"
              ></Button>
            </View>
            <View style={styles.button}>
              <Button
                color={Color.primary}
                onPress={handleSubmit}
                title="Confirm"
              ></Button>
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: "center",
    flex: 1,
  },
  title: {
    marginVertical: 10,
    fontSize: 20,
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  popUp: {
    marginVertical: 20,
    alignItems: "center",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
});

export default StartGameScreen;
