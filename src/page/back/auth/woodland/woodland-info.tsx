import {useParams} from "react-router";
import {WoodlandInfo as WoodlandInfoComponent} from "../../../../component/woodland/woodland-info";


export const WoodlandInfo = () => {

    const {id} = useParams();

    return (
        <>
            {id ? <WoodlandInfoComponent id={Number(id)}/> : <></>}
        </>
    );
}