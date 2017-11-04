import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import NavigationBar from "../../component/NavigationBar";
import CustomKeyPage from "./CustomKeyPage";
import SortKeyPage from "./SortKeyPage";

export default class MyPage extends Component{
    //跳转
    gotoCustomKey =() =>{
        //跳转（类似于Android中添加一个任务到任务队列）
        this.props.navigator.push({
            component : CustomKeyPage
        });
    }

    //分类排序
    gotoSortKey = ()=>{
        this.props.navigator.push({
            component : SortKeyPage
        });
    }

    render(){
        return <View style={styles.container}>
            <NavigationBar
                title="我的"/>

            <View style={{flexDirection:'column',alignItems:'center',marginTop:30}}>
                <Text onPress={this.gotoCustomKey}>自定义分类</Text>
                <Text onPress={this.gotoSortKey} style={{marginTop:20}}>分类排序</Text>
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

