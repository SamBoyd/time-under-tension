import React, {useEffect, useState} from 'react'

import * as RNIap from 'react-native-iap';
import {Platform} from "react-native";


const itemSkus = Platform.select({
    ios: [
        'dev.samboyd.UnderTension.monthly_1',
        // 'dev.samboyd.UnderTension.quarterly',
        // 'dev.samboyd.UnderTension.6months',
        // 'dev.samboyd.UnderTension.yearly'
    ],
    android: [
        'com.example.coins100'
    ]
});

const Payments = props => {
    const [products, setProducts] = useState({})

    useEffect(() => {
        try {
            RNIap.initConnection()
                .then(() => {
                    console.log("itemSkus: " + JSON.stringify(itemSkus))
                    const products = RNIap.getProducts(itemSkus);
                    setProducts(products);
                    console.log("products: " + JSON.stringify(products))
                })
        } catch (err) {
            console.warn(err.code, err.message);
        }
    }, [])

    return (
        <>
            {props.children && (props.children) || (props.child)}
        </>
    )
}

export default Payments
