import React from "react";
import { ScrollView, View, KeyboardAvoidingView } from "react-native";
import { makeStyles, Text, Button, useThemeMode, Input, Icon } from "@rneui/themed";
import KeyboardAwareScrollView from 'react-native-keyboard-aware-scroll-view';
import AppConst from "../assets/const"

export default function ChatRoom({ navigation }) {
    const styles = useStyles();
    const { setMode, mode } = useThemeMode();
    
    const myID = 123
    const messages = [
        {
            id: 123,
            name: "Le",
            message: "Hi how are you?"
        },
        {
            id: 456,
            name: "Zel",
            message: "Fine thanks"
        },
    ]

    return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    {
                        messages.map((msgObj) => {
                            if (msgObj.id === myID) {
                                return (
                                    <Button buttonStyle={{ borderRadius: 20, margin: 10,backgroundColor: 'green' }}>{msgObj.name + ": " + msgObj.message}</Button>
                                )
                            }
                            
                            return (
                                <Button buttonStyle={{ borderRadius: 20, margin: 10  }}>{msgObj.name + ": " + msgObj.message}</Button>
                            )
                        })
                    }
                    <KeyboardAvoidingView behavior="padding" style={styles.messageBox}>
                        <Input placeholder="Write a message" rightIcon={
                            <Button type="clear">
                                <Icon name="arrow-up" type="font-awesome" />
                            </Button>
                        } />
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
    )
}

const useStyles = makeStyles((theme) => ({
    scrollView: {
        backgroundColor: theme.colors.background
    },
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "center",
        justifyContent: "center",
    },
    messageBox: {
        width: "100%",
    }
}));