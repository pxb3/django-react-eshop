import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Item from "./pages/Item";
import LogOrSign from "./pages/LogOrSign";
import Cart from "./pages/Cart";
import NoPage from "./pages/NoPage";


function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="items" element={<Items />} />
              <Route path="items/:searched" element={<Items />} />
              <Route path="item/:itemId/:itemImage" element={<Item />} />
              <Route path="logOrSign" element={<LogOrSign />} />
              <Route path="cart" element={<Cart />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
