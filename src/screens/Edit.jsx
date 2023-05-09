import { TouchableWithoutFeedback, Keyboard, Text, StyleSheet, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
import * as Style from '../../assets/styles'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Edit({ navigation, route, ...props }) {

    const [note, setNote] = useState('')

    const handleEdit = async () => {
        const otherNotes = props.notes.filter(item => item !== route.params)
        props.setnotes([...otherNotes, note])
        await AsyncStorage.setItem('notes', JSON.stringify([...otherNotes, note]))
        setNote('')
        navigation.navigate('Notes')
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ padding: 20, justifyContent: 'space-around' }}>
                        <TextInput placeholder='Type Here...' multiline={true} style={styles.input} placeholderTextColor='black' value={props.note} onChangeText={setNote} />

                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (props.note == '') {
                                Alert.alert('Warning', 'Please type something')
                                return null
                            }
                            handleEdit()
                        }}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    input: {
        padding: 20,
        paddingTop: 20,
        width: '100%',
        fontSize: 19,
        color: 'black',
        fontWeight: '600',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        backgroundColor: 'white',
        borderColor: Style.color,
        borderWidth: 2,
        borderRadius: 5,
    },
    button: {
        marginTop: 15,
        width: '100%',
        backgroundColor: Style.color,
        borderRadius: 6,
        paddingVertical: 10
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center'
    }
})

export default Edit