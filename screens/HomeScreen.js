import { StyleSheet, View, FlatList, Dimensions, Image, Button, ActivityIndicator  } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HomeScreen = () => {
    const [photos, setPhotos] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    
    const API = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=${currentPage}&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s`



    const fetchAndCacheData = async () => {
        setIsRefreshing(true);
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
        }finally {
            setIsRefreshing(false);
          }
    };

    useEffect(() => {
        fetchAndCacheData();
    }, [currentPage]);





    return (
        <ScrollView>

            {/* Render photos */}
            {photos.map(photo => (
                <Image
                    style={{ width: windowWidth, height: photo.height_s }}
                    key={photo.id} source={{ uri: photo.url_s }}
                />
            ))}


             {/* Loading indicator */}
             
      {isRefreshing && <ActivityIndicator size="large" color="#0000ff" />}


            {/* Page buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button title="Page 1" onPress={() => setCurrentPage(1)} disabled={currentPage === 1} />
                <Button title="Page 2" onPress={() => setCurrentPage(2)} disabled={currentPage === 2} />
                <Button title="Page 3" onPress={() => setCurrentPage(3)} disabled={currentPage === 3} />
            </View>


        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
