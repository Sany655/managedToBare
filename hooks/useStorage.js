import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'

const useStorage = () => {
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('todo', jsonValue)
        } catch (e) {
            console.log(e);
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('todo')
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.log(e);
        }
    }

    const deleteData = async () => {
        try {
            const jsonValue = await AsyncStorage.removeItem('todo')
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.log(e);
        }
    }

    return {
        storeData,
        getData,
        deleteData
    }
}

export default useStorage
