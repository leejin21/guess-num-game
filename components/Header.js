import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

const Header = (props) => {
    return (
        <View style={{ ...styles.headerBase, ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid }) }}>
            <Text style={styles.header__title}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: "100%",
        height: 90,
        paddingTop: 35,
        alignItems: "center",
        justifyContent: "center",
    },
    headerIOS: {
        backgroundColor: "white",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    headerAndroid: {
        backgroundColor: "#d6d6d6",
    },
    header__title: {
        color: "black",
        fontSize: 30,
        fontWeight: "200",
    },
});

export default Header;
