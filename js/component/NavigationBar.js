/**
 * Created by Song on 2017/4/25.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Platform
} from 'react-native';

//会包含状态栏，还有顶部导航栏
export default class NavigationBar extends Component{
    static propTypes = {
        rightButton: PropTypes.element,
        leftButton: PropTypes.element
    }
    render(){
        return <View style={styles.container}>
            <View style={styles.statusBar}>
                <StatusBar hidden={false} barStyle="light-content"/>
            </View>
            {/*顶部导航栏*/}
            <View style={styles.navBar}>

                <View style={styles.leftBtnStyle}>
                    {this.props.leftButton}
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <View style={styles.rightBtn}>
                    {this.props.rightButton}
                </View>
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#63B8FF',
        padding:5
    },
    statusBar:{
        height:Platform.OS === 'ios' ? 20 : 0
    },
    navBar:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    titleWrapper:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        left:40,
        right:40,
        bottom:0
    },
    title:{
        fontSize:16,
        color:'#FFF'
    },
    leftBtnStyle:{
        width:24,
        height:24
    },
    rightBtn:{
        flexDirection:'row',
        alignItems:'center',
        paddingRight:8
    }
});

