import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Button,
} from "react-native";
import { logout } from "../../services/FirebaseAuthServices";
import { getAllRequests } from "../../services/FirestoreService";
import RequestRow from "../../components/RequestRow";
import { useFocusEffect } from "@react-navigation/native";
import IconButton from "../../components/IconButton";

const buttons = [
  {
    id: 1,
    text: "House",
    image: require("../../assets/home.png"),
  },
  {
    id: 2,
    text: "Office",
    image: require("../../assets/briefcase.png"),
  },
  {
    id: 3,
    text: "Event",
    image: require("../../assets/placard.png"),
  },
  {
    id: 4,
    text: "Equipments",
    image: require("../../assets/equipment.png"),
  },
];

const Home = ({ navigation }) => {
  const [requests, setRequests] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const {
            success,
            message,
            requests: fetchedRequests,
          } = await getAllRequests();
          if (success) {
            setRequests(fetchedRequests);
            setIsLoading(false);
          } else {
            setError(message);
          }
        } catch (error) {
          setError(error.message);
        }
      };
      fetchData();
    }, [])
  );
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.square}
      onPress={() => {
        navigation.navigate("Create Request", {
          category: item.text,
        });
      }}
    >
      <Image source={item.image} style={{ width: 35, height: 35 }} />
      <Text
        style={{ fontSize: 12, fontWeight: "400", color: "gray", marginTop: 3 }}
      >
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              borderBottomWidth: 1,
              borderBottomColor: 'black'
            }}
          >
            <Text style={styles.welcomeText}>Clean Adicts</Text>
            <TouchableOpacity
              onPress={() => {
                logout(navigation);
              }}
            >
              <Image
                source={require("../../assets/logout.png")}
                style={{
                  marginRight: 10,
                  marginTop: 10,
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginTop: 10 }}>
            <FlatList
              data={buttons}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={4}
              contentContainerStyle={styles.listContainer}
              scrollEnabled={false}
            />
          </View>
          <View style={{ flex: 6, width: "100%" }}>
            <Text style={styles.welcomeText}>Clean Requests</Text>
            <FlatList
              data={requests}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Request", { request: item });
                  }}
                >
                  <RequestRow
                    imageUrl={item.category}
                    city={item.city}
                    block={item.block}
                    street={item.street}
                    date={item.date}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  listContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: "22%",
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 12,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "grey",
    padding: 10,
  },
});
export default Home;
