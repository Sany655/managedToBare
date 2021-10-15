import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

const Home = () => {
    return (
        <View style={styles.c}>
            <Text>Some Images on 2nd page.</Text>
            <Text>Next day work is expo android permissions</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    c: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;