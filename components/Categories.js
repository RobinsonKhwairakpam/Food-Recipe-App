import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Categories = ({categories, activeCategory, handleChangeCategory}) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='space-x-4 mt-5'
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
          categories.map((cat, index) => {

            let isActive = activeCategory === cat.strCategory
            let activeButtonClass = isActive ? 'bg-amber-400' : 'bg-black/10'

            return (
              <TouchableOpacity 
                onPress={() => handleChangeCategory(cat.strCategory)}
                key={index}
                className='flex items-center space-y-1'
              >
                <View className= {'rounded-full p-[6px] ' + activeButtonClass} >
                  <Image 
                    source={{ uri: cat.strCategoryThumb }} 
                    style={{ height: hp(6.5), width: hp(6.5) }}
                    className='rounded-full'
                  />
                </View>
                <Text className='text-neutral-600' style={{fontSize: hp(1.7)}}>
                  {cat.strCategory}
                </Text>                  
                
              </TouchableOpacity>
            )
          })
        }

      </ScrollView>
    </View>
  )
}

export default Categories