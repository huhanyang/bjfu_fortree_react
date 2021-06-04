import {Button, Form, Input, message, Modal, Select} from "antd";
import {useState} from "react";
import {Point} from "../../../../type/Point";
import {Map, Marker} from 'react-bmapgl';
import {CreateWoodlandRequestParams, useCreateWoodland} from "../../../../utils/woodland";
import {useNavigate} from "react-router";


export const WoodlandCreate = () => {

    const [showMap, setShowMap] = useState(false);
    const [position, setPosition] = useState<Point>({longitude: 116.40345879918985, latitude: 39.92396687340759});
    const [address, setAddress] = useState("");
    const [form] = Form.useForm();

    const {mutateAsync: createWoodland, isLoading: isCreateWoodlandLoading} = useCreateWoodland();
    const navigate = useNavigate();

    const handleSubmit = async (value: CreateWoodlandRequestParams) => {
        try {
            await createWoodland({...value}).then(() => {
                navigate("/back/applyJob/list", { replace: true });
            });
        } catch (e) {
            message.error(e.message);
        }
    }

    const ChoosePositionDrawer = () => {
        return (
            <Modal
                title="选择林地位置"
                footer={null}
                visible={showMap}
                onCancel={() => {
                    setShowMap(false);
                }}
            >
                <Map
                    center={new BMapGL.Point(Number(position?.longitude), Number(position?.latitude))}
                    zoom={17}
                    enableDoubleClickZoom
                    enableScrollWheelZoom
                    enableDragging
                    onClick={(e)=>{
                        // @ts-ignore
                        const point = new BMapGL.Point(e.latlng?.lng, e.latlng.lat);
                        new BMapGL.Geocoder().getLocation(point, (rs) => {
                            setAddress(rs.address);
                            let country, province, city;
                            if(rs.addressComponents.district!=null && rs.addressComponents.district!=="") {
                                country = "中华人民共和国";
                                province = rs.addressComponents.province;
                                city = rs.addressComponents.city;
                                city = city===""?rs.addressComponents.district:city;
                            } else {
                                const address = rs.address.replace(/\s+/g,"").split(",");
                                country = address[2];
                                province = address[1];
                                city = address[0];
                            }
                            setPosition({...position, longitude: point.lng, latitude: point.lat})
                            form.setFieldsValue({country, province, city, address: rs.address});
                            form.setFieldsValue({ position: {longitude: point.lng, latitude: point.lat} });
                        });
                    }}
                >
                    {
                        // @ts-ignore
                        position?<Marker position={new BMapGL.Point(position.longitude, position.latitude)} />:<></>
                    }
                </Map>
                {address==null?<></>:<>地址：{address}<br/>坐标：{position?.longitude},{position?.latitude}</>}
            </Modal>
        );
    }

    return (
        <>
            <Form
                form={form}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="name"
                    label="林地名称"
                    rules={[
                        { required: true, message: '请输入林地名称!' }
                    ]}
                >
                    <Input placeholder="请输入林地名称" maxLength={32} />
                </Form.Item>
                <Form.Item label="位置坐标">
                    <Form.Item
                        name={["position","longitude"]}
                        noStyle
                        rules={[
                            { required: true, message: '请输入经度!' }
                        ]}
                    >
                        <Input
                            prefix="经度"
                            type="number"
                            style={{ width: '32%' }}
                            placeholder="请输入经度"
                            onChange={(e)=>{
                                const { value } = e.target;
                                setPosition({...position, longitude: Number(value)})
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name={["position","latitude"]}
                        noStyle
                        rules={[
                            { required: true, message: '请输入纬度!' }
                        ]}
                    >
                        <Input
                            prefix="纬度"
                            type="number"
                            style={{ width: '34%' }}
                            placeholder="请输入纬度"
                            onChange={(e)=>{
                                const { value } = e.target;
                                setPosition({...position, latitude: Number(value)})
                            }}
                        />
                    </Form.Item>
                    <Button
                        type="link"
                        style={{ margin: '0 8px' }}
                        onClick={()=>{setShowMap(true);}}
                    >
                        从地图中选取坐标
                    </Button>
                </Form.Item>
                <Form.Item
                    name="country"
                    label="国家"
                    rules={[
                        { required: true, message: '请输入国家!' }
                    ]}
                >
                    <Input placeholder="请输入国家" maxLength={32} />
                </Form.Item>
                <Form.Item
                    name="province"
                    label="省份"
                    rules={[
                        { required: true, message: '请输入林省份!' }
                    ]}
                >
                    <Input placeholder="请输入省份" maxLength={32} />
                </Form.Item>
                <Form.Item
                    name="city"
                    label="城市"
                    rules={[
                        { required: true, message: '请输入城市!' }
                    ]}
                >
                    <Input placeholder="请输入城市" maxLength={32} />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="详细地址"
                    rules={[
                        { required: true, message: '请输入详细地址!' }
                    ]}
                >
                    <Input placeholder="请输入林地详细地址" maxLength={64} />
                </Form.Item>
                <Form.Item label="林地形状">
                    <Form.Item
                        noStyle
                        name="shape"
                        rules={[
                            { required: true, message: '请选择样地的形状!' }
                        ]}
                    >
                        <Select style={{ width: '32%' }} placeholder="样地形状">
                            <Select.Option value="SQUARE">正方形</Select.Option>
                            <Select.Option value="RECTANGLE">长方形</Select.Option>
                            <Select.Option value="CIRCULAR">圆形</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        name="length"
                        rules={[
                            { required: true, message: '请输入长度!' }
                        ]}
                    >
                        <Input type="number" style={{ width: '34%' }}  placeholder="输入长度" suffix="米" />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        name="width"
                        rules={[
                            { required: true, message: '请输入宽度!' }
                        ]}
                    >
                        <Input type="number" style={{ width: '34%' }}  placeholder="输入宽度" suffix="米" />
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isCreateWoodlandLoading} >
                        创建林地
                    </Button>
                </Form.Item>
            </Form>
            <ChoosePositionDrawer/>
        </>
    );
}