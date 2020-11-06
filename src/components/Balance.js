import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import * as firebase from "firebase";

export default function Balance() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    firebase
      .database()
      .ref("/transactions")
      .on("value", (snapshot) => {
        let data = [];
        snapshot.forEach((transaction) => {
          let t = transaction.val();
          // console.log(t.amount);
          data.push(t.amount);
        });
        let mappedData = data.length ? data.reduce((p, c) => p + c, 0) : 0;
        setBalance(mappedData);
      });
  }, []);

  return (
    <View style={styles.frame}>
      <Text style={styles.head}>Balance</Text>
      <Text style={styles.amount}>{Number(balance).format(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 175,
    height: 175,
    borderWidth: 3,
    borderColor: "#85fffb",
    borderRadius: 100,
    backgroundColor: "#212121",
  },
  head: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  amount: {
    color: "#ffffff",
    fontSize: 20,
  },
});
