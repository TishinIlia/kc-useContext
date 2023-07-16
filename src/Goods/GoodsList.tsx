import React, {FC, useEffect} from 'react';
import {collection, getDocs, getFirestore} from "firebase/firestore";
import Grid from "@mui/material/Grid";

import GoodsItem from "../types/GoodsItem";
import GoodsAPI from "../types/GoodsAPI";

import GoodsElement from "./GoodsElement";
import useData from "../hooks/useData";

const GoodsList: FC = () => {
    const db = getFirestore()
    const {setGoods, goods, selectedGoods} = useData()


    useEffect(() => {
        (async () => {
            if (!db) {
                return
            }
            const querySnapshot = await getDocs(collection(db, "food-goods"));
            const result: GoodsItem[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data() as GoodsAPI;

                result.push({ id: doc.id, ...data });
            });

            setGoods(result);
        })();
    }, [db, setGoods]);

    return (
        <Grid item xs={8}>
            <Grid container spacing={2}>
                {goods.map((item) => {
                    const selected = selectedGoods.includes(item.id);

                    return (
                        <GoodsElement key={item.id} selected={selected} item={item} />
                    );
                })}
            </Grid>
        </Grid>
    )
}

export default GoodsList