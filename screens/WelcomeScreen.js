import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {

    const navigation = useNavigation()

  return (
    <View className='flex-1 bg-red-500 items-center justify-center space-y-10'>
        <StatusBar style='light' />

        {/* image logo with rings */}
        <View className='bg-white/20 rounded-full' style={{padding: hp('4')}}>
            <View className='bg-white/20 rounded-full' style={{padding: hp('4')}}>
            
            <Image source={require('../assets/images/food-icon.jpg')}
                style={{width: hp(20), height: hp(20)}}
                className='rounded-full'
             />
                
            </View>
        </View>

        {/* Title and Subtitle */}
      <View className="flex items-center space-y-3">  
        <Text
            className="font-extrabold tracking-widest text-fuchsia-100"
            style={{
                fontSize: hp(3.8),
            }}
        >
            Food Recipe App
        </Text>  

        <Text
          className="text-white tracking-widest font-medium"
          style={{
            fontSize: hp(2.3),
          }}
        >
          Make your own Food at Home 
        </Text>
      </View>

      <View className='hover:cursor'>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            paddingVertical: hp(1.5),
            paddingHorizontal: hp(5),
            borderRadius: hp(1.5),
          }}
          onPress={() => navigation.navigate("Home")}          
        >
          <Text
            style={{
              color: "#f64e32",
              fontSize: hp(2.2),
              fontWeight: "medium",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default WelcomeScreen