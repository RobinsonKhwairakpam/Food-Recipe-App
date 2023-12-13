import React, { useEffect, useState } from 'react'
import Recipes from './Recipes';
import axios from 'axios';
import { View } from 'react-native';

const SearchResults = ({searchValues}) => {

    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        getSearchResults(searchValues)
      },[searchValues])

    let getSearchResults = async (searchName) => {
        try
        {
          const response = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${searchName}`)
          if(response && response.data){
            setSearchResults(response.data.meals)
          }
        }
        catch(err)
        {
          console.log(err.message)
        }
      }

  return (
    <View className='mt-2'>
       <Recipes searchResults={searchResults} />    
    </View>
  )
}

export default SearchResults