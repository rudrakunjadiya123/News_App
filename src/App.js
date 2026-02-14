import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

export default class App extends Component {
  cardSize = 12
  render() {
    return (
      <div>
        <Router>
          <Navbar />

          <Routes>
            <Route exact path="/" element={<News key="general" pageSize={this.cardSize} country="in" category="general" />} />
            <Route exact path="/business" element={<News key="business" pageSize={this.cardSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.cardSize} country="in" category="entertainment" />} />
            <Route exact path="/science" element={<News key="science" pageSize={this.cardSize} country="in" category="science" />} />
            <Route exact path="/health" element={<News key="health" pageSize={this.cardSize} country="in" category="health" />} />
            <Route exact path="/sports" element={<News key="sports" pageSize={this.cardSize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News key="technology" pageSize={this.cardSize} country="in" category="technology" />} />

          </Routes>
        </Router>
      </div>
    )
  }
}