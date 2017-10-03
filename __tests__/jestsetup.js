//import { shallow, render, mount } from 'enzyme';
//import React,{Component} from 'react';  
//global.shallow = shallow;
//global.render = render;
//global.mount = mount;
//
//global.React = React;
//global.Component = Component;


// Fail tests on any warning
console.error = message => {
   throw new Error(message);
};
