import React from 'react';
import { StatusBar } from 'react-native';
import { BackButton, NativeRouter, Route } from 'react-router-native';
import About from './components/About';
import EditTodo from './components/EditTodo';
import Header from './components/Header';
import Home from './components/Home';
import Images from './components/Images';
import Todo from './components/Todo';
import { useWindowDimensions } from 'react-native';
import Testing from './components/Testing';

export default function App() {
  const { height, width } = useWindowDimensions();
  return (
      <NativeRouter>
        <BackButton>
        <Header/>
        <Route exact path='/' component={Home} />
        <Route path='/images' component={Images} />
        <Route path='/todo' component={Todo} />
        <Route exact path='/edit-todo/:id' component={EditTodo} />
        <Route path='/about' component={About} />
        <Route path='/test' component={Testing} />
        <StatusBar style="auto" />
        </BackButton>
      </NativeRouter>
  );
}
