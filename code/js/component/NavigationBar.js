/**
 * Created by david on 5/4/2017.
 */
import React, {Component,PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Platform,
    TouchableOpacity
} from 'react-native';

//会包含状态栏，还有顶部导航栏
export default class NavigationBar extends Component{
    static propTypes = {
        //验证，不传element组件类型，会报错提示
        rightButton : PropTypes.element,
        leftButton : PropTypes.element,
        titleView : PropTypes.element
    }
    static defaultProps = {
        title: ''
    }

    renderTitle = ()=>{
        let view = (this.props.title.length != 0) ? (<Text style={styles.title}>{this.props.title}</Text> ) : this.props.titleView;
        return <View style={styles.titleWrapper}>
            {view}
        </View>;
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
                {this.renderTitle()}
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
        alignItems:'center',
        minHeight:24
    },
    titleWrapper:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        left:40,
        right:40
    },
    title:{
        fontSize:16,
        color:'#FFF'
    },
    leftBtnStyle:{
        flexDirection:'row'
    },
    rightBtn:{
        flexDirection:'row',
        alignItems:'center',
        paddingRight:8
    }
});
