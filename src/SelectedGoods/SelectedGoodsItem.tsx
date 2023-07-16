import React, {FC} from 'react'
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import GoodsItem from "../types/GoodsItem";
import useData from "../hooks/useData";

interface SelectedGoodsItemProps {
    goodsItem: GoodsItem
}

const SelectedGoodsItem: FC<SelectedGoodsItemProps> = ({goodsItem}) => {
    const {removeGoodsItem} = useData()
    return (
        <ListItem
            key={goodsItem.id}
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeGoodsItem(goodsItem.id)}
                >
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar
                    alt={goodsItem.name}
                    src={goodsItem.image}
                />
            </ListItemAvatar>
            <ListItemText primary={goodsItem.name} />
        </ListItem>
    )
}

export default SelectedGoodsItem