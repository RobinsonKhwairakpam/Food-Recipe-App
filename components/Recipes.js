import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';

const Recipes = ({meals, categories, searchResults}) => {

    const navigation = useNavigation()

  return (
    <View className='mx-4 space-y-4 mt-4'>
      <Text className='text-neutral-600 font-semibold' style={{fontSize: hp(2.5)}}>
       {searchResults ? 'Search Results' : 'Recipes' }
      </Text>

        <View>
        {
            //if there is search results, display the result recipes
            searchResults ? 
            <MasonryList
                data={searchResults}
                keyExtractor={(item) => item.idMeal}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
                // refreshing={isLoadingNext}
                // onRefresh={() => refetch({first: ITEM_CNT})}
                onEndReachedThreshold={0.1}
                // onEndReached={() => loadNext(ITEM_CNT)}
            />
            : 
            //fixing a bug with Masonry List where the list doesnt appear if categories are loaded
            categories.length === 0 || meals.length === 0 ? 
                <Loading size='large' className='mt-20' />
              : (
                <MasonryList
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
                    // refreshing={isLoadingNext}
                    // onRefresh={() => refetch({first: ITEM_CNT})}
                    onEndReachedThreshold={0.1}
                    // onEndReached={() => loadNext(ITEM_CNT)}
                />
            )
        }
        
      </View>
    </View>

    
  )
}

const RecipeCard = ({item, index, navigation}) => {
    let isEven = index % 2 == 0
    return (
        <View>
            <Pressable
                style={{width: '100%', paddingLeft: isEven? 0:8, paddingRight: isEven? 8:0}}
                className='flex justify-center mb-4 space-y-1'
                onPress={() => navigation.navigate('RecipeDetail', {...item})}
            >
                <Image 
                    source={{uri: item.strMealThumb}} 
                    style={{height: index%3 == 0 ? hp(25) : hp(35), width: '100%'}}
                    className='bg-black/5 rounded-3xl'
                />
                <Text style={{fontSize: hp(1.7)}} className='font-semibold text-neutral-600 ml-2' >
                    {
                        item.strMeal.length > 20 ? item.strMeal.slice(0,20)+'...' : item.strMeal
                    }
                </Text>
            </Pressable>
        </View>
    )
}

export default Recipes