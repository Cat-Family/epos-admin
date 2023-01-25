import {
    CheckCircleFilled,
    DeleteOutlined,
    EditOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import {Col, Row, Tag } from 'antd';
import { history } from 'umi';

export default () => {




    return (
        <div
            style={{
                background: '#F5F7FA',
            }}
        >
            <PageContainer
                loading={false}
                header={{
                    title: '服务',
                    ghost: true,
                }}
                footerToolBarProps={{
                    style: {},
                }}
            >
                <Row gutter={[8, 16]}>
                    {Array(4)
                        .fill('tset')
                        .map((item, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                                <ProCard
                                    hoverable
                                    title={`服务${index + 1}`}
                                    bordered
                                    // extra={<Tag icon={<CheckCircleFilled />} color="success" />}
                                    
                                    actions={[
                                        <SettingOutlined key="setting" />,
                                        <EditOutlined key="edit" />,
                                    ]}
                                    onClick={() => {
                                        history.push(`/store/${index}`);
                                    }}
                                >
                                    <div>开铺时间-{new Date().getFullYear()}</div>
                                    <div>店员4人</div>
                                </ProCard>
                            </Col>
                        ))}
                </Row>
            </PageContainer>
        </div>
    );
};
