import { TouchableWithoutFeedback, Keyboard, Text, StyleSheet, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
import * as Style from '../../assets/styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

function AddNote({ navigation, ...props }) {

    const handleAdd = async () => {
        props.setnotes([...props.notes, props.note])
        await AsyncStorage.setItem('notes', JSON.stringify([...props.notes, props.note]))
        props.setnote('')
        navigation.navigate('Notes')
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ padding: 20, justifyContent: 'space-around' }}>
                        <TextInput placeholder='Type Here...' multiline={true} style={styles.input} placeholderTextColor='black' value={props.note} onChangeText={props.setnote} />

                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (props.note == '') {
                                Alert.alert('Warning', 'Please type something')
                                return null
                            }
                            handleAdd()
                        }}>
                            <Text style={styles.buttonText}>Add</Text>
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

export default AddNote