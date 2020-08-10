// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./componenets/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [selectedNum, setSelectedNum] = useState();
  const [roundToFinish, setRoundToFinish] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  const handleNewGame = () => {
    setRoundToFinish(0);
    setSelectedNum(null);
  };

  const handleGameStart = (selectedNumber) => {
    setSelectedNum(selectedNumber);
    setRoundToFinish(0);
  };

  const handleGameOver = (gameOverRounds) => {
    setRoundToFinish(gameOverRounds);
  };

  let content = <StartGameScreen onGameStart={handleGameStart} />;

  if (selectedNum && roundToFinish === 0) {
    content = (
      <GameScreen userChoice={selectedNum} onGameOver={handleGameOver} />
    );
  } else if (roundToFinish > 0) {
    content = (
      <GameOverScreen
        userChoice={selectedNum}
        rounds={roundToFinish}
        onStartAgain={handleNewGame}
      ></GameOverScreen>
    );
  }
  return (
    <View style={styles.screenContainer}>
      <Header title="Guess a number"></Header>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
  },
});
