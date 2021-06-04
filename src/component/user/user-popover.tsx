import {User} from "../../type/user";
import {Popover} from "antd";
import {Link} from "react-router-dom";
import {generatePath} from "react-router";

export const UserPopover = ({ user }: { user: User | undefined }) => {
    return (
        <>
            {user ? (
                <Popover
                    content={
                        <div>
                            姓名:{user.name}
                            <br />
                            组织:{user.organization}
                            <br />
                            账号:{user.account}
                        </div>
                    }
                    title="用户信息"
                >
                    <Link
                        to={generatePath("/back/user/info/:account", {
                            account: String(user.account),
                        })}
                    >
                        {user.name}
                    </Link>
                </Popover>
            ) : (
                <></>
            )}
        </>
    );
}
