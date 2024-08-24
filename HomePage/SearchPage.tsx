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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// npm install react-native-parallax-scroll-view --save

const windowHeight = Dimensions.get('window').height;

const App = ({router, navigation}: any) =>{
  const [recommendation, setReccomendation] = useState([
  {
    id: 1,
    Type: "All Fans",
  },
  {
    id: 2,
    Type: "Bladeless Fan",
  },
  {
    id: 3,
    Type: "Table Fan",
  },
  {
    id: 4,
    Type: "Ceiling Fan"
  }
  ]);

  const [textInput, setTextInput] = useState('')

  return(
    <SafeAreaView style={styles.allContainer}>
        <View style={styles.topNavContainer}>
            <TouchableNativeFeedback
                onPress={() => navigation.goBack()}
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
                    onChangeText={setTextInput}
                    value={textInput}
                    placeholder="Type Here bish"
                />
                <MaterialCommunityIcons  
                    name="cloud-search-outline"
                    style={{
                        fontSize: 24,
                        color: '#487df7',
                        paddingTop: 12,
                        marginHorizontal: 15,
                    }}
                />
            </View>
        </View>
        <View>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data = {recommendation}
                renderItem={({ item }) => {
                    return(
                        <TouchableNativeFeedback>
                            <View style={styles.recoView}>
                                <Text style={styles.recoText}>{item.Type}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    )
                }}
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
        maxHeight: 75,
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