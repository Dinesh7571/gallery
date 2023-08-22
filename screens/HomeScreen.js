import { StyleSheet, View, FlatList, Dimensions, Image, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const API = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s'
const HomeScreen = () => {
    const [photos, setPhotos] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchAndCacheData = async () => {
        try {
            const cachedData = await AsyncStorage.getItem('cachedPhotos');
            if (cachedData) {
                setPhotos(JSON.parse(cachedData));
            }

            const response = await axios.get(API);
            const photoData = response.data.photos.photo;
            setPhotos(photoData);
            await AsyncStorage.setItem('cachedPhotos', JSON.stringify(photoData));
        } catch (error) {
            console.error('Error fetching and caching data:', error);
        }
    };

    useEffect(() => {
        fetchAndCacheData();
    }, []);

    const onRefresh = () => {
        setIsRefreshing(true);
        fetchAndCacheData().then(() => setIsRefreshing(false));
    };

    return (
        <View>
            <FlatList

                data={photos}
                keyExtractor={(item) => item.id}



                renderItem={({ item }) => (
                    <Image
                        style={{ width: windowWidth, height: item.height_s }}
                        source={{ uri: item.url_s }}
                    />
                )}

                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />}
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
