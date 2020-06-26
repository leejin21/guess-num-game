import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);

    const restartGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    };

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
        setGuessRounds(0);
    };
    const gameOverHandler = (numOfRounds) => {
        setGuessRounds(numOfRounds);
    };

    let content = <StartGameScreen onStartGame={startGameHandler}></StartGameScreen>;

    if (userNumber && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}></GameScreen>;
    } else if (guessRounds > 0) {
        content = <GameOverScreen userNum={userNumber} roundNum={guessRounds} startAgain={restartGameHandler}></GameOverScreen>;
    }

    return (
        <SafeAreaView style={styles.screen}>
            <Header title="Guess a number"></Header>
            {content}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
