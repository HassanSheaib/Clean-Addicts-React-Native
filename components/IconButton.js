import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

const IconButton = ({ iconImage, onPress }) => {

  return (
    <View style={styles.square}>
      <TouchableOpacity onPress={onPress}>
        <Image source={iconImage} style={{ width: 35, height: 35 }} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  square: {
    width: "13%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
    margin: 5,
  },
});
export default IconButton;
