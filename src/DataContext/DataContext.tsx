import {createContext} from 'react';
import GoodsItem from "../types/GoodsItem";

export interface DataContextInterface {
    isOpenSnackbar: boolean
    setOpenSnackbar: (isOpenSnackbar: boolean) => void
    goods: GoodsItem[]
    setGoods: (goods: GoodsItem[]) => void
    selectedGoods: GoodsItem["id"][]
    setSelectedGoods: (selectedGoods: GoodsItem["id"][]) => void
    addGoodsItem: (id: string) => void
    removeGoodsItem:  (id: string) => void
    openSnackbar: VoidFunction
    closeSnackbar: VoidFunction
    pay: VoidFunction
}

const DataContext = createContext<DataContextInterface>({
    isOpenSnackbar: false,
    setOpenSnackbar: () => undefined,
    goods: [],
    setGoods: () => undefined,
    selectedGoods: [],
    setSelectedGoods: () => undefined,
    addGoodsItem: () => undefined,
    removeGoodsItem: () => undefined,
    openSnackbar: () => undefined,
    closeSnackbar: () => undefined,
    pay: () => undefined
});

export default DataContext