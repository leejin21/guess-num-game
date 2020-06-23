import React from "react";
import { View, Text, StyleSheet, Button, Image, Dimensions } from "react-native";

import Colors from "../constants/Colors";
import Card from "../components/Card";

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Image source={require("../images/theend.png")} style={styles.img}></Image>
            <Card style={styles.card}>
                <Text style={styles.card__text}>Number of rounds: {props.roundNum}</Text>
                <Text style={styles.card__text}>Number was: {props.userNum}</Text>
                <View style={styles.buttonContainer}>
                    <Button title="Restart!" color={Colors.primary} onPress={props.startAgain}></Button>
                </View>
            </Card>
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
    },
    img: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").width * 0.5,
    },
    card__text: {
        fontSize: 15,
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default GameOverScreen;
