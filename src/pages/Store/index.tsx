import {
  CheckCircleFilled,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Col, Pagination, Row, Space, Tag } from 'antd';

export default () => (
  <div
    style={{
      background: '#F5F7FA',
    }}
  >
    <PageContainer
      loading={false}
      header={{
        title: '店铺',
        ghost: true,
        extra: [
          <Button key="1" type="primary">
            添加店铺
          </Button>,
        ],
      }}
      tabBarExtraContent={
        <Space>
          <Button icon={<DownloadOutlined />}></Button>
          <Button icon={<ReloadOutlined />}></Button>
        </Space>
      }
      tabList={[
        {
          tab: '全部店铺',
          key: 'base',
          closable: false,
        },
        {
          tab: '详细',
          key: 'detail',
        },
      ]}
      tabProps={{
        type: 'editable-card',
        hideAdd: true,
        onEdit: (e, action) => console.log(e, action),
      }}
      footer={[
        <Pagination
          style={{ justifyContent: 'center', alignItems: 'center' }}
          key="pagination"
          total={85}
          simple
          showTotal={(total) => `${total}`}
          defaultCurrent={1}
        />,
      ]}
      footerToolBarProps={{
        style: {},
      }}
    >
      <Row gutter={[8, 16]}>
        {Array(20)
          .fill('tset')
          .map((item, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
              <ProCard
                hoverable
                title={`店铺${index + 1}`}
                bordered
                extra={<Tag icon={<CheckCircleFilled />} color="success" />}
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <DeleteOutlined key="delete" />,
                ]}
                onClick={() => {
                  console.log(index);
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
