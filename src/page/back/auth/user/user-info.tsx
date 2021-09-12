import {useParams} from "react-router";
import {UserInfo as UserInfoComponent} from "../../../../component/user/user-info";

export const UserInfo = () => {

    const {account} = useParams();

    return (
        <>
            {
                account ? <UserInfoComponent account={account}/> : <>请重新选择用户</>
            }
        </>
    );
}