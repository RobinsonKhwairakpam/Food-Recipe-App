import { View, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { UserIcon, BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';
import SearchResults from '../components/SearchResults';

const HomeScreen = () => {

    const [activeCategory, setActiveCategory] = useState('Beef')
    const [categories, setCategories] = useState([])
    const [meals, setMeals] = useState([])

    // check if search bar is focus for search results
    const [isSearchFocused, setIsSearchFocused] = useState(false)
    const [searchValues, setSearchValues] = useState("")

    const handleSearchFocus = () => {
      setIsSearchFocused(true);
    };
  
    const handleSearchBlur = () => {
      setIsSearchFocused(false);
    };

    useEffect(() => {
      getCategories()
      getRecipes()
    },[])

    const handleChangeCategory = category => {
      setActiveCategory(category)
      getRecipes(category)
      setMeals([])
    }

    let getCategories = async () => {
      try
      {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        if(response && response.data){
          setCategories(response.data.categories)
        }
      }
      catch(err)
      {
        console.log(err.message)
      }
    }

    let getRecipes = async (category='Beef') => {
      try
      {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        if(response && response.data){
          setMeals(response.data.meals)
        }
      }
      catch(err)
      {
        console.log(err.message)
      }
    }

  return (
    <View className='flex-1 bg-white'>
      <StatusBar style='dark' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className='pt-12 space-y-6'
      >
        <View className='flex-row items-center justify-between mx-4 mb-2'>
          <UserIcon color='gray' size={hp(4.5)} />
          <BellIcon color='gray' size={hp(4.5)} />
        </View>

        {/* Search Bar */}
        <View className='mx-4 p-[8px] bg-black/10 flex-row items-center rounded-md'>
          <TextInput 
            placeholder='Search recipe'
            placeholderTextColor={'gray'}
            style={{fontSize: hp(1.8)}}
            className='flex-1 pl-3 mb-1 tracking-wider text-base'
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            value={searchValues}
            onChangeText={(text) => setSearchValues(text)}
          />
          <View className='bg-white p-2 rounded-full'>
            <MagnifyingGlassIcon color='gray' size={hp(2.6)} strokeWidth={3} />
          </View>
        </View>

        {/* display if search bar is not focused */}
        {searchValues.length > 0 ? 
        <SearchResults searchValues={searchValues} />
        :
        <>
          {/* Categories */}        
          <View>
            {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
          </View>

          {/* Recipes */}
          <View>
            <Recipes meals={meals} categories={categories} />
          </View>
        </>
        }        

      </ScrollView>

    </View>
  )
}

export default HomeScreen