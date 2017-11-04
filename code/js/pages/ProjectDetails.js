import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    WebView
} from 'react-native';

import NavigationBar from "../component/NavigationBar";

export default class ProjectDetails extends Component{

    constructor(props){
        super(props);
        this.state = {
            canGoBack:false
        };
    }

    handleBack = ()=>{
        if(this.state.canGoBack){
            this.refs.webview.goBack();
        }else{
            this.props.navigator.pop();
        }
    }
    getNavLeftBtn = ()=>{
        return <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.handleBack}>
                <Image source={require('../../res/images/ic_arrow_back_white_36pt.png')} style={{width:24,height:24}}/>
            </TouchableOpacity>
        </View>;
    }

    getNavRightBtn = ()=>{
        return <View style={{flexDirection:'row'}}>
            <TouchableOpacity activeOpacity={0.5}>
                <Image
                    style={{width:20,height:20,marginRight:10,tintColor:'#FFF'}}
                    source={require('../../res/images/ic_share.png')}/>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5}>
                <Image
                    style={{width:20,height:20,marginRight:10,tintColor:'#FFF'}}
                    source={require('../../res/images/ic_unstar_transparent.png')}/>
            </TouchableOpacity>
        </View>;
    }

    //监听状态改变
    handleNavStateChange = (s)=>{
        //是否能够返回，存入状态
        this.setState({canGoBack:s.canGoBack});
    }

    render(){
        console.log(this.props.title+','+this.props.url);
        return <View style={styles.container}>
            <NavigationBar
                title={this.props.title}
                leftButton={this.getNavLeftBtn()}
                rightButton={this.getNavRightBtn()}/>
            <WebView
                ref="webview"
                startInLoadingState={true}
                source={{uri:this.props.url}}
                onNavigationStateChange={this.handleNavStateChange}/>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    }

});