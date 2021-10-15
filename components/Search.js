import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native'
import colors from '../colors'

const Search = ({ search, handleSearch }) => {
    const [input, setInput] = useState(search)
    return (
        <View style={styles.searchBar}>
            <TextInput
                style={styles.input}
                placeholder='Search'
                onChangeText={t => setInput(t)}
                defaultValue={input}
            />
            <TouchableOpacity onPress={() => handleSearch(input)}>
                <Text style={styles.button}>Search</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    input: {
        borderStyle: 'solid',
        borderColor: 'lightgray',
        borderWidth: 1,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        flex:1
    },
    button:{
        backgroundColor:colors.green_1,
        padding:5,
        color:'white',
        flex:1
    }
})

export default Search;