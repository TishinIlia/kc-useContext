import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWDDasjKyXJV1FqtuwIyg3sYikxtMm8t0",
  authDomain: "karpov-frontend-homework.firebaseapp.com",
  projectId: "karpov-frontend-homework",
  storageBucket: "karpov-frontend-homework.appspot.com",
  messagingSenderId: "169428170688",
  appId: "1:169428170688:web:bfddea098b66071710fa25"
};

initializeApp(firebaseConfig);
const db = getFirestore();

interface GoodsAPI {
  image: string;
  name: string;
  info: string;
  price: number;
}

interface GoodsItem extends GoodsAPI {
  id: string;
}

export const App = () => {
  const [goods, setGoods] = useState<GoodsItem[]>([]);
  const [selectedGoods, setSelectedGoods] = useState<GoodsItem["id"][]>([]);
  const [isOpenSnackbar, setOpenSnackbar] = useState(false);
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

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "food-goods"));
      const result: GoodsItem[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as GoodsAPI;

        result.push({ id: doc.id, ...data });
      });

      setGoods(result);
    })();
  }, []);

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Закажите еду в McDonald’s
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            {goods.map((item) => {
              const selected = selectedGoods.includes(item.id);

              return (
                <Grid item xs={6} key={item.id}>
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
              );
            })}
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Paper>
            <Box p={1}>
              <Typography variant="h5" gutterBottom>
                Ваш заказ
              </Typography>

              {selectedGoods.length ? (
                <>
                  <List dense>
                    {selectedGoods.map((id) => {
                      const goodsItem = goods.find((item) => item.id === id);

                      if (!goodsItem) {
                        return null;
                      }

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
                      );
                    })}
                  </List>

                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={pay}
                  >
                    Оплатить{" "}
                    {selectedGoods
                      .reduce((sum, id) => {
                        const goodsItem = goods.find((item) => item.id === id);

                        return sum + (goodsItem ? goodsItem.price : 0);
                      }, 0)
                      .toLocaleString("ru-RU", {
                        style: "currency",
                        currency: "RUB",
                        maximumFractionDigits: 0
                      })}
                  </Button>
                </>
              ) : (
                <Typography variant="subtitle1" gutterBottom>
                  Корзина пустует
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={isOpenSnackbar}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Оплачено!
        </Alert>
      </Snackbar>
    </Box>
  );
};
