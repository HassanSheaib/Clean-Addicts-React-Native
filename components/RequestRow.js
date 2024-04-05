import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
const RequestRow = ({ imageUrl, city, block, street, date }) => {
  let img = undefined;
  if (imageUrl == "House") {
    img = require("../assets/home.png");
  } else if (imageUrl == "Event") {
    img = require("../assets/placard.png");
  } else if (imageUrl == "Office") {
    img = require("../assets/briefcase.png");
  } else {
    img = require("../assets/equipment.png");
  }

  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image} />
      <View style={styles.content}>
        <Text style={[styles.text, {marginBottom: 5}]}>{city}-{block}-{street}</Text>
        <Text style={[styles.text, {marginTop: 5}]}>{date}</Text>
      </View>
      <Image source={require("../assets/right.png")} style={{width: 16, height: 16}}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    width: '100%',
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "black",

  },
  image: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    flexWrap: 'nowrap',
    width: '100%',
  },
});

export default RequestRow;
