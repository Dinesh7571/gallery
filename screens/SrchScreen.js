import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { Snackbar } from 'react-native-paper'


const SrchScreen = () => {
    const [inputValue, setInputValue] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [data, setData] = useState(null);
    const [allphotos,setAllphotos]=useState([])
   // const [visible,setVisible]=useState(false)
   

   // const onDismissSnackBar = () => setVisible(false);
    const handleInputChange = (text) => {
        setInputValue(text);
       // console.log(inputValue)
      };
    
      const handleSearchPress = () => {
        setSearchResult(toString(inputValue));
        fetchPhotos();
      };

      const fetchPhotos = async () => {
        const Api = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s&text=${inputValue}`;
      
        try {
          const response = await axios.get(Api);
      
          if (response && response.data && response.data.photos && response.data.photos.photo) {
            const allPhotos = response.data.photos.photo;
            setAllphotos(allPhotos);
          } else {
            console.error('Invalid response structure:', response);
          }
        } catch (error) {
          console.error('Error fetching photos:', error);
          // Handle error, show message, etc.
        }
      };


 


 
    
 

  return (
   <SafeAreaView>
   <View style={{margin:10,backgroundColor:'gray' ,padding:8,borderRadius:5,flexDirection:'row',alignItems:'center'}}>
    <TextInput
     onChangeText={handleInputChange}
     value={inputValue}
     placeholder="Enter something..."
     style={{color:'white'}}/>
    <TouchableOpacity onPress={handleSearchPress} style={{marginLeft:'auto'}}>
    <FontAwesome name="search" size={24} color="black" />
    </TouchableOpacity>

   
   </View>

   <ScrollView>
   {allphotos.map((item) => (
    <Image
      key={item.id}
      source={{ uri: item.url_s }}
      style={{ height: parseInt(item.height_s), width: 200 }}
    />
  ))}
    </ScrollView>
    {/* <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            searchResult
          },
        }}>
        Hey there! I'm a Snackbar.
      </Snackbar>
   */}
   </SafeAreaView>
  )
}

export default SrchScreen

const styles = StyleSheet.create({})