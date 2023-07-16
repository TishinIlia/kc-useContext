import { render } from "react-dom";
import { StrictMode } from 'react';

import { App } from "./App";
import DataProvider from "./DataContext/DataProvider";
import initializeAPI from './API/API'

initializeAPI()

const rootElement = document.getElementById("root");
render(
    <StrictMode>
        <DataProvider><App /></DataProvider>
    </StrictMode>
, rootElement);