import {getWoodlandShapeInfo, Woodland} from "../../type/woodland";
import {Popover} from "antd";
import {Link} from "react-router-dom";
import {generatePath} from "react-router";


export const WoodlandPopover = ({ woodland }: { woodland: Woodland | undefined }) => {
    return (
        <>
            {woodland ? (
                <Popover
                    content={
                        <div>
                            林地名:{woodland.name}
                            <br />
                            坐标:{woodland.position.longitude+""+woodland.position.latitude}
                            <br />
                            行政区:{woodland.country+" "+woodland.province+" "+woodland.city}
                            <br />
                            详细地址:{woodland.address}
                            <br />
                            形状:{getWoodlandShapeInfo(woodland.shape)}
                            <br />
                            长宽:{woodland.length + " " +woodland.width}
                            <br />
                        </div>
                    }
                    title="林地信息"
                >
                    <Link
                        to={generatePath("/back/woodland/info/:id", {
                            id: String(woodland.id),
                        })}
                    >
                        {woodland.name}
                    </Link>
                </Popover>
            ) : (
                <></>
            )}
        </>
    );
}