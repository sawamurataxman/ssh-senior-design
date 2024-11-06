//import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import logo from './logo.svg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import ReactCrop from 'react-image-crop';
import TimeDisplay from './TimeTest';
import StringSender from './StringTest';
import ColorTest from './colorTest';
function NextArrow(props)
{
  const { className, style, onClick} = props;
  return(
    <div
      className={className}
      style={{...style, display: "block", background: "gray", right: "10px"}}
      onClick={onClick}
    />
  );
}
function PrevArrow(props)
{
  const {className, style, onClick} = props;
  return(
    <div
      classname={className}
      style={{...style, display: "block", background: "gray", left: "10px"}}
      onClick={onClick}
    />
  );
}
function App() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>
  };
  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path ="/" element={<Home />} />
            <Route path ="/about" element={<About />} />
            <Route path ="/contact" element={<Contact />} />
          </Routes>
          <div className = "w-1/4 m-auto">
            <div className = "mt-20">
            <Slider {...settings}>
              {data.map((d) => (
                <div className = "bg-white h-[200px] text-black rounded xl">
                  <div>
                    <div className ="rounded-t-xl bg-indigo-500 flex justify-center items-center">
                      <img src = {d.image} alt ="" className = "h-22 w-22"/>
                    </div>
                    <div>
                      <p>{d.color}</p>
                      <button>Click for Red</button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            </div>
          </div>
        </div>
      </Router>
      <br />
      <StringSender />
      <br />
      <ColorTest />
    </div>
  );
}
const data = [
  {
    color:'Blue',
    image: 'blueforwebsite.png',

  },
  {
    color:'Green',
    image:'greenforwebsite.png',
  },
  {
    color:'Red',
    image:'redforwebsite.png',
  },
];
export default App;
