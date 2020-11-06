import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function AddComponent(props) {
  const [input, setInput] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState(true);

  const onSelectTypeButtonPress = (type) => {
    setType(type);
    const typetxt = type === true ? "" : "-";
    props.handleAdd({ ...props.transaction, type: typetxt });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Add a transaction</Text>
      <TextInput
        value={input}
        onChangeText={(text) => {
          setInput(text);
          if (text === "") props.setHaveInput(false);
          else props.setHaveInput(true);
          const amount = parseFloat(text);
          props.handleAdd({ ...props.transaction, amount: amount });
        }}
        placeholder={"0.00"}
        style={styles.input}
        keyboardType="decimal-pad"
        returnKeyType="done"
        autoFocus
      />
      <View style={styles.buttons}>
        <TouchableOpacity
          style={{
            ...styles.typeButton,
            ...(type ? { backgroundColor: "#00de4e" } : {}),
          }}
          onPress={() => onSelectTypeButtonPress(true)}
        >
          <Text style={styles.typeButton_text}>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.typeButton,
            ...(type ? {} : { backgroundColor: "#de0000" }),
          }}
          onPress={() => onSelectTypeButtonPress(false)}
        >
          <Text style={styles.typeButton_text}>Expense</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        value={desc}
        onChangeText={(text) => {
          setDesc(text);
          props.handleAdd({ ...props.transaction, description: text });
        }}
        placeholder={"description... (optional)"}
        style={styles.desc}
        returnKeyType="done"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
  },
  head: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    margin: 12,
    borderRadius: 6,
    borderColor: "#000000",
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  desc: {
    marginTop: 40,
    borderRadius: 6,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typeButton: {
    flex: 1,
    backgroundColor: "gray",
    // borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  typeButton_text: {
    textAlign: "center",
    color: "#ffffff",
  },
});
