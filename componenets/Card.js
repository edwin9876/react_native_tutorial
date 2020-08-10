import React from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.3,
    borderWidth: 0.2,
    borderRadius: 10,
    padding: 20,
  },
});

export default Card;
