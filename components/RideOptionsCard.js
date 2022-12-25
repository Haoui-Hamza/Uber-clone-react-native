import React,{useState} from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList,Image } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from "tailwind-react-native-classnames"
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

let data = [
    {
        id:"12",
        title:"UberX",
        multiplier:1,
        image:"https://links.papareact.com/3pn"
    },
    {
        id:"13",
        title:"Uber XL",
        multiplier:1.2,
        image:"https://links.papareact.com/5w8"
    },
    {
        id:"124",
        title:"Uber LUX",
        multiplier:1.75,
        image:"https://links.papareact.com/7pf"
    },
]

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const  [selected,setSelected] = useState(null)
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    const metrePrice = 0.03
    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity 
                    onPress={()=> navigation.navigate("NavigateCard")} 
                    style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`} 
                >
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`} >Select a ride - {Math.round(travelTimeInformation?.distance.value/1000)} KM</Text>
            </View>
            <FlatList data={data}
                keyExtractor={(item)=>item.id}
                renderItem={({item:{id,title,multiplier,image},item})=>(
                    <TouchableOpacity onPress={()=>setSelected(item)} 
                        style={tw`flex-row justify-between items-center px-10 ${id===selected?.id && 'bg-gray-200'}`} 
                    >
                        <Image
                            style={{width:100,height:100,resizeMode:"contain"}}
                            source={{uri:image}}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration?.text} Travel time</Text>
                        </View>
                        <Text style={tw`text-xl`} >{Math.round(travelTimeInformation?.distance?.value*metrePrice*multiplier)} DA</Text>
                    </TouchableOpacity>
                )}
            />
            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
                    <Text style={tw`text-center text-white text-xl`}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
 
export default RideOptionsCard
 