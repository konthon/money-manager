import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
} from "react-native";

import * as firebase from "firebase";

import History from "./components/History";
import Balance from "./components/Balance";
import Add from "./components/Add";

export default function Wallet() {
  const [modalVisible, setModalVisible] = useState(false);
  const [transaction, setTransaction] = useState();
  const [haveInput, setHaveInput] = useState(false);

  const handleAdd = (input) => {
    if (input.type === undefined) {
      input = { ...input, type: "" };
    }
    setTransaction({
      ...input,
      amount: input.type === "-" ? -input.amount : input.amount,
      description: input.description === "" ? "-" : input.description,
    });
  };

  const onPressSave = () => {
    setModalVisible(!modalVisible);
    firebase.database().ref("/transactions").push({
      amount: transaction.amount,
      description: transaction.description,
      date: Date.now(),
    });
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 90 }}>
        <Text style={styles.header}>Wallet</Text>
        <Balance />
        <History />
      </View>
      <View style={{ flex: 10 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
          style={{ position: "relative" }}
        >
          <View style={styles.modalView}>
            <View style={styles.topSection}>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: "transparent",
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={{ ...styles.openButton_text, color: "#525252" }}>
                  Cancel
                </Text>
              </TouchableHighlight>
              {haveInput ? (
                <TouchableHighlight
                  style={styles.openButton}
                  onPress={onPressSave}
                >
                  <Text style={styles.openButton_text}>Save</Text>
                </TouchableHighlight>
              ) : (
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "gray" }}
                  disabled
                >
                  <Text style={styles.openButton_text}>Save</Text>
                </TouchableHighlight>
              )}
            </View>
            <Add
              transaction={transaction}
              handleAdd={handleAdd}
              setHaveInput={setHaveInput}
            />
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setModalVisible(true);
            setHaveInput(false);
            setTransaction({ amount: "", type: "", description: "" });
          }}
        >
          <Text style={styles.addButton_text}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 30,
    paddingTop: 60,
  },
  header: {
    color: "#ffffff",
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
    padding: 12,
  },
  addButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    backgroundColor: "#29f086",
    borderRadius: 100,
  },
  addButton_text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },

  /* ---------------------------------- Modal --------------------------------- */
  modalView: {
    position: "absolute",
    bottom: 0,
    height: "95%",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  topSection: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 2,
  },
  openButton_text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
