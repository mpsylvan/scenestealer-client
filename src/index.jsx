import { createRoot} from 'react-dom/client';
import { MainView } from './components/main-view/main-view';

import "./index.scss";

const SceneStealerApp = () =>{
    return <MainView/>;
      
};

const root  = createRoot(document.querySelector("#root"));

root.render(<SceneStealerApp/>);


