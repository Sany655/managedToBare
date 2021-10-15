import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useHistory } from 'react-router-native';
import colors from '../colors';
import useStorage from '../hooks/useStorage';

const Todo = () => {
    const [input, setInput] = useState('')
    const [todo, setTodo] = useState([])
    const history = useHistory()
    const {
        storeData,
        getData,
        deleteData
    } = useStorage();

    useEffect(() => {
        const data = getData()
        data.then(res => {
            setTodo(res)
        })
    }, [])

    const handleAdd = () => {
        let id = todo.length > 0 ? todo[todo.length - 1].id + 1 : 1;
        if (input.length > 0) {
            setTodo([...todo, { id: id, todo: input }]);
            storeData([...todo, { id: id, todo: input }])
            setInput('')
            Keyboard.dismiss()
        }
    }

    const handleDeleteItem = (index) => {
        setTodo(todo.filter((t) => t.id != index));
        storeData(todo.filter((t) => t.id != index))
    }

    const handleRemove = () => {
        const removeAll = deleteData()
        removeAll.then(res => {
            console.log(res)
            setTodo([])
        })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleRemove}>
                <Text style={styles.delete}>Empty Todo</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    defaultValue={input}
                    onChangeText={(text) => { setInput(text) }}
                    placeholder='Write Todo'
                />
                <TouchableOpacity
                    onPress={handleAdd}>
                    <Text style={styles.button}>Add Todo</Text>
                </TouchableOpacity>
            </View>
            <FlatList data={todo}
                renderItem={({ item, index }) => <Text
                    style={styles.todo}
                    key={index}
                    onLongPress={() => handleDeleteItem(item.id)}
                    onPress={()=>history.replace(`/edit-todo/${item.id}`)}
                >
                    {item.id} -  {item.todo}
                </Text>
                }
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    inputContainer: {
        flexDirection: 'row',
    },
    input: {
        borderStyle: 'solid',
        borderColor: 'lightgray',
        borderWidth: 1,
        backgroundColor: 'white',
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: colors.green_1,
        paddingVertical: 15,
        paddingHorizontal: 15,
        color: 'black',
        flex: 1
    },
    delete: {
        padding: 10,
        textAlign: 'center',
        backgroundColor: colors.green_1,
        marginBottom: 10
    },
    todo: {
        padding: 5,
        marginTop: 5,
        backgroundColor: colors.green_1,
        color: 'black',
        fontSize: 25
    }
})

export default Todo
