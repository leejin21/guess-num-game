import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/Colors";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get("window").width / 4);

    useEffect(() => {
        const updateListener = () => {
            setButtonWidth((buttonWidth) => Dimensions.get("window").width / 4);
        };
        Dimensions.addEventListener("change", updateListener);
        return () => {
            Dimensions.removeEventListener("change", updateListener);
        };
    });

    const numberInputHandler = (inputText) => {
        // 이걸 왜 하는 지 모르겠음.
        setEnteredValue(inputText.replace(/[^0-9]/g, ""));
    };
    const resetInputHandler = () => {
        setEnteredValue("");
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        // enteredValue는 str이니까 int형으로 바꿔줌
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Invalid number", "Number has to be a number between 1 and 99", [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue("");
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME" color={Colors.primary} onPress={() => props.onStartGame(selectedNumber)}></Button>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                >
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start the new game!</Text>
                        <Card style={styles.inputContainer}>
                            <Text>Select a number</Text>
                            <Input style={styles.input} blurOnsubmit autoCapitalize="none" autoCorrect={false} keyboardType="number-pad" maxLength={2} onChangeText={numberInputHandler} value={enteredValue}></Input>
                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth }}>
                                    {/* 여기서 onPress={()=> {resetInputHandler}} 이거 이렇게 쓰면 안됨.  */}
                                    <Button title="Reset" onPress={resetInputHandler} color={Colors.green__darker} />
                                </View>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary__darker} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: "80%",
        alignItems: "center",
        maxWidth: "95%",
        minWidth: 300,
    },
    input: {
        width: 50,
        textAlign: "center",
    },
    buttonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    button: {
        // width: 100,
        width: Dimensions.get("window").width / 4,
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center",
    },
});

export default StartGameScreen;
