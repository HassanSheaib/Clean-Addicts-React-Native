import React from "react";
import { View, StyleSheet } from "react-native";

const Card = ({ children }) => {

  return (
    <View style={styles.square}>
        {children}
    </View>
  );
};
const styles = StyleSheet.create({
  square: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
    margin: 5,
  },
});
export default Card;
