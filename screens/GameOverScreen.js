import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const GameOverScreen = ({ rounds, userChoice, onStartAgain }) => {
  return (
    <View style={styles.screen}>
      <Text>Game Over</Text>
      <Text>Number of round: {rounds}</Text>
      <Text>Number was: {userChoice}</Text>
      <Button onPress={onStartAgain} title="Play Again"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameOverScreen;
