import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, Text, TouchableOpacity, View } from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

const Testing = () => {
    const [state, setState] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('images').then((r) => {
            setState(r)
        })
    }, [])

    useEffect(() => {
        (async () => {
              const { status } = await ImagePicker.requestCameraPermissionsAsync();
              if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
              }else{
                const per = await ImagePicker.getMediaLibraryPermissionsAsync();
                  alert(per)
              }
          })();
    }, [])

    const download = () => {
        const url = 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg'
        FileSystem.downloadAsync(url,FileSystem.documentDirectory+'field-6574455__480.jpg')
        .then(({uri})=>{
            AsyncStorage.setItem('images',uri)
            .then(res=>{
                console.log('downloaded and saved: ' + uri)
                setState(uri)
            })
            .catch(error=>console.log(error))
        }).catch(error=>console.log(error))
    }

    const requestPermission = async () => {
        try {
            const granted = PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage permission required',
                    message: 'App needs access to yout storage to download photos'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage Permissions granted');
                return true;
            }else{
                alert('Storage Permission Denied')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const migrateFile = async () => {
        const permission = await requestPermission()
        if (permission) {
            MediaLibrary.addAssetsToAlbumAsync([state],'Download',false).then(res=>{
                console.log(res);
            }).catch(error=>{
                console.log(error);
            })            
        }
    }


    return (
        <View>
            <TouchableOpacity style={{margin:25}} onPress={()=>console.log(state)}><Text>Get camera</Text></TouchableOpacity>
            
            <TouchableOpacity style={{margin:25}} onPress={()=>console.log(state)}><Text>Async storage data in state</Text></TouchableOpacity>

            <TouchableOpacity style={{margin:25}} onPress={()=>MediaLibrary.getPermissionsAsync().then(res=>console.log(res))}><Text>Permission status</Text></TouchableOpacity>

            <TouchableOpacity style={{margin:25}} onPress={migrateFile}><Text>migrate</Text></TouchableOpacity>

            <TouchableOpacity style={{margin:25}} onPress={download}><Text>download image and save in async storage</Text></TouchableOpacity>
        </View>
    )
}

export default Testing
