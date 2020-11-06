import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import * as firebase from "firebase";
import moment from "moment";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("/transactions")
      .on("value", (snapshot) => {
        let res = [];
        snapshot.forEach((transaction) => {
          let t = transaction.val();
          res.unshift({
            date: t.date,
            amount: t.amount,
            description: t.description,
          });
        });
        setData(res);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.head}>History</Text>
      <ScrollView>
        {data.map((transaction, i) => {
          return (
            <View key={i} style={styles.item}>
              <Text style={styles.date}>
                {moment(transaction.date).format("D/MM/YYYY HH:MM:SS")}
              </Text>
              <View style={styles.list}>
                <Text style={styles.date}>{transaction.description}</Text>
                <Text
                  style={{
                    ...styles.amount,
                    ...(transaction.amount >= 0
                      ? { color: "#b2ffa6" }
                      : { color: "#ffa6a6" }),
                  }}
                >
                  {Number(transaction.amount).format(2)}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "left",
    width: "100%",
    fontWeight: "bold",
  },
  item: {
    marginBottom: 4,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: "#4d4d4d",
  },
  list: {
    paddingTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  date: {
    color: "#ffffff",
  },
  amount: {
    color: "#ffffff",
  },
});
