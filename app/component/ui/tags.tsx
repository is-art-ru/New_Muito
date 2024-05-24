import { ScrollView, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Белый, Бирюзовый, Бирюзовый50, Фон } from '../../GLOBAL';
import { useEffect, useState } from 'react';
import { styles } from '../../styles';
 
export function Tags(props:{default?:string, data:{name:string, value:string, colorText?:string, color?:string, colorTextInActive?:string, colorInActive?:string}[], styleContainer?: StyleProp<ViewStyle>, style?: StyleProp<ViewStyle>, onPress?:(value:string)=>void}) {
    const [active, setActive] = useState('-1')
    useEffect(()=>setActive(props.default),[props.default])
    return (
        <View>
            <ScrollView showsHorizontalScrollIndicator={false} style={[{marginVertical:20},props.styleContainer]} contentContainerStyle={[{gap:15, paddingHorizontal:16, flexGrow:1},props.style]} horizontal>
                {props.data&& 
                    props.data.map((el,i)=>(
                        <TouchableOpacity 
                            key={i}
                            activeOpacity={0.7}
                            onPress={()=>{
                                !!props.onPress && props.onPress(el.value)
                                setActive(el.value)
                            }}
                            style={{borderColor:active == el.value ? (el.color ?? Бирюзовый50) : (el.colorInActive ?? Фон), paddingVertical:6, backgroundColor:active == el.value ? (el.color ?? '#17171A') : Белый, paddingHorizontal:13, borderWidth:1, borderRadius:20}}
                        >
                            <Text style={[styles.smallText,{color:active == el.value ? (el.colorText ?? Белый) : (el.colorTextInActive ?? 'white')}]}>{el.name}</Text>
                        </TouchableOpacity>
                    )) 
                }
            </ScrollView>
        </View>
    )
}

export function TagsNoScroll(props:{default?:string, data:{name:string, value:string, colorText?:string, color?:string}[], style?: StyleProp<ViewStyle>, onPress?:(value:any[])=>void}) {
    const [active, setActive] = useState([])
    // useEffect(()=>setActive(props.default),[props.default])
    return (
        <View style={[{gap:10, alignItems:'center', flexGrow:1, flexDirection:'row', flexWrap:"wrap"},props.style]}>
            {props.data&& 
                props.data.map((el,i)=>(
                    <TouchableOpacity 
                        key={i}
                        activeOpacity={0.7}
                        onPress={()=>{
                            const tmp = active
                            const index = tmp?.findIndex(value => value == el?.value)
                            if (index==-1) {
                                if (tmp.length != 10) {
                                    tmp.push(el.value)
                                }
                            } else {
                                tmp.splice(index,1)
                            }
                            !!props.onPress && props.onPress(tmp)
                            setActive([...tmp])
                        }}
                        style={{borderColor:Бирюзовый50, paddingVertical:6, backgroundColor:active?.findIndex(value => value == el?.value)!=-1 ? (el.color ?? Бирюзовый) : '#17171A', paddingHorizontal:13, borderWidth:1, borderRadius:20}}
                    >
                        <Text style={[styles.smallText,{color:active?.findIndex(value => value == el?.value)!=-1 ?'#17171A' :'white'}]}>{el.name}</Text>
                    </TouchableOpacity>
                )) 
            }
        </View>
    )
}