import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import { icons } from '../../constants/icons'
import { images } from '../../constants/images'

const TabIcon = ({ icon, text, focused }: { focused: boolean; icon: ImageSourcePropType; text: string }) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 justify-center mt-4 items-center rounded-full overflow-hidden'
      >
        <Image source={icon} tintColor="#151312" className='size-5' />
        {focused && (
          <Text className='text-secondary text-base font-semibold ml-2'>{text}</Text>
        )}
      </ImageBackground>
    )
  } else {
    return (
      <View className='size-full justify-center items-center mt-4 rounded-full'>
        <Image source={icon} tintColor="#A8B5DB" className='size-5' />
      </View>
    )
  }
}

const _Layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarItemStyle: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      tabBarStyle: {
        backgroundColor: '#0F0D23',
        borderRadius: 50,
        marginHorizontal: 20,
        marginBottom: 36,
        height: 52,
        position: 'absolute',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#0F0D23',
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} text='Home' focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.search} text='Search' focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.save} text='Saved' focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} text='Profile' focused={focused} />
          ),
        }}
      />
    </Tabs>
  )
}

export default _Layout

const styles = StyleSheet.create({})