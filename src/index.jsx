import { createRoot} from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import {Container} from "react-bootstrap";
import "./index.scss";

const SceneStealerApp = () =>{
    return (
        <Container>
            <MainView/>
        </Container>
    )
      
};

const root  = createRoot(document.querySelector("#root"));

root.render(<SceneStealerApp/>);


