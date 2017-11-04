import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';

import NavigationBar from "../../component/NavigationBar";
import SortableListView from "react-native-sortable-listview";
import Toast from "react-native-easy-toast";

import JasonToast from '../../component/JasonToast';
import JasonDecodeDialog from '../../component/JasonDecodeDialog';

var popular_def_lans = require('../../../res/data/popular_def_lans.json');

export default class SortKeyPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            originData : popular_def_lans, //原始数据
            data : [] //原始数据中，checked为true的数据
        };

        this.state.originData.forEach(item =>{
            if(item.checked) this.state.data.push(item);
        });
    }

    //返回
    handleBack = ()=>{
        this.doBack();
    }

    doBack = ()=>{
        //把任务栈顶部的任务清除
        //this.props.navigator.pop();
        //JasonToast.show('Java Native Module',JasonToast.LONG);
        JasonDecodeDialog.alert(result=>{
            JasonToast.show(result,JasonToast.LONG);
        },error=>{
            console.log(error);
        });
    }

    doSave = ()=>{
        //原始数组
        var originArray = this.state.originData;
        //排序后的数组
        var sortedArray = this.state.data;
        //要保存的数组
        var savedArray = [];

        //i用来遍历originalArray
        //j用来遍历sortedArray
        for(var i = 0, j = 0; i < originArray.length; i++){
            var item = originArray[i];
            if(item.checked){
                savedArray[i] = sortedArray[j];
                j++;
            }else{
                savedArray[i] = item;
            }
        }
        AsyncStorage.setItem('custom_key',JSON.stringify(savedArray))
            .then(()=> {
                this.refs.toast.show("保存成功");
                this.doBack();
                //通知HomePage重新加载
                DeviceEventEmitter.emit('HOMEPAGE_RELOAD','HomePage重新加载');
            });
    }

    //保存
    handleSave = ()=>{
        this.doSave();
    }

    getNavLeftBtn = ()=>{
        return <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.handleBack}>
                <Image source={require('../../../res/images/ic_arrow_back_white_36pt.png')} style={{width:24,height:24}}/>
            </TouchableOpacity>
        </View>;
    }

    getNavRightBtn = ()=>{
        return <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.handleSave}>
                <View style={{marginRight:10}}>
                    <Text style={{fontSize:16,color:'#FFF'}}>保存</Text>
                </View>
            </TouchableOpacity>
        </View>;
    }

    render(){
        return <View style={styles.container}>
            <NavigationBar
                title="语言分类排序"
                rightButton={this.getNavRightBtn()}
                leftButton={this.getNavLeftBtn()}/>
            {/*Object.keys，返回一个数组，可以获取对象的所有属性，或者一个数组的所有元素的索引值*/}
            <SortableListView
                data={this.state.data}
                order={Object.keys(this.state.data)}
                renderRow={item => <RowComponent data={item}/>}
                onRowMoved={e=>{
                    //onRowMoved要返回一个在删除时传递单个对象的函数
                    //e对象有三个属性，from、to、row
                    //splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
                    //从from移动到to的位置
                    this.state.data.splice(e.to,0,this.state.data.splice(e.from,1)[0]);
                    this.forceUpdate(); //强制重新渲染
                }}/>
            <Toast ref="toast"/>
        </View>;
    }

    componentDidMount = ()=>{
        AsyncStorage.getItem('custom_key')
            .then(value=>{
                if(value !== null){
                    let origin = JSON.parse(value);
                    //只获取checked为true语言，进行排序
                    let d = [];
                    origin.forEach((item)=>{
                        if(item.checked) d.push(item);
                    });
                    this.setState({originData:origin,data:d});
                }
            });
    }

}

class RowComponent extends Component{
    static defaultProps = {
        data : {name:''}
    };
    render(){
        //本组件用于封装视图，使其可以正确响应触摸操作。
        //当按下的时候，封装的视图的不透明度会降低，同时会有一个底层的颜色透过而被用户看到，使得视图变暗或变亮
        //underlayColor 有触摸操作时显示出来的底层的颜色
        return <TouchableHighlight
                underlayColor='#EEE'
                style={styles.item}
                {...this.props.sortHandlers}>
            <View style={{flexDirection:'row',paddingLeft:10}}>
                <Image source={require('../../../res/images/ic_sort.png')} style={styles.image}/>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    checkbox:{
        tintColor: '#63B8FF'
    },
    item:{
        backgroundColor: '#F8F8F8',
        borderBottomWidth:1,
        borderColor:'#EEE',
        height:50,
        justifyContent:'center'
    },
    image:{
        width:16,
        height:16,
        marginRight:10,
        tintColor:'#63B8FF'
    }
});

