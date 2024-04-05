import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import IconButton from "../../components/IconButton";
import { useRoute } from "@react-navigation/native";
import Card from "../../components/Card";
import {
  deleteRequest,
  getCurrentUser,
  updateRequestStatus,
} from "../../services/FirestoreService";

const CleanRequestDetails = ({ navigation }) => {
  const route = useRoute();
  const request = route.params.request;
  const [loading, setLoading] = useState(false);
  const currentUser = getCurrentUser();
  const [status, setStatus] = useState(request.status);

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView>
            {/*User Info  SECTION*/}
            <Text style={styles.sectionsTitle}>User Info</Text>
            <View
              style={{
                marginBottom: 10,
              }}
            >
              {request.createrUid !== currentUser.uid && (
                <View style={{ flexDirection: "row" }}>
                  <IconButton
                    iconImage={require("../../assets/user.png")}
                    onPress={() => {}}
                  />
                  <Card style={styles.square}>
                    <Text>{request.createrUid}</Text>
                  </Card>
                </View>
              )}
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  iconImage={require("../../assets/phone.png")}
                  onPress={() => {}}
                />
                <Card style={styles.square}>
                  <Text>
                    {request.countryCode} - {request.phone}
                  </Text>
                </Card>
              </View>
            </View>
            {/*Request Status  SECTION*/}
            <Text style={styles.sectionsTitle}>Request Status</Text>
            <View
              style={{
                marginBottom: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  iconImage={require("../../assets/status.png")}
                  onPress={() => {}}
                />
                <Card style={styles.square}>
                  <Text>{status}</Text>
                </Card>
              </View>
            </View>
            {/*DATE & TIME SECTION*/}
            <Text style={styles.sectionsTitle}>Date And Time</Text>
            <View
              style={{
                marginBottom: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignContent: "flex-start" }}
              >
                <IconButton
                  iconImage={require("../../assets/schedule.png")}
                  onPress={() => {}}
                />
                <Card>
                  <Text>{request.date}</Text>
                </Card>
              </View>
            </View>
            {/*LOCATION SECTION*/}
            <Text style={styles.sectionsTitle}>Site Location</Text>
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  iconImage={require("../../assets/locationPin.png")}
                  onPress={() => {}}
                />
                <Card>
                  <Text>
                    {request.governate} - {request.city}
                  </Text>
                </Card>
              </View>
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  iconImage={require("../../assets/blockAndStreet.png")}
                  onPress={() => {}}
                />
                <Card>
                  <Text>
                    {request.block} - {request.street}
                  </Text>
                </Card>
              </View>
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  iconImage={require("../../assets/multistorey.png")}
                  onPress={() => {}}
                />
                <Card>
                  <Text>
                    {request.floor} - {request.appartmentNbr}
                  </Text>
                </Card>
              </View>
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  iconImage={require("../../assets/planning.png")}
                  onPress={() => {}}
                />
                <Card>
                  <Text>{request.instructions}</Text>
                </Card>
              </View>
            </View>
            {/*Additional Note*/}
            <View>
              <Text style={styles.sectionsTitle}>Additional Note</Text>
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  iconImage={require("../../assets/sticky-notes.png")}
                  onPress={() => {}}
                />
                <Card>
                  <Text>{request.additionalNote}</Text>
                </Card>
              </View>
            </View>
          </ScrollView>
          {/* Submit Button */}
          {request.createrUid !== currentUser.uid ? (
            <View style={styles.buttonContainer}>
              <Button
                title="Dispatch Cleaner"
                color="#fff"
                onPress={() => {
                  updateRequestStatus(request.id, "Cleaners Dispatched");
                  setStatus("Cleaners Dispatched");
                }}
              />
            </View>
          ) : (
            <View style={[styles.buttonContainer, { backgroundColor: "red" }]}>
              <Button
                title="Cancel Request"
                color="#fff"
                onPress={() => {
                  setLoading(true);
                  deleteRequest(request.id, navigation);
                }}
              />
            </View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
  },
  square: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
    margin: 2,
  },
  inputs: {
    borderColor: "black",
    width: "38%",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginVertical: 5,
    marginRight: 16,
  },
  sectionsTitle: {
    fontWeight: "bold",
    color: "gray",
    marginBottom: 2,
  },
  additionalNoteInput: {
    borderColor: "black",
    width: "80%",
    height: 100,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginVertical: 5,
    marginRight: 16,
  },
  buttonContainer: {
    width: "100%",
    backgroundColor: "#007F73",
    borderRadius: 5,
    marginBottom: 50,
  },
});
export default CleanRequestDetails;
