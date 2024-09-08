import { forNoAnimation } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    TextInput, 
    Text, 
    TouchableNativeFeedback,
    FlatList,
    Dimensions,
    SafeAreaView,
    Image,
} from 'react-native';
import io from 'socket.io-client';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// npm install react-native-parallax-scroll-view --save

const windowHeight = Dimensions.get('window').height;

const socket = io('http://127.0.0.1:3000');

const App = ({router, navigation}: any) =>{
  const [recommendationName, setReccomendationName] = useState([]);
  
  useEffect(() => {
    // Request reccomendations names
    fetch('http://127.0.0.1:3000/products/random')
        .then(response => response.json())
        .then(data => {
            setReccomendationName(data.products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        })
  }, [])

  const [querySearch, setQuerySearch] = useState('');

  //For rotating search bar text
  const [placeholderText, setPlaceHolderText] = useState('Search.....');
  useEffect(() => {
    // Can use flask to retrieve fan names to place here or hardcode it lol
    const placeHolderOptions = ['Bladeless fan....', 'Over 9000 fans available....', 'Type here to search for fans....', 'Explore our fans....'];

    let currentIndex = 0;

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % placeHolderOptions.length;
      setPlaceHolderText(placeHolderOptions[currentIndex]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return(
    <SafeAreaView style={styles.allContainer}>
        <View style={styles.topNavContainer}>
            <TouchableNativeFeedback
                onPress={() => navigation.navigate('HomePage')}
            >
                <MaterialCommunityIcons
                    name="arrow-left"
                    style={{
                        fontSize: 45,
                        paddingTop: 15,
                        paddingLeft: 5,
                        color: '#487df7',
                    }}
                />
            </TouchableNativeFeedback>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    value={querySearch}
                    onChangeText={(text) => setQuerySearch(text)}
                    onSubmitEditing={() => navigation.navigate('HomePage', {
                        search: querySearch
                    })}
                    placeholder={placeholderText}
                />
                <TouchableNativeFeedback onPress={() => navigation.navigate('HomePage', {
                        search: querySearch
                    })}
                >
                    <MaterialCommunityIcons  
                        name="cloud-search-outline"
                        style={{
                            fontSize: 24,
                            color: '#487df7',
                            paddingTop: 12,
                            marginHorizontal: 15,
                        }}
                    />
                </TouchableNativeFeedback>
            </View>
        </View>
        <View>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data = {recommendationName}
                renderItem={({ item }) => {
                    return(
                        <TouchableNativeFeedback onPress={() => {
                            navigation.navigate('Home',{
                                screen:'ProductPage',
                                params:{
                                  product_name: item.product_name,
                                  product_qty: item.product_qty,
                                  product_desc: item.product_desc,
                                  product_img: item.product_img,
                                  product_price: item.product_price,
                                  product_type: item.product_type,
                                }})}}>
                            <View style={styles.recoView}>
                                <Text style={styles.recoText}>{item.product_name}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    )
                }}
            />
        </View>
        <View style={{paddingTop: 50}}>
            <Image 
                source={require('./Fan.gif')}
            />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    allContainer: {
        flex: 1,
    },
    topNavContainer: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 75,
    },
    searchContainer: {
        flexDirection: 'row',
        flex: 0.9,
        marginTop: 12,
        margin: 25,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: -25,
        borderRadius: 8,
        maxHeight: 50,
        color: '#666',
        backgroundColor: '#e9e9e9',
    },
    input: {
        flex: 1,  
    },
    recoView: {
        borderBottomWidth: 2,
        borderColor: '#d1d1d1',
    },
    recoText: {
        padding: 15,
        fontSize: 25,
        color: '#3D3D3D',
    }
})
export default App;