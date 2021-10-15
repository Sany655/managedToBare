import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'react-router-native'
import colors from '../colors'

export default function Header() {
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>Logo</Text>
            <View style={styles.navbar}>
                <Link to='/'>
                    <Text style={styles.text}>Home</Text>
                </Link>
                <Link to='/images'>
                    <Text style={styles.text}>Images</Text>
                </Link>
                <Link to='/todo'>
                    <Text style={styles.text}>Todo</Text>
                </Link>
                <Link to='/test'>
                    <Text style={styles.text}>Test</Text>
                </Link>
                <Link to='/about'>
                    <Text style={styles.text}>About</Text>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.green_2
    },
    text: {
        color: 'white',
        marginLeft: 5,
        marginRight: 5
    },
})