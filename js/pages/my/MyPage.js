/**
 * Created by Song on 2017/5/2.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import NavigationBar from "../../component/NavigationBar"
import CustomKeyPage from "./CustomKeyPage";

export default class MyPage extends Component {
    // 跳转
    gotoCustomKey = ()=>{
        this.props.navigator.push({
            component: CustomKeyPage
        })
    }
    render() {
        return <View style={styles.container}>
            <NavigationBar title="我的信息" />
            <View style={{flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                <Text onPress={this.gotoCustomKey}>页面跳转</Text>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    icon: {
        width: 26,
        height: 26
    }
})