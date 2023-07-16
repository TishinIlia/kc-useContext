import React, {FC, ReactNode, useState} from 'react';

import DataContext, {DataContextInterface} from './DataContext';
import GoodsItem from "../types/GoodsItem";

interface Props {
    children: ReactNode;
}

const DataProvider: FC<Props> = ({ children }) => {
    const [isOpenSnackbar, setOpenSnackbar] = useState(false);
    const [goods, setGoods] = useState<GoodsItem[]>([]);
    const [selectedGoods, setSelectedGoods] = useState<GoodsItem["id"][]>([]);

    const addGoodsItem = (id: string) => {
        setSelectedGoods([...selectedGoods, id]);
    };
    const removeGoodsItem = (id: string) => {
        setSelectedGoods(selectedGoods.filter((item) => item !== id));
    };

    const openSnackbar = () => {
        setOpenSnackbar(true);
    };
    const closeSnackbar = () => {
        setOpenSnackbar(false);
    };
    const pay = () => {
        openSnackbar();
        setSelectedGoods([]);
    };

    const value: DataContextInterface = {
        isOpenSnackbar, setOpenSnackbar, goods, setGoods, selectedGoods, setSelectedGoods, addGoodsItem, removeGoodsItem, openSnackbar, closeSnackbar, pay
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
