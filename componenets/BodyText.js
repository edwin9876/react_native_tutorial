import React from "react";
import { StyleSheet, Text } from "react-native";

const BodyText = (props) => {
  return (
    <Text style={{ ...styles.card, ...props.style }}>{props.children}</Text>
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

export default BodyText;
