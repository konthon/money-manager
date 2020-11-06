import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Wallet from "./src/Wallet";

import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAy45Cocx-TPElEJYqeWIotAXBGV66Ny9E",
  authDomain: "wallet-tracker-app.firebaseapp.com",
  databaseURL: "https://wallet-tracker-app.firebaseio.com",
  projectId: "wallet-tracker-app",
  storageBucket: "wallet-tracker-app.appspot.com",
  messagingSenderId: "321169538501",
  appId: "1:321169538501:web:0c7aab338880a267075fac",
  measurementId: "G-R3L6PKSWZ3",
};

firebase.initializeApp(firebaseConfig);

// Format Numbers
Number.prototype.format = function (n, x) {
  var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
};

export default function App() {
  return (
    <View style={styles.container}>
      <Wallet />
      <StatusBar barStyle="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    alignItems: "center",
    justifyContent: "center",
  },
});
