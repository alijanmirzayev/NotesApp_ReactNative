import { SafeAreaView, Text, StyleSheet, View, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import * as Style from '../../assets/styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

function DeletedNotes({ navigation, ...props }) {

    const deleteOneNote = async (item) => {
        const otherNote = props.deletedNotes.filter(e => e !== item)
        props.setDeletedNotes(otherNote)
        await AsyncStorage.setItem('delete', JSON.stringify(otherNote))
    }

    const empty = async () => {
        props.setDeletedNotes([])
        await AsyncStorage.setItem('delete', JSON.stringify([]))
    }

    const undoAll = async () => {
        props.setnotes([...props.notes, ...props.deletedNotes])
        await AsyncStorage.setItem('notes', JSON.stringify([...props.notes, ...props.deletedNotes]))
        props.setDeletedNotes([])
        await AsyncStorage.setItem('delete', JSON.stringify([]))
    }

    const renderItem = ({ item }) => {

        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemTextDeleteContainer}>
                    <View style={styles.itemTextContainer}>
                        <Text style={styles.notesText}>{item}</Text>
                    </View>
                    <TouchableOpacity onPress={() => deleteOneNote(item)}>
                        <View style={styles.itemDeleteContainer}>
                            <Text style={styles.deleteText}>X</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.headerContainer}>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={undoAll}>
                        <Text style={styles.btnText}>Undo All</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.totalText}>Total: {props.deletedNotes.length}</Text>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={empty}>
                        <Text style={styles.btnText}>Empty</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.divider} />

            <FlatList
                data={props.deletedNotes}
                renderItem={renderItem}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 15
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        backgroundColor: Style.color,
        borderRadius: 6
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    totalText: {
        color: Style.color,
        fontSize: 20,
        fontWeight: '500',
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    divider: {
        marginTop: 5,
        borderBottomWidth: 2,
        borderColor: 'black'
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

export default DeletedNotes