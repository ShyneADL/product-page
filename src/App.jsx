import React, {useState, useEffect, useRef} from 'react'
import { avatar, cart, logo, image1, plus, minus, cartW, deleteIcon, previous, next, menu } from './assets'
import {imageData, imageDataM} from './imageData';

const App = () => {
const images = imageData.map(item => item.url)
// Mmobile Images Array
const imagesM = imageDataM.map(item => item.url)
const [activeImage, setActiveImage] = useState(images[0]);
const [activeImageModal, setActiveImageModal] = useState(0);
const [count,setCount] = useState(0)
const [cartCount,setCartCount] = useState(0)
const [toggle, setToggle] = useState(false)
const [toggleMenu, setToggleMenu] = useState(false)
const [toggleModal, setToggleModal] = useState(false)
// Mobile Carousel State
const [currentImage, setCurrentImage] = useState(0);


const wrapperRef = useRef(null);

const increment = () => {
  setCount(count + 1);
};

const decrement = () => {
  if(count !== 0) {
    setCount(count - 1);
  } 
};

const handleImg = (imageUrl) => {
  setActiveImage(imageUrl);
}
const handleImgModal = (imageUrl) => {
  setActiveImageModal(imageUrl);
}

const handleClick = () => {
    setToggle(!toggle)
}

const addToCart = () => {
  setCartCount(count);
  setCount(0)
}
const handleNext = () => {
  setActiveImageModal((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
};

const handlePrev = () => {
  setActiveImageModal((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
};

const handleNextM = () => {
  setCurrentImage((prevImage) => (prevImage === imagesM.length - 1 ? 0 : prevImage + 1));
};

const handlePrevM = () => {
  setCurrentImage((prevImage) => (prevImage === 0 ? imagesM.length - 1 : prevImage - 1));
};

const handleMenu = () => {
  setToggleMenu(!toggleMenu);
  };

useEffect(() => {
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setToggle(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

const price = parseFloat('125.00').toFixed(2);

const burgerBar = "h-[2.5px] bg-black w-5 transition ease transform duration-300";

const styles = {
  border: '3px solid #FF7D1A',
  }

  return (
    <div>
      {/* Desktop Header */}
      <header className='sm:flex hidden justify-between items-center sm:px-44 sm:py-10 sm:border-b-[2px] sm:border-b-lightGrayishBlue sm:border-b-solid w-full'>
        <div className='flex justify-between items-center sm:min-w-[570px]'>
          <img src={logo} className='mr-6 cursor-pointer' />
          <p className='sm:flex hidden text-[14px] font-[400] text-darkGrayishBlue leading-[0px] cursor-pointer relative nav-links'>Collections</p>
          <p className='sm:flex hidden text-[14px] font-[400] text-darkGrayishBlue leading-[0px] cursor-pointer relative nav-links'>Men</p>
          <p className='sm:flex hidden text-[14px] font-[400] text-darkGrayishBlue leading-[0px] cursor-pointer relative nav-links'>Women</p>
          <p className='sm:flex hidden text-[14px] font-[400] text-darkGrayishBlue leading-[0px] cursor-pointer relative nav-links'>About</p>
          <p className='sm:flex hidden text-[14px] font-[400] text-darkGrayishBlue leading-[0px] cursor-pointer relative nav-links'>Contact</p>
        </div>



        <div className='flex items-center justify-between gap-6 relative'>
          <div onClick={handleClick} className='p-4 relative cursor-pointer'>
             <img src={cart} className='w-[20px]'/>
          </div>
          {cartCount>0 &&
           <div className='absolute top-[12px] left-[24px] rounded-3xl bg-Orange px-[6px] py-[0.5px]'>
            <p className='text-[6px] text-white '>{cartCount}</p>
            </div>}
          <img src={avatar} className='w-[40px] cursor-pointer hover:border-Orange border-solid border-[2px] border-transition rounded-3xl'/>
          {toggle &&
            <div ref={wrapperRef} className='absolute top-[80px] right-[-80px] flex flex-col items-start justify-start cart rounded-xl bg-white w-[360px] h-[250px]'>
              <h3 className='text-[16px] font-[700] text-black px-6 py-4'>Cart</h3>
              <div className='h-[0.5px] w-full bg-grayishBlue '></div>


              {cartCount > 0 && 
                <div className='flex flex-col items-center gap-5 justify-center px-6 py-6 h-[193px] w-full'>
                  <div className='flex items-center gap-4 w-full'>
                    <img src={image1} className='w-[50px] rounded-md'/>
                    <div className='flex flex-col gap-2 items-start justify-start'>
                      <h4 className='text-[16px] text-darkGrayishBlue font-[400]'>Fall Limited Edition Sneakers</h4>
                      <p className='text-[18px] text-darkGrayishBlue font-[400]'>${price} x {cartCount} <span className='font-[900]'>${(price * cartCount).toFixed(2)}</span></p>
                    </div>
                    <img onClick={()=> setCartCount(0)} src={deleteIcon} className='w-[15px] cursor-pointer'/>
                  </div>
                  <button className='bg-Orange rounded-xl text-white font-[700] text-[18px] py-4 w-full'>Checkout</button>
                </div>
              }
              {cartCount === 0 && 
                <div className='flex items-center justify-center  h-[193px] w-full'>
                <p className='text-[16px] text-darkGrayishBlue font-[700]'>Your cart is empty.</p>
              </div>
              }
              
            </div>}
        </div>
      </header>

      {/* Desktop Main Content */}
      <main className='sm:flex hidden items-center gap-28 px-52 py-20'>
        <div className='flex flex-col items-start justify-between gap-6 w-[50%]'>
          <img onClick={() => setToggleModal(true)} src={activeImage} className='w-full rounded-xl cursor-pointer'/>
          {toggleModal && 
            <div  className={`${toggleModal ? 'overflow-y-hidden' : ''} menu-overlay`}>
              <div className='flex flex-col items-center justify-center w-full h-[100vh]'>
                <div className='flex justify-end items-center w-[500px]'>
                  <svg className='cursor-pointer fill-white hover:fill-Orange fill-transition' onClick={() => setToggleModal(false)} width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill-rule="evenodd"/></svg>
                </div>
                <div className='relative'>
                 <img src={images[activeImageModal]} className='w-[500px] rounded-xl mt-4 cursor-pointer'/>
                 <svg onClick={handlePrev} className='stroke-black hover:stroke-Orange absolute top-[45%] left-[-20px] translate-y-[45%] bg-white rounded-full px-4 py-3 w-[44px] h-[44px] cursor-pointer' width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
                 <svg onClick={handleNext} className='stroke-black hover:stroke-Orange absolute top-[45%] right-[-20px] translate-y-[45%] bg-white rounded-full px-4 py-3 w-[44px] h-[44px] cursor-pointer' width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke-width="3" fill='none' fill-rule="evenodd"/></svg>
                </div>
                <div className='flex justify-between items-center relative gap-4 w-[420px] mt-10'>
            {images.map((item,index) => (
              <div key={index} className={`relative rounded-xl ${activeImageModal === index ? 'bg-overlay' : ''}`}>
                <img
              style={activeImageModal === index ? styles : null}
              src={item}
              onClick={() => setActiveImageModal(index)}
              className={`w-[90px] hover:opacity-[45%] bg-white rounded-xl cursor-pointer`}
            />
              </div>
            ))}
          </div>
              </div>

            </div>
            }


          <div className='flex justify-between items-center relative gap-4 w-full'>
            {imageData.map((item) => (
              <div key={item.id} className={`relative rounded-xl ${activeImage === item.url ? 'bg-overlay' : ''}`}>
                <img style={activeImage === item.url ? styles : null} src={item.url} onClick={() => handleImg(item.url)}  className={`w-[100px] hover:opacity-[45%] rounded-xl cursor-pointer`}/>
               
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col items-start justify-between gap-2 w-[50%]'>
          <h3 className='text-Orange text-[16px] font-[700] tracking-wider uppercase'>Sneaker Company</h3>
          <h1 className='text-black text-[44px] font-[700] leading-[46px] w-full'>Fall Limited Edition Sneakers</h1>
          <p className='text-darkGrayishBlue text-[16px] font-[400] w-full mt-6'>These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.</p>
          <div className='flex flex-col items-start justify-start gap-1 mt-2'>

            <div className='flex items-center justify-between gap-4'>
              <h2 className='text-[28px] text-black font-[700]'>${price}</h2>
              <h4 className='text-[16px] text-Orange font-[700] rounded-md py-[1px] px-2 bg-paleOrange'>50%</h4>
            </div>
            <div className='relative'>
              <h5 className=' text-[18px] text-grayishBlue font-[700]'>$250.00</h5>
              <div className='absolute bottom-[12px]  w-[70.2px] h-[2px] bg-grayishBlue'></div>
            </div>
          </div>

          {/* Buttons */}
          <div className='flex items-center justify-between w-full mt-6'>
            <div className='flex items-center gap-[40px] bg-lightGrayishBlue rounded-lg'>
              <button className='hover:opacity-[65%] opacity-transition py-6 px-4' onClick={decrement}>
                <img src={minus} className='w-[15px]'/>
              </button>

              <p className='text-black text-[20px] font-[700] text-center w-1'>{count}</p>

              <button className='hover:opacity-[65%] opacity-transition py-6 px-4' onClick={increment}>
                <img src={plus} className='w-[15px]'/>
              </button>
            </div>

            <button onClick={addToCart} style={{boxShadow: '0px 26px 43px -6px rgba(255, 125, 27, 0.28)'}} className='bg-transition flex items-center gap-4 bg-Orange hover:bg-[#FFAC6A] rounded-xl py-5 px-[70px]'>
              <img src={cartW} className='w-[16px]'/>
              <p className='text-white text-[14px] font-[700] w-[86.5px]'>Add to Cart</p>
              
            </button>
          </div>
        </div>
      </main>

       {/* Mobile Header */}
       <header className=' flex sm:hidden justify-between items-center p-6 w-full'>
          <div className='flex gap-4 items-end'>
            {/* Menu Icon */}
          <div onClick={handleMenu} className= {`${toggleMenu ? 'fixed' : 'static'} flex flex-col gap-[4px] items-center z-50  justify-center cursor-pointer`}>
            <span className={`${burgerBar} ${toggleMenu && "rotate-45 translate-y-[8px] w-5"}`}></span>
            <span className={`${burgerBar} ${toggleMenu && "opacity-0"}`}></span>
            <span className={`${burgerBar} ${toggleMenu && "-rotate-45 -translate-y-[5px] w-5"}`}></span>
          </div>

          {/* Close menu with the slide-left animation */}
          {toggleMenu && (
          <div className={`flex gap-8 flex-col bg-white z-[40] fixed top-0 left-0 w-[250px] h-full py-24 px-6 slide-right`}>
            <p className='text-[14px] font-[700] text-black leading-[0px]'>Collections</p>
            <p className='text-[14px] font-[700] text-black leading-[0px]'>Men</p>
            <p className='text-[14px] font-[700] text-black leading-[0px]'>Women</p>
            <p className='text-[14px] font-[700] text-black leading-[0px]'>About</p>
            <p className='text-[14px] font-[700] text-black leading-[0px]'>Contact</p>
          </div>
      )}
          {/* Close menu with the slide-left animation */}
          {!toggleMenu && (
          <div className={`flex gap-8 flex-col bg-white z-[40] fixed top-0 left-0 w-[250px] h-full py-24 px-6 slide-left`}>
            <p className='text-[14px] font-[700] text-black leading-[0px]'>Collections</p>
            <p className='text-[14px] font-[700] text-black leading-[0px]'>Men</p>
            <p className='text-[14px] font-[700] text-black leading-[0px]'>Women</p>
            <p className='text-[14px] font-[700] text-black leading-[0px]'>About</p>
            <p className='text-[14px] font-[700] text-black leading-[0px]'>Contact</p>
          </div>
      )}
      {toggleMenu && <div className='menu-overlay' onClick={handleMenu}></div>}

          {/* Logo */}
            <img src={logo} className='w-[130px] cursor-pointer'/>
          </div>
          <div className='flex gap-5 items-center'>
            <div className='relative'>
              <img onClick={handleClick} src={cart} className='w-[25px] cursor-pointer'/>
              {cartCount>0 &&
              <div className='absolute top-[-2.5px] right-[-3px] rounded-3xl bg-Orange px-[6px] py-[1.2px]'>
                <p className='text-[6px] text-white '>{cartCount}</p>
                </div>
                }
            </div>
            <img src={avatar} className='w-[25px] cursor-pointer'/>
            {toggle &&
            <div ref={wrapperRef} className='absolute z-[1000] top-[80px] right-[50%] translate-x-[50%] flex flex-col items-start justify-start cart rounded-xl bg-white w-[360px] h-[250px]'>
              <h3 className='text-[16px] font-[700] text-black px-6 py-4'>Cart</h3>
              <div className='h-[0.5px] w-full bg-grayishBlue '></div>

              {cartCount > 0 && 
                <div className='flex flex-col items-center gap-5 justify-center px-6 py-6 h-[193px] w-full'>
                  <div className='flex items-center gap-4 w-full'>
                    <img src={image1} className='w-[50px] rounded-md'/>
                    <div className='flex flex-col gap-2 items-start justify-start'>
                      <h4 className='text-[16px] text-darkGrayishBlue font-[400]'>Fall Limited Edition Sneakers</h4>
                      <p className='text-[18px] text-darkGrayishBlue font-[400]'>${price} x {cartCount} <span className='font-[900]'>${(price * cartCount).toFixed(2)}</span></p>
                    </div>
                    <img onClick={()=> setCartCount(0)} src={deleteIcon} className='w-[15px] cursor-pointer'/>
                  </div>
                  <button className='bg-Orange rounded-xl text-white font-[700] text-[18px] py-4 w-full'>Checkout</button>
                </div>
              }
              {cartCount === 0 && 
                <div className='flex items-center justify-center  h-[193px] w-full'>
                <p className='text-[16px] text-darkGrayishBlue font-[700]'>Your cart is empty.</p>
              </div>
              }
              
            </div>}
          </div>

          
        </header>

      {/* Mobile Main Content */}
      <section className='sm:hidden flex flex-col items-start justify-start w-full'>
        <div className='relative'>
          <img src={imagesM[currentImage]} className='w-full' alt='shoe image'/>
          <img onClick={handlePrevM} src={previous} alt='previous icon' className='absolute top-[35%] left-[13px] translate-y-[45%] bg-white rounded-full px-4 py-3 w-[44px] h-[44px] cursor-pointer'/>
          <img onClick={handleNextM} src={next} alt='next icon' className=' absolute top-[35%] right-[13px] translate-y-[45%] bg-white rounded-full px-4 py-3 w-[44px] h-[44px] cursor-pointer'/> 
        </div>
        <div className='px-6 flex flex-col items-start justify-start'>
          <h3 className='text-Orange text-[14px] font-[700] tracking-wider uppercase mt-6'>Sneaker Company</h3>
          <h1 className='text-black text-[30px] font-[700] leading-[36px] w-full mt-4'>Fall Limited Edition Sneakers</h1>
          <p className='text-darkGrayishBlue text-[14px] font-[400] w-[320px] mt-4'>These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.</p>
        </div>

        {/* Price and Discount flex */}
        <div className='flex items-center justify-between w-full px-6 mt-4'>
          <div className='flex items-center justify-between gap-4'>
              <h2 className='text-[28px] text-black font-[700]'>${price}</h2>
              <h4 className='text-[16px] text-Orange font-[700] rounded-md py-[1px] px-2 bg-paleOrange'>50%</h4>
            </div>
            <div className='relative'>
              <h5 className=' text-[18px] text-grayishBlue font-[700]'>$250.00</h5>
              <div className='absolute bottom-[11px]  w-[66px] h-[1.5px] bg-grayishBlue'></div>
            </div>
        </div>

        {/* Buttons */}
        <div className='flex flex-col items-start justify-between w-full gap-4 px-6 my-6'>
            <div className='flex  justify-between items-center bg-lightGrayishBlue rounded-lg w-full'>
              <button className='hover:opacity-[65%] opacity-transition py-5 px-4' onClick={decrement}>
                <img src={minus} className='w-[15px]'/>
              </button>

              <p className='text-black text-[20px] font-[700] text-center w-1'>{count}</p>

              <button className='hover:opacity-[65%] opacity-transition py-5 px-4' onClick={increment}>
                <img src={plus} className='w-[15px]'/>
              </button>
            </div>

            <button onClick={addToCart} style={{boxShadow: '0px 26px 43px -6px rgba(255, 125, 27, 0.28)'}} className='bg-transition flex justify-center items-center gap-4 bg-Orange hover:bg-[#FFAC6A] rounded-xl py-4 w-full'>
              <img src={cartW} className='w-[16px]'/>
              <p className='text-white text-[14px] font-[700] w-[86.5px]'>Add to Cart</p>
            </button>
          </div>
      </section>
    </div>
  )
}

export default App;