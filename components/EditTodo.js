import React, { useEffect, useState } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { useHistory } from 'react-router'
import colors from '../colors'
import useStorage from '../hooks/useStorage'

const EditTodo = ({ match }) => {
    const { getData, storeData } = useStorage()
    const [input, setInput] = useState('')
    const [todo, setTodo] = useState([])
    const [todoOne, setTodoOne] = useState({})
    const history = useHistory()
    useEffect(() => {
        const data = getData();
        data
        .then(res => {
            setTodo(res)
            setTodoOne(res.find(f => f.id == match.params.id))
            setInput(res.find(f => f.id == match.params.id).todo)
        })
        .catch(er=>console.log(er))
    }, [])

    const handleUpdate = () => {
        storeData([todoOne,...todo.filter(t => t.id != match.params.id)])
        ToastAndroid.show('Updated successfully', ToastAndroid.SHORT)
        Keyboard.dismiss()
    }

    return (
        <View>
            <Text style={styles.text}>Update : {todoOne?.todo}</Text>
            <TextInput
                style={styles.input}
                defaultValue={todoOne?.todo}
                onChangeText={(text) => setTodoOne({ ...todoOne, todo: text })}
                placeholder='Write Todo'
            />
            <TouchableOpacity onPress={handleUpdate}>
                <Text style={styles.btn}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>history.push('/todo')}>
                <Text style={styles.btn}>Back to Todos</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: colors.green_1,
        color: 'black',
        padding: 25,
        fontSize: 25,
        margin: 15
    },
    input: {
        margin: 15,
        padding: 10,
        fontSize: 15,
        borderColor: 'lightgray',
        borderWidth: 1
    },
    btn: {
        backgroundColor: colors.green_1,
        color: 'black',
        padding: 10,
        marginHorizontal: 15,
        marginBottom:10,
        textAlign: 'center'
    }
})

export default EditTodo
