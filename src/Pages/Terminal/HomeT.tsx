import React from 'react'
import Popup from 'reactjs-popup'
import Cart from '../../Components/Terminal/Cart'
import Products from '../../Components/Terminal/Products'

const HomeT = () : JSX.Element => {
    return (
        <div>
        <Products></Products>
            <Popup trigger={<button>See Cart</button>} modal nested>
                {(close:any) => (
                    <div>      
                        <Cart></Cart>
                        <img src="/assets/icons/close.svg" alt="" onClick={close} style={{cursor:"pointer", width:"30px", position:"absolute", right:"10px", top:"10px"}}/>      
                    </div>  
                )}
                
            </Popup>
        </div>
    )   
}
        
export default HomeT