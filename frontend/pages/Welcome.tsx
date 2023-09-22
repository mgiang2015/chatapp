import React, { useState } from "react";
import { View } from "react-native";
import { makeStyles, Text, Button, useThemeMode, Overlay, Input } from "@rneui/themed";
import AppConst from "../assets/const"

export default function Welcome({ navigation }) {
    const [joinVisible, setJoinVisible] = useState(false)
    const [startVisible, setStartVisible] = useState(false)
    const styles = useStyles();
    const { setMode, mode } = useThemeMode();

    function toggleJoinVisible() {
        setJoinVisible(!joinVisible)
    }

    function toggleStartVisible() {
        setStartVisible(!startVisible)
    }

    function handleStart() {
        navigation.navigate(AppConst.NAME_CHATROOM_PAGE)
    }

    return (
        <View style={styles.container}>
            <Text h1>Welcome to Chat App!</Text>
            <Button size="lg" buttonStyle={{ borderRadius: 20, margin: 10  }} onPress={toggleStartVisible}>Start Chat</Button>
            <Button size="lg" buttonStyle={{ borderRadius: 20, margin: 10  }} onPress={toggleJoinVisible}>Join Chat</Button>
            <Overlay isVisible={joinVisible} onBackdropPress={toggleJoinVisible}>
                <View style={styles.overlay}>
                    <Input placeholder="Name" />
                    <Input placeholder="Chatroom number" />
                    <Button buttonStyle={{ borderRadius: 20, margin: 10  }} onPress={() => {toggleJoinVisible(); handleStart();}}>Join</Button>
                    <Button buttonStyle={{ borderRadius: 20, margin: 10  }} onPress={toggleJoinVisible}>Back</Button>
                </View>
            </Overlay>
            <Overlay isVisible={startVisible} onBackdropPress={toggleStartVisible}>
                <View style={styles.overlay}>
                    <Input placeholder="Name" />
                    <Button buttonStyle={{ borderRadius: 20, margin: 10  }} onPress={() => {toggleStartVisible(); handleStart();}}>Join</Button>
                    <Button buttonStyle={{ borderRadius: 20, margin: 10  }} onPress={toggleStartVisible}>Back</Button>
                </View>
            </Overlay>
        </View>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "center",
        justifyContent: "center",
    },
    overlay: {
        width: 300,
        height: 500,
        paddingTop: "20%"
    },
    input: {
        width: 200
    }
  }));
  