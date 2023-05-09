import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet } from 'react-native';
import Notes from './src/screens/Notes';
import DeletedNotes from './src/screens/DeletedNotes';
import AddNote from './src/screens/AddNote';
import Edit from './src/screens/Edit';
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Stack = createNativeStackNavigator()

function App() {

  const [note, setnote] = useState<String>('')
  const [notes, setnotes] = useState([])
  const [deletedNotes, setDeletedNotes] = useState([])
  useEffect(() => {
    AsyncStorage.getItem('notes').then((value) => {
      if (value != null) {
        setnotes(JSON.parse(value))
        return
      }
      return null
    }).catch((error) => {
      console.log(error);
      // burada hata durumunda yapılacakları belirtebilirsiniz
    });
  }, [])

  useEffect(() => {
    AsyncStorage.getItem('delete').then((value) => {
      if (value != null) {
        setDeletedNotes(JSON.parse(value))
        return
      }
      return null
    }).catch((error) => {
      console.log(error);
      // burada hata durumunda yapılacakları belirtebilirsiniz
    });
  }, [])

  return (

    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='Notes' options={{ headerShown: false }}>
          {props => <Notes {...props} notes={notes} setnotes={setnotes} deletedNotes={deletedNotes} setDeletedNotes={setDeletedNotes} />}
        </Stack.Screen>

        <Stack.Screen name='AddNote' options={{ headerTitle: 'Add New Note' }}>
          {props => <AddNote {...props} note={note} setnote={setnote} notes={notes} setnotes={setnotes} />}
        </Stack.Screen>

        <Stack.Screen name='Edit' options={{ headerTitle: 'Edit Note' }}>
          {props => <Edit {...props} notes={notes} setnotes={setnotes} />}
        </Stack.Screen>

        <Stack.Screen name='DeletedNotes' options={{ headerTitle: 'Deleted Notes' }}>
          {props => <DeletedNotes {...props} notes={notes} setnotes={setnotes} deletedNotes={deletedNotes} setDeletedNotes={setDeletedNotes} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>

  )
}

const styles = StyleSheet.create({

});

export default App;
