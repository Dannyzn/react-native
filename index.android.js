/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';

 import setup from './js/pages/setup'
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
AppRegistry.registerComponent('rn_project', () => setup);
