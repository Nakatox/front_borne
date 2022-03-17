import React from 'react'
import { useContext } from 'react'
import Header from '../../Components/Admin/Header'
import { OrderContext } from '../../Provider/OrderProvider'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import { GetOrderHasProduct } from '../../Services/OrderAPI';
import { GetProducts } from '../../Services/ProductAPI';
import { useEffect } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Product succuess',
        },
    },
};

const TerminalsA = () => {

    let {order} = useContext(OrderContext)

    const [orderHasProduct, setOrderHasProduct] = useState([])
    let [labels, setLabels] = useState([])
    let [datasets, setDatasets] = useState([])

    const getOrderHasProduct = async () => {
        let products = await GetProducts()
        for (let index = 0; index < products.length; index++) {
            const element = products[index];
            if (!labels.includes("overall")) {
                let response = await GetOrderHasProduct(element.id)
                setDatasets(datasets = [...datasets, {
                    label: element.name,
                    data: [response.length],
                    backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
                }])
            }

        }
        setLabels(["overall"])
    }
            

    const data = {
        labels,
        datasets
    };``


    useEffect(() => {
        getOrderHasProduct()
    }, [])

    return (
        <div>
            <Header/>
            <Bar options={options} data={data} />;
        </div>
    )
}

export default TerminalsA