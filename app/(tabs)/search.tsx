import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { icons } from '../../constants/icons'
import { images } from '../../constants/images'
import { fetchMovies } from '../../services/api'
import { useFetch } from '../../services/useFetch'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetchMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className='flex-1 bg-primary'>
      <Image
        source={images.bg} className='flex-1 absolute w-full z-0'
        resizeMode='cover'
      />
      <FlatList
        ListHeaderComponent={(
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image
                source={icons.logo}
                className='w-12 h-10'
              />
            </View>
            <View className='my-5'>
              <SearchBar placeholder='Search movies...' value={searchQuery} onChange={setSearchQuery} />
            </View>
            {moviesLoading && <ActivityIndicator size="large" color="#0000ff" className='my-3' />}
            {moviesError && <Text className='text-red-500 px-5 my-3'>Error: {moviesError.message}</Text>}
            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
              <>
                <Text className='text-xl text-white font-bold mb-2'>
                  Search results for&nbsp;
                  <Text className='text-accent uppercase'>{searchQuery}</Text>
                </Text>
              </>
            )}
          </>
        )}
        className='px-5'
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        renderItem={({ item }) => (
          <MovieCard {...item} />
        )}
        ListEmptyComponent={!moviesLoading && !moviesError ? (
          <View className='mt-10 px-5'>
            <Text className='text-center text-gray-500'>
              {searchQuery.trim() ? 'No movies found' : ''}
            </Text>
          </View>
        ) : null}
      />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})