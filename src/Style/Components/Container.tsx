import Popup from 'reactjs-popup'
import styled from 'styled-components'

export const ContainerWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const ContainerFlexColumn = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    `

export const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid #BCD379;
    border-radius: 5px;
    width: 200px;
    margin: 10px;
    background-color: white;
    box-shadow:
        0px 0px 0.8px rgba(0, 0, 0, 0.036),
        0px 0px 2.7px rgba(0, 0, 0, 0.054),
        0px 0px 12px rgba(0, 0, 0, 0.09)
    ;
    & > p:nth-child(1) {
        font-size: 30px
    }
` 
export const ProductContainerDisabled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid #b8b8b8;
    border-radius: 5px;
    width: 200px;
    margin: 10px;
    background-color: #b8b8b8;
    box-shadow:
        0px 0px 0.8px rgba(0, 0, 0, 0.036),
        0px 0px 2.7px rgba(0, 0, 0, 0.054),
        0px 0px 12px rgba(0, 0, 0, 0.09)
    ;
    & > p:nth-child(1) {
        font-size: 30px
        text-decoration: line-through;
    }
    ` 

export const IngredientInList = styled.div`
    cursor: pointer;
    &:hover {
        background-color: #FEE69C;
    }
`;

export const IngredientContent = styled.div`
    display: flex;
    flex-direction: row;
    border: 2px solid #BCD379;
    border-radius: 5px;
    margin: 10px;
    background-color: white;
    box-shadow:
        0px 0px 0.8px rgba(0, 0, 0, 0.036),
        0px 0px 2.7px rgba(0, 0, 0, 0.054),
        0px 0px 12px rgba(0, 0, 0, 0.09)
    ;
    `;

export const StyledPopup = styled(Popup)`
    &-overlay {
    }  
    &-content {
        border-color: #BCD379;
        border-width: 2px;
        border-radius: 10px;
    }
`;