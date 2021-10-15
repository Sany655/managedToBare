import React, { useEffect, useState } from 'react'
import { Image, Keyboard, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import colors from '../colors'
import Search from './Search'
import * as FileSystem from 'expo-file-system'

const Images = () => {
    const [images, setImages] = useState([])
    const [search, setSearch] = useState('mekka')

    const handleSearch = (t) => {
        if (t.length > 0) {
            setSearch(t)
        } else {
            alert('write something to search')
        }
        Keyboard.dismiss()
    }

    const handleDownload = (url) => {
        FileSystem.downloadAsync(
            url,
            FileSystem.documentDirectory + url.split('/')[url.split('/').length-1]
          )
            .then(({ uri }) => {
              console.log('Finished downloading to ', uri);
            })
            .catch(error => {
              console.error(error);
            });
    }

    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=${'15674931-a9d714b6e9d654524df198e00&q'}=${search}&image_type=photo&pretty=true`)
            .then(res => res.json())
            .then(data => setImages(data.hits))
    }, [search])

    return (
        <View style={styles.container}>
            <Search search={search} handleSearch={handleSearch} />
            <Text style={styles.pageHeader}>Total Images : {images.length}</Text>
            <ScrollView style={styles.images}>
                {
                    images.map((book, i) => (
                        <Pressable key={i} onLongPress={() => { handleDownload(book.largeImageURL) }}>
                            <View style={styles.card}>
                                <Image style={styles.image} key={i} source={{ uri: book.webformatURL }}/>
                            </View>
                        </Pressable>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    pageHeader: {
        fontSize: 22,
        marginBottom: 10,
        marginTop: 10
    },
    image: {
        width: '100%',
        borderRadius: 15,
        height: 250
    },
    container: {
        margin: 20
    },
    card: {
        backgroundColor: colors.green_1,
        borderRadius: 15,
        padding: 10,
        marginBottom: 20
    },
    images: {
        marginBottom: 150
    }
})

export default Images
