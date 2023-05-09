import { SafeAreaView, Text, StyleSheet, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import * as Style from '../../assets/styles'
import Entypo from 'react-native-vector-icons/Entypo'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Notes({ navigation, ...props }) {
    const isFocused = useIsFocused()

    const [searchText, setsearchtext] = useState('')
    const [filteredNotes, setfilteredNotes] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('notes').then((value) => {
            if (value != null) {
                setfilteredNotes(JSON.parse(value))
                return
            }
            return null
        })

    }, [isFocused])

    useEffect(() => {
        if (props.notes) {
            const filteredNotes = props.notes.filter(item => item?.toLowerCase().includes(searchText.toLowerCase()))
            setfilteredNotes(filteredNotes)
            return
        }
        return null
    }, [searchText])

    const deleteNote = async (item) => {
        const notDeletedNote = props.notes.filter(note => note !== item)
        const deletedNote = props.notes.filter(note => note == item)
        props.setnotes(notDeletedNote)
        await AsyncStorage.setItem('notes', JSON.stringify(notDeletedNote))
        setfilteredNotes(notDeletedNote)
        props.setDeletedNotes([...deletedNote, ...props.deletedNotes])
        await AsyncStorage.setItem('delete', JSON.stringify([...deletedNote, ...props.deletedNotes]))
    }

    const showAlert = async () => {
        Alert.alert(
            'Warning',
            'Do you want to delete all notes?',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes', onPress: async () => {
                        props.setnotes([])
                        setfilteredNotes([])
                        await AsyncStorage.setItem('notes', JSON.stringify([]))
                    }
                },
            ],
            { cancelable: false }
        );
    };

    const renderItem = ({ item }) => {

        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemTextDeleteContainer}>
                    <View style={styles.itemTextContainer}>
                        <Text style={styles.notesText}>{item}</Text>
                    </View>
                    <TouchableOpacity onPress={() => deleteNote(item)}>
                        <View style={styles.itemDeleteContainer}>
                            <Text style={styles.deleteText}>X</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemDateEditContainer}>

                    <TouchableOpacity onPress={() => navigation.navigate('Edit', item)}>
                        <View style={styles.itemEditContainer}>
                            <Text style={styles.editText}>Edit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.noteContainer}>
                <View style={styles.noteTextContainer}>
                    <Text style={styles.noteText}>Your Notes</Text>
                </View>
                <View style={styles.noteBtnContainer}>

                    <TouchableOpacity onPress={() => navigation.navigate('DeletedNotes')}>
                        <View style={styles.icon}>
                            <Entypo name='trash' size={28} color='white' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('AddNote')}>
                        <View style={styles.icon}>
                            <Entypo name='plus' size={28} color='white' />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.totalContainer}>
                <Text style={styles.totaltext}>Total: {props.notes.length}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.searchAreaContainer}>
                <View style={styles.searchContainer}>
                    <TextInput placeholder='Search...' placeholderTextColor={Style.color} style={styles.searchInput} onChangeText={setsearchtext} />
                </View>
                <View style={styles.searchBtnContainer}>
                    <TouchableOpacity onPress={showAlert}>
                        <View style={styles.iconClear}>
                            <Text style={{ color: 'white' }}>Clear All</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.flatlist}>
                <FlatList
                    data={filteredNotes}
                    renderItem={renderItem}
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 15
    },
    noteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    noteTextContainer: {

    },
    noteText: {
        fontSize: 45,
        fontWeight: '700',
        color: Style.color
    },
    noteBtnContainer: {
        flexDirection: 'row',
        gap: 8
    },
    icon: {
        width: 50,
        height: 50,
        backgroundColor: Style.color,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    totalContainer: {
        marginTop: 14
    },
    totaltext: {
        fontSize: 25,
        color: Style.color,
        fontWeight: '700'
    },
    divider: {
        marginTop: 5,
        borderBottomWidth: 2,
        borderColor: 'black'
    },
    searchAreaContainer: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchContainer: {
        width: '80%'
    },
    searchInput: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'black',
        marginRight: 5,
        paddingLeft: 20,
        color: Style.color
    },
    searchBtnContainer: {
    },
    iconClear: {
        width: 70,
        height: 50,
        backgroundColor: Style.color,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatlist: {
    },
    itemContainer: {
        backgroundColor: Style.color,
        gap: 10,
        marginTop: 10,
        padding: 15,
        borderRadius: 6
    },
    itemTextDeleteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemTextContainer: {
        flexDirection: 'row',
        width: '90%'
    },
    itemDeleteContainer: {
        backgroundColor: 'white',
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    itemDateEditContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemDateContainer: {
        width: '90%'
    },
    itemEditContainer: {
        width: 30,
        height: 20,
        borderRadius: 3,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    notesText: {
        color: 'white',
        fontSize: 18
    },
    deleteText: {
        color: 'black'
    },
    editText: {
        color: 'black'
    }
})

export default Notes