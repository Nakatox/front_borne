import styled from 'styled-components'

export const ButtonEdit = styled.button`
    background-color: #326E2F;
    color: white;
    border: none;
    border-radius: 5px;
    margin: 10px;
    cursor: pointer;
    width: 100px;
    height: 30px;
`

export const ButtonAddDisabled = styled.button`
    background-color: #b8b8b8;
    border-radius: 10px;
    color: white;
    padding: 5px 10px;
    margin: 10px;
    font-size: 20px;
    border: 2px solid #b8b8b8;
`;

export const ButtonAdd = styled.button`
    background-color: #326E2F;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
    border-radius: 10px;
    padding: 5px 10px;
    margin: 10px;
    font-size: 20px;
    cursor: pointer;
    border: 2px solid #326E2F;
    &:hover {
        border-color: #E6E6E6;
    }
    `
export const ButtonAddIngredient = styled.button`
    background-color: #FEE69C;
    color: #171717;
    border-radius: 10px;
    padding: 5px 10px;
    margin: 10px;
    font-size: 20px;
    cursor: pointer;
    border: 2px solid #E6E6E6;
    &:hover {
        border-color: #E6E6E6;
    }
`


export const ButtonDelete = styled.button`
    background-color: #D32E05;
    color: white;
    border: none;
    border-radius: 5px;
    margin: 10px;
    cursor: pointer;
    width: 100px;
    height: 30px;
`
