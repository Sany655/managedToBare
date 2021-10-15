import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

const About = () => {
    return (
        <View style={styles.c}>
            <Text>We are React Developers, Contact us</Text>
            <Text>mazharulalam26@gmail.com</Text>
            <StatusBar style="auto" />
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

export default About
