import React, {FC} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import GoodsList from "./Goods/GoodsList";
import SelectedGoodsList from "./SelectedGoods/SelectedGoodsList";
import Snackbar from "./Snackbar/Snackbar";
import useData from "./hooks/useData";

export const App: FC = () => {
    const {selectedGoods} = useData()
  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Закажите еду в McDonald’s
      </Typography>

      <Grid container spacing={2}>
        <GoodsList />

        <Grid item xs={4}>
          <Paper>
            <Box p={1}>
              <Typography variant="h5" gutterBottom>
                Ваш заказ
              </Typography>



              {selectedGoods.length ? (
                  <SelectedGoodsList />
              ) : (
                <Typography variant="subtitle1" gutterBottom>
                  Корзина пустует
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar />
    </Box>
  );
};
