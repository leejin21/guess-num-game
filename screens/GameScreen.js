import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert, Dimensions } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import Colors from "../constants/Colors";

import * as ScreenOrientation from "expo-screen-orientation";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum == exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = (props) => {
    // GameScreen에 진입했을 때는 화면 방향을 바꿔도 화면은 그대로로.
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
    // state 대신에 ref 쓰는 이유: rerender을 할 필요가 없기 때문.
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [availableSizeWidth, setAvailableSizeWidth] = useState(Dimensions.get("window").width);
    const [availableSizeHeight, setAvailableSizeHeight] = useState(Dimensions.get("window").height);

    const { userChoice, onGameOver } = props;
    useEffect(() => {
        const updateLayout = () => {
            setAvailableSizeWidth(Dimensions.get("window").width);
            setAvailableSizeHeight(Dimensions.get("window").height);
        };
        Dimensions.addEventListener("change", updateLayout);
        // 아래처럼 return문으로 함수를 넘기면 실행이 되는 건가?...???
        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        };
    });

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = (direction) => {
        if ((direction === "lower" && currentGuess < props.userChoice) || (direction === "higher" && currentGuess > props.userChoice)) {
            Alert.alert("Don't lie!", "You know that this is wrong,,", [{ text: "Sorry!", style: "default" }]);
            return;
        } else if (direction == "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        // currentGuess, 즉 이미 추측한 숫자에 대해서는 못 맞추도록.
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds((curRounds) => curRounds + 1);
    };
    if (availableSizeHeight < 500) {
        return (
            <View style={styles.screen}>
                <View style={styles.header}>
                    <Text style={styles.screen__title}>Opponent's Guess</Text>
                    <Text style={styles.roundtxt}>Round #{rounds}</Text>
                </View>
                <View style={styles.controls}>
                    <Button title="LOWER" onPress={nextGuessHandler.bind(this, "lower")} color={Colors.green__darker}></Button>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <Button title="HIGHER" onPress={nextGuessHandler.bind(this, "higher")} color={Colors.primary__darker}></Button>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.screen__title}>Opponent's Guess</Text>
                <Text style={styles.roundtxt}>Round #{rounds}</Text>
            </View>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, "lower")} color={Colors.green__darker}></Button>
                <Button title="HIGHER" onPress={nextGuessHandler.bind(this, "higher")} color={Colors.primary__darker}></Button>
            </Card>
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        padding: 5,
        marginTop: 5,
        width: "100%",
        alignItems: "flex-end",
        justifyContent: "space-evenly",
    },
    screen__title: {
        padding: 5,
        fontSize: 15,
        fontWeight: "bold",
        borderColor: "#444444",
        borderWidth: 3,
        textAlign: "center",
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "80%",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: Dimensions.get("window").height > 600 ? 15 : 10,
        width: 300,
        maxWidth: "80%",
    },
    roundtxt: {
        backgroundColor: "#444444",
        color: "white",
        fontSize: 15,
        borderColor: "#444444",
        borderWidth: 3,
        padding: 5,
        textAlign: "center",
    },
});

export default GameScreen;
