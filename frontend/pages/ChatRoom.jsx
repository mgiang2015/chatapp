import React, { useEffect, useState } from "react";
import { ScrollView, View, KeyboardAvoidingView } from "react-native";
import { makeStyles, Text, Button, useThemeMode, Input, Icon } from "@rneui/themed";
import { socket } from "../socket"

export default function ChatRoom({ route, navigation }) {
    const styles = useStyles();
    const { setMode, mode } = useThemeMode();
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [messages, setMessages] = useState([])
    const [id, setId] = useState(0)

    const { name, chatRoom } = route.params

    useEffect(() => {
        function onConnect() {
            if (chatRoom) {
                socket.timeout(5000).emit('join', { name: name, chatRoom: chatRoom })
            } else {
                socket.timeout(5000).emit('start', { name: name })
            }
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onUserIdAssignment(assignedId) {
            if (id === 0) {
                setId(assignedId)
            }
        }

        function onReceiveMessage(message) {
            let newMessages = [...messages, message]
            setMessages(newMessages)
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('assign', onUserIdAssignment);
        socket.on('messageFromServer', onReceiveMessage)

        return () => {
            // clean up
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('assign', onUserIdAssignment);
            socket.off('messageFromServer', onReceiveMessage)
        }
    }, []);

    function sendMessage(message) {
        socket.tiimeout(5000).emit('messageFromUser', {
            userId: userId,
            name: name,
            message: message
        })
    }

    function exitRoom() {
        socket.timeout(5000).emit('exit', { userId: userId, chatRoom: chatRoom })
    }

    const myID = 123
    const mockMessages = [
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
                        mockMessages.map((msgObj) => {
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
                </View>
                <KeyboardAvoidingView behavior="padding" style={styles.messageBox}>
                        <Input placeholder="Write a message" rightIcon={
                            <Button type="clear">
                                <Icon name="arrow-up" type="font-awesome" />
                            </Button>
                        } />
                    </KeyboardAvoidingView>
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