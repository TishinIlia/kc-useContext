import React, { FC } from 'react';
import Card from "@mui/material/Card";
import {Button, CardActionArea, CardActions} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import GoodsItem from '../types/GoodsItem';
import useData from "../hooks/useData";

interface GoodsItemProps {
    item: GoodsItem
    selected: boolean
}

const GoodsElement: FC<GoodsItemProps> = ({
    item,
    selected
                                       }) => {
    const {addGoodsItem} = useData()

    return (
        <Grid item xs={6}>
            <Card
                onClick={() => {
                    if (!selected) {
                        addGoodsItem(item.id);
                    }
                }}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.primary">
                            {item.price.toLocaleString("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                maximumFractionDigits: 0
                            })}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                WebkitLineClamp: 3,
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical"
                            }}
                        >
                            {item.info}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        size="small"
                        color={selected ? "success" : "primary"}
                        onClick={() => {
                            if (!selected) {
                                addGoodsItem(item.id);
                            }
                        }}
                    >
                        {selected ? "в корзине" : "в корзину"}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default GoodsElement