import { createRoot} from 'react-dom/client';

import "./index.scss";

const SceneStealerApp = () =>{
    return (
        <div className = "scene-steal">
            <div> Good Morning </div>
        </div>
    );
};

const container = document.querySelector("#root");
const root  = createRoot(container);

root.render(<SceneStealerApp/>);



