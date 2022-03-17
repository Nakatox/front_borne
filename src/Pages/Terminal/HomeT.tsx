import React from 'react'
import Popup from 'reactjs-popup'
import CreateProduct from '../../Components/CreateProduct'
import Cart from '../../Components/Terminal/Cart'
import Products from '../../Components/Terminal/Products'
import { ButtonAdd } from '../../Style/Components/Button'

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
            <Popup trigger={<ButtonAdd>Create a cutom product</ButtonAdd>} position="right center" modal nested>
                {(close:any) => (
                    <CreateProduct close={close} onCreate={"oui"} />
                )}
            </Popup>
        </div>
    )   
}
        
export default HomeT