import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import Color from "../constants/color";
import NumberContainer from "../componenets/NumberContainer";
import Card from "../componenets/Card";

const rndNumGen = (max, min, exclude) => {
  max = Math.floor(max);
  min = Math.ceil(min);
  let rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return rndNumGen(max, min, exclude);
  } else {
    return rndNum;
  }
};
const GameScreen = (props) => {
  const { userChoice, onGameOver } = props;
  const [currentGuess, setCurrentGuess] = useState(
    rndNumGen(1, 100, userChoice)
  );
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      //   Alert.alert("game Over", "Play Again?", [{ text: "yes" }]);
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const handleNextGuess = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("you're liar", "Stop cheating", [
        { text: "sorry", style: "destructive" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
      console.log(currentHigh);
      console.log(currentLow);
    }

    if (direction === "greater") {
      currentLow.current = currentGuess;
      console.log(currentHigh);
      console.log(currentLow);
    }
    let nextNum = rndNumGen(
      currentHigh.current,
      currentLow.current,
      currentGuess
    );

    setRounds((curRounds) => curRounds + 1);
    setCurrentGuess(nextNum);
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="lower" onPress={() => handleNextGuess("lower")} />
        <Button title="greater" onPress={() => handleNextGuess("greater")} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
