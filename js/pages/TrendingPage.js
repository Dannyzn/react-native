/**
 * Created by Song on 2017/5/9.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
} from 'react-native';

import NavigationBar from "../component/NavigationBar";
import GitHubTrending from 'GitHubTrending';
import ScrollableTabView from "react-native-scrollable-tab-view";
import TrendingProjectRow from "../component/TrendingProjectRow";
import ProjectDetails from './ProjectDetails';

var popular_def_lans = require('../../res/data/popular_def_lans.json');

export default class PopularPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            languages: []
        };
        popular_def_lans.forEach(item =>{
            if(item.checked) this.state.languages.push(item);
        });
    }
    render(){
        return <View style={styles.container}>
            <NavigationBar
                title="趋势"
            />
            <ScrollableTabView
                tabBarBackgroundColor="#63B8FF"
                tabBarActiveTextColor="#FFF"
                tabBarInactiveTextColor="#F5FFFA"
                tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}>
                {
                    this.state.languages.map((item,i)=>{
                        return (item.checked) ? <TrendingTab {...this.props} key={`tab${i}`} tabLabel={item.name}/> : null;
                    })
                }
            </ScrollableTabView>
        </View>;
    }

}


const styles = StyleSheet.create({
    container: {
        flex:1
    }

});

class TrendingTab extends Component{
    static defaultProps = {
        tabLabel: 'IOS',
    }
    constructor(props){
        super(props);
        this.state = {
            dataSource : new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2}), //是一个优化，节省无用的UI渲染
            isLoading : true
        };
    }

    //项目被选中，跳转到详情页
    handleProjectSelect = (obj)=>{
        //console.log(obj);
        this.props.navigator.push({
            component:ProjectDetails,
            params:{title:obj.fullName,url:`https://github.com${obj.url}`}
        });
    }

    //渲染ListView的每一行
    renderRow = (obj)=>{
        return <TrendingProjectRow item={obj} onSelect={()=>this.handleProjectSelect(obj)}/>
    }
    //加载数据
    loadData = ()=>{
        this.setState({isLoading:true});
        //请求数据
        new GitHubTrending().fetchTrending(`https://github.com/trending/${this.props.tabLabel}?since=daily`)
            .then(value=>{
                //更新dataSource
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(value),
                    isLoading:false, //隐藏进度条
                });
            }).catch((error) => {
            console.error(error);
        });
    }

    handleRefresh = ()=>{
        this.loadData();
    }
    render(){
        return <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this.handleRefresh}
                        tintColor="#63B8FF"
                        title="正在加载..."
                        titleColor="#63B8FF"
                        colors={['#63B8FF']}/>}
            />
        </View>;
    }

    componentDidMount = ()=>{
        this.loadData();
    }
}