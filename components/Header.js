import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.header__title}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        paddingTop: 35,
        backgroundColor: Platform.OS === "android" ? "#d6d6d6" : "white",
        alignItems: "center",
        justifyContent: "center",
    },
    header__title: {
        color: "black",
        fontSize: 30,
        fontWeight: "200",
    },
});

export default Header;
