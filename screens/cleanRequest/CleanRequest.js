import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import IconButton from "../../components/IconButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { saveRequests } from "../../services/FirestoreService";
import { useRoute } from "@react-navigation/native";

const CleanRequest = ({ navigation }) => {
  const route = useRoute();
  const category = route.params;
  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "OK",
          onPress: () => setLoading(false),
        },
      ],
      { cancelable: false }
    );
  };

  const [loading, setLoading] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // Phone Number
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");

  // Date & Time
  const [selectedDateAndTime, setSelectedDateAndTime] = useState(new Date());
  // Address
  const [governate, setGovernate] = useState("");
  const [city, setCity] = useState("");
  const [block, setBlock] = useState("");
  const [street, setStreet] = useState("");
  const [floor, setFloor] = useState("");
  const [instructions, setInstructions] = useState("");
  const [appartmentNbr, setAppartmentNbr] = useState("");
  //Additional Note
  const [additionalNote, setAdditionalNote] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    console.log("Selected date:", date);
    setSelectedDateAndTime(date);
    hideDatePicker();
  };
  const handleSaveRequest = (request) => {
    saveRequests(request).then((result) => {
      if (result.success) {
        setLoading(false);
        navigation.navigate("Home");
      } else {
        console.error(result.message);
        showAlert("Failed Saving Request", result.message);
      }
    });
  };

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
            {/*Phone Number SECTION*/}
            <Text style={styles.sectionsTitle}>Phone Number</Text>
            <View
              style={{
                marginBottom: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  iconImage={require("../../assets/phone.png")}
                  onPress={() => {}}
                />
                <TextInput
                  value={countryCode}
                  onChangeText={(text) => {
                    setCountryCode(text);
                  }}
                  placeholder="Code"
                  keyboardType="numeric"
                  style={[styles.inputs, { width: "20%" }]}
                />
                <TextInput
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                  }}
                  placeholder="Phone Number"
                  keyboardType="numeric"
                  style={[styles.inputs, { width: "56%" }]}
                />
              </View>
            </View>
            {/*DATE & TIME SECTION*/}
            <Text style={styles.sectionsTitle}>Date And Time</Text>
            <View
              style={{
                marginBottom: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  iconImage={require("../../assets/schedule.png")}
                  onPress={() => {
                    showDatePicker();
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    showDatePicker();
                  }}
                  style={[
                    styles.inputs,
                    { justifyContent: "center", width: "80%" },
                  ]}
                >
                  <TextInput
                    value={selectedDateAndTime.toLocaleString()}
                    editable={false}
                    placeholder="Select Time"
                  />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  datePickerModeAndroid="spinner"
                  textColor="black"
                />
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
                <TextInput
                  value={governate}
                  onChangeText={(text) => {
                    setGovernate(text);
                  }}
                  placeholder="Governate"
                  style={styles.inputs}
                />
                <TextInput
                  value={city}
                  onChangeText={(text) => {
                    setCity(text);
                  }}
                  placeholder="City"
                  style={styles.inputs}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  iconImage={require("../../assets/blockAndStreet.png")}
                  onPress={() => {}}
                />
                <TextInput
                  value={block}
                  onChangeText={(text) => {
                    setBlock(text);
                  }}
                  placeholder="Block"
                  style={styles.inputs}
                />
                <TextInput
                  value={street}
                  onChangeText={(text) => {
                    setStreet(text);
                  }}
                  placeholder="Street"
                  style={styles.inputs}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  iconImage={require("../../assets/multistorey.png")}
                  onPress={() => {}}
                />
                <TextInput
                  value={floor}
                  onChangeText={(text) => {
                    setFloor(text);
                  }}
                  placeholder="floor"
                  style={styles.inputs}
                />
                <TextInput
                  value={appartmentNbr}
                  onChangeText={(text) => {
                    setAppartmentNbr(text);
                  }}
                  placeholder="Aprtement nbr"
                  style={styles.inputs}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  iconImage={require("../../assets/planning.png")}
                  onPress={() => {}}
                />
                <TextInput
                  value={instructions}
                  onChangeText={(text) => {
                    setInstructions(text);
                  }}
                  placeholder="Help the cleaner to get to you"
                  multiline={true}
                  style={[styles.inputs, { width: "80%" }]}
                />
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
                <TextInput
                  value={additionalNote}
                  onChangeText={setAdditionalNote} // Simplified onChangeText
                  placeholder="Additional notes"
                  multiline={true}
                  style={styles.additionalNoteInput}
                />
              </View>
            </View>
          </ScrollView>
          {/* Submit Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Create Clean Request"
              color="#fff"
              onPress={() => {
                const formatDateTime = (date) => {
                  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
                  return date.toLocaleDateString(undefined, options);
                };
                const stringDate = formatDateTime(selectedDateAndTime);
                setLoading(true);
                let request = {
                  category: category.category,
                  date: stringDate,
                  countryCode: countryCode,
                  phone: phone,
                  governate: governate,
                  city: city,
                  block: block,
                  street: street,
                  floor: floor,
                  appartmentNbr: appartmentNbr,
                  instructions: instructions,
                  additionalNote: additionalNote,
                  status: 'Pending'
                };

                handleSaveRequest(request);
              }}
            />
          </View>
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
    width: "13%",
    aspectRatio: 1,
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
    backgroundColor: "#222831",
    borderRadius: 5,
    marginBottom: 50,
  },
});
export default CleanRequest;
