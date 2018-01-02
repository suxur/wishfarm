import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class ProgressBar extends Component {
    render() {
        let days = 30;
        let complete = 1;
        let incomplete = 0;

        if (this.props.complete < days) {
            complete = Math.abs(this.props.complete / days * 100);
            incomplete = Math.abs(100 - complete);
        }

        return (
            <View style={styles.container}>
                <View style={[styles.complete, {flex: complete}]}/>
                <View style={[styles.incomplete, {flex: incomplete}]}/>
            </View>
        );
    }
}

let borderRadius = 8;

let styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 28,
        borderRadius: borderRadius,
        borderWidth: 1,
        borderColor: "#25283D",
        backgroundColor: "#E9E9E9",
        marginBottom: 3,
        overflow: 'hidden'
    },

    complete: {
        backgroundColor: "#72DDF7",
        borderRadius: borderRadius,
    },

    incomplete: {
        backgroundColor: "#E9E9E9",
        borderRadius: borderRadius,
    }
});
