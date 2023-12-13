import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';

const RecipeDetailsScreen = (props) => {

  const navigation = useNavigation()
  let item = props.route.params
  // const [isFavorite, setIsFavorite] = useState(false)
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMealData(item.idMeal)
  }, [])

  let getMealData = async (id) => {
    try
    {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      if(response && response.data){
        setMeal(response.data.meals[0])
        setLoading(false)
      }
    }
    catch(err)
    {
      console.log(err.message)
    }
  }

  // checking if there is indexes in the ingredients from the api
  const ingredientsIndexes = (meal) => {
    if(!meal) return []
    let indexes = []
    for(let i = 1; i <= 20; i++){
      if(meal['strIngredient'+i]){
        indexes.push(i)
      }
    }
    return indexes
  }

  //get Video id using regex
  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
          return match[1];
        }
        return null;
  }

  return (
    <ScrollView
      className='bg-white flex-1'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style='light' />

      {/* recipe image */}
      <View className='flex-row justify-center'>
        <Image 
          source={{ uri: item.strMealThumb }}
          style={{ width: wp(100), height: hp(45), borderRadius: 5
          }}
        />
      </View>
      {/* back button & fav button */}
      <View className='w-full absolute flex-row justify-between items-center pt-14'>
          <TouchableOpacity 
            className='p-[6px] rounded-full ml-5 bg-white'
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color='#f64e32' />
          </TouchableOpacity>

          {/* <TouchableOpacity 
            className='p-2 rounded-full mr-5 bg-white'
            onPress={() => setIsFavorite(prev => !prev)}
          >
            <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavorite ? 'red' : 'gray'} />
          </TouchableOpacity>       */}

      </View>

      {/* meal description */}
      {
        loading ? 
          <Loading size='large' className='mt-16' />
        :
          <View className='px-4 flex justify-center space-y-4 pt-8'>
            {/* name and area */}
            <View className='space-y-2'>
              <Text style={{fontSize: hp(3)}} className='font-bold flex-1 text-neutral-700'>
                {meal?.strMeal}
              </Text>
              <Text style={{fontSize: hp(2)}} className='font-medium flex-1 text-neutral-500'>
                {meal?.strArea}
              </Text>
            </View>
            

            {/* ingredients */}
            <View className='space-y-4'>
              <Text style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>
                Ingredients
              </Text>
              <View className='space-y-2 ml-3'>
              {ingredientsIndexes(meal).map((i) => {
                return (
                  <View className="flex-row space-x-4 items-center" key={i}>
                    <View
                      className="bg-[#f64e32] rounded-full"
                      style={{
                        height: hp(1.5),
                        width: hp(1.5),
                      }}
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{
                          fontSize: hp(1.7),
                        }}
                        className="font-medium text-neutral-800"
                      >
                        {meal["strIngredient" + i]}
                      </Text>
                      <Text
                        className="font-extrabold text-neutral-700"
                        style={{
                          fontSize: hp(1.7),
                        }}
                      >
                        {meal["strMeasure" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
              </View>
            </View>

            {/* instructions */}
            <View className='space-y-4'>
            <Text
              className="font-bold flex-1 text-neutral-700"
              style={{
                fontSize: hp(2.5),
              }}
            >
              Instructions
            </Text>

            <Text
              className="text-neutral-700"
              style={{
                fontSize: hp(1.7),
              }}
            >
              {meal?.strInstructions}
            </Text>
            </View>

            {/* recipe video */}
            {
              meal.strYoutube && (
                <View className='space-y-5'>
                  <Text style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>
                    Recipe Video
                  </Text>
                  <View>
                    <YoutubeIframe 
                      videoId={getYoutubeVideoId(meal.strYoutube)}
                      height={hp(30)}
                    />
                  </View>
                </View>
              )
            }

          </View>
      }
      
    </ScrollView>
  )
}

export default RecipeDetailsScreen