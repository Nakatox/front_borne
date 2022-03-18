import React from 'react'
import Popup from 'reactjs-popup'
import CreateProduct from '../../Components/CreateProduct'
import Cart from '../../Components/Terminal/Cart'
import Products from '../../Components/Terminal/Products'
import { ButtonAdd } from '../../Style/Components/Button'
import { StyledPopup } from '../../Style/Components/Container'

const HomeT = () : JSX.Element => {
    return (
        <div>
            <Products></Products>
            <StyledPopup trigger={<ButtonAdd>See Cart<img style={{width:"25px",marginLeft:"10px",filter: "invert(87%) sepia(13%) saturate(1061%) hue-rotate(351deg) brightness(104%) contrast(101%)"}} src='/assets/icons/cart.svg' /></ButtonAdd>} modal nested>
                {(close:any) => (
                    <div>      
                        <Cart></Cart>
                        <img src="/assets/icons/close.svg" alt="" onClick={close} style={{cursor:"pointer", width:"30px", position:"absolute", right:"10px", top:"10px"}}/>      
                    </div>  
                )}
                
            </StyledPopup>
            <StyledPopup trigger={<ButtonAdd>Create a cutom product <img style={{width:"25px",marginLeft:"10px",filter: "invert(87%) sepia(13%) saturate(1061%) hue-rotate(351deg) brightness(104%) contrast(101%)"}} src='/assets/icons/plusplus.svg' />  </ButtonAdd>} position="right center" modal nested>
                {(close:any) => (
                    <CreateProduct close={close} onCreate={"oui"} />
                )}
            </StyledPopup>
        </div>
    )   
}
        
export default HomeT