import { createRoot} from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import {Container} from "react-bootstrap";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./index.scss";

const SceneStealerApp = () =>{
    return (
        <Provider store = {store}>
            <Container>
                <MainView/>
            </Container>
        </Provider>
    )
      
};

const root  = createRoot(document.querySelector("#root"));

root.render(<SceneStealerApp/>);


