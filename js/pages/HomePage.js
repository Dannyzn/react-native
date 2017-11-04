/**
 * Created by Song on 2017/4/25.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter // 事件组件
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator'
import PopularPage from './PopularPage'
import MyPage from './my/MyPage'
import TrendingPage from './TrendingPage'

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab: "popular", //默认选项卡
        }
    }
    render() {
        return <View style={styles.container}>
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'popular'}
                    title="最热"
                    selectedTitleStyle={{color: '#63B8FF'}}
                    renderIcon={() =>
                        <Image style={styles.icon} source={require('../../res/images/ic_popular.png')}/>}
                    renderSelectedIcon={() =>
                        <Image style={[styles.icon,,{tintColor:'#63B8FF'}]} source={require('../../res/images/ic_popular.png')}/>}
                    onPress={() => this.setState({selectedTab: 'popular'})}
                >
                    {/*选项卡对应的页面*/}
                    <PopularPage {...this.props}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'trending'}
                    title="趋势"
                    selectedTitleStyle={{color: '#63B8FF'}}
                    renderIcon={() =>
                        <Image style={styles.icon} source={require('../../res/images/ic_trending.png')}/>}
                    renderSelectedIcon={() =>
                        <Image style={[styles.icon,{tintColor:'#63B8FF'}]} source={require('../../res/images/ic_trending.png')}/>}
                    onPress={() => this.setState({selectedTab: 'trending'})}
                >
                    <TrendingPage {...this.props} />
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'favorite'}
                    title="收藏"
                    selectedTitleStyle={{color: '#63B8FF'}}
                    renderIcon={() =>
                        <Image style={styles.icon} source={require('../../res/images/ic_favorite.png')}/>}
                    renderSelectedIcon={() =>
                        <Image style={[styles.icon,{tintColor:'#63B8FF'}]} source={require('../../res/images/ic_favorite.png')}/>}
                    onPress={() => this.setState({selectedTab: 'favorite'})}
                >
                    <View style={{backgroundColor:'green',flex:1}}></View>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'my'}
                    title="我的"
                    selectedTitleStyle={{color: '#63B8FF'}}
                    renderIcon={() =>
                        <Image style={styles.icon} source={require('../../res/images/ic_my.png')}/>}
                    renderSelectedIcon={() =>
                        <Image style={[styles.icon,{tintColor:'#63B8FF'}]} source={require('../../res/images/ic_my.png')}/>}
                    onPress={() => this.setState({selectedTab: 'my'})}
                >
                    {/*
                    把HomePage属性上的navigator对象，传递给MyPage
                     <MyPage navigator={this.props.navigator} c={this.props.c} d={this.props.d} />
                     HomePage props -> {name:'jack',age:10}
                     MyPage  props -> {name:'jack',age:10} 属性全部copy
                    */}

                    <MyPage {...this.props} />
                </TabNavigator.Item>
            </TabNavigator>
        </View>
    }

    componentDidMount(){
        //添加事件监听
        this.listener = DeviceEventEmitter.addListener('HOMEPAGE_RELOAD',(n)=>{
            //主页重新加载
            //跳转到新的场景，并且重置整个路由栈
            this.props.navigator.resetTo({
                component: HomePage
            });
        });
    }

    componentWillUnmount(){
        this.listener.remove();
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    icon: {
        width:26,
        height:26
    }
})