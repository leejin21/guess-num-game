import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const NumberContainer = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.orange,
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,

        alignItems: "center",
        justifyContent: "center",
    },
    number: {
        color: Colors.orange,
        fontSize: 30,
    },
});

export default NumberContainer;
