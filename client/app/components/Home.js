import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Image,
    Text
} from "react-native";

import { Rating } from 'react-native-elements';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: []
        };
    }

    /* Function that obtains the api listing */
    componentWillMount = async () => {
        try {
            /* Determine whether you want to read the information from the remote server or not */
            let isRemoteServer = true,
                data = await fetch(
                    isRemoteServer ?
                        'https://moviesws.herokuapp.com/movies/' :
                        'http://192.168.1.64:8080/movies/'
                ),
                movies = await data.json();
            this.setState({
                loading: false,
                dataSource: movies.movies
            })
        } catch (err) {
            console.error(err)
        }
    }

    /* Add separation between each item in the list */
    FlatListItemSeparator = () => (
        <View style={{
            height: 1,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.2)'
        }} />
    );

    /* Function that allows you to paint each item in the list */
    renderItem = data => (
        <View style={styles.list}>
            <View>
                <Image source={{ uri: data.item.poster }} style={{ width: 100, height: 70, borderRadius: 3 }} />
            </View>
            <View style={styles.info}>
                <Text style={{ fontSize: 18 }}>{data.item.title}</Text>
                <Text style={{ fontSize: 12 }}>Director: {data.item.author}</Text>
                <Rating
                    imageSize={17}
                    ratingCount={10}
                    startingValue={data.item.rating}
                />
                <Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: 12 }}>Category: {data.item.category}</Text>
            </View>
        </View>
    );

    render() {
        return (
            /* Check if the data load is ready */
            this.state.loading ?
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="green" />
                </View> :
                <View style={styles.container}>
                    <FlatList
                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={item => this.renderItem(item)}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    list: {
        flexDirection: 'row',
        marginLeft: 20,
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#fff"
    },
    info: {
        marginLeft: 10
    }
});