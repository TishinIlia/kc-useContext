import React, {FC} from 'react'
import List from "@mui/material/List";
import {Button} from "@mui/material";

import GoodsItem from "../types/GoodsItem";

import SelectedGoodsItem from './SelectedGoodsItem'

import useData from "../hooks/useData";

const SelectedGoodsList: FC = () => {
    const {selectedGoods, goods, pay} = useData()

    const selectedGoodsItems = selectedGoods.reduce((acc: GoodsItem[], id) => {
        const selectedGoodsItem = goods.find((item) => item.id === id)
        if (!selectedGoodsItem) {
            return acc
        }
        return [...acc, selectedGoodsItem]
    }, [])

    const totalSum = selectedGoodsItems.reduce((sum, selectedGoodsItem) => {
            const goodsItem = goods.find((item) => item.id === selectedGoodsItem.id);
            if (!goodsItem) {
                return sum
            }
            return sum + goodsItem.price
        }, 0)

    return (
        <>
            <List dense>
                {
                    selectedGoodsItems.map((item) => (<SelectedGoodsItem goodsItem={item} key={item.id} />) )
                }
            </List>

            <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={pay}
            >
                Оплатить{" "}
                {totalSum
                    .toLocaleString("ru-RU", {
                        style: "currency",
                        currency: "RUB",
                        maximumFractionDigits: 0
                    })}
            </Button>
        </>
    )
}

export default SelectedGoodsList;