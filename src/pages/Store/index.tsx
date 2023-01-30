import {
  SyncOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Col, Pagination, Row, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { history, Link, useLocation, useParams } from 'umi';

export default () => {
  const { id } = useParams();
  const location = useLocation();

  console.log(location);
  const [tabList, setTabList] = useState([
    {
      tab: '全部店铺',
      key: 'base',
      closable: false,
    },
  ]);

  useEffect(() => {
    if (id) {
      if (!tabList.find((value) => value.key === id)) {
        setTabList([...tabList, { tab: `店铺${id}`, key: id, closable: true }]);
      }
    }
  }, [id]);
  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        loading={false}
        tabActiveKey={id || 'base'}
        header={{
          title: '店铺',
          ghost: true,
          breadcrumb: {
            routes: [],
          },
          extra: [
            <Button key="1" type="primary">
              添加店铺
            </Button>,
          ],
        }}
        onTabChange={(activeKey) => {
          if (activeKey === 'base') {
            history.push('/store');
          } else {
            history.push(`/store/${activeKey}`);
          }
        }}
        tabBarExtraContent={
          <Space>
            <Button icon={<DownloadOutlined />}></Button>
            <Button icon={<ReloadOutlined />}></Button>
          </Space>
        }
        tabList={tabList}
        tabProps={{
          type: 'editable-card',
          hideAdd: true,
          onEdit: (e, action) => {
            if (action === 'remove') {
              history.push('/store');
              setTabList(tabList.filter((item) => item.key !== e));
            }
          },
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
        {location.pathname === '/store' && (
          <Row gutter={[8, 16]}>
            {Array(2)
              .fill('tset')
              .map((item, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                  <ProCard
                    hoverable
                    title="千渝味黔江鸡杂·干锅·汤锅"
                    bordered
                    extra={<Tag icon={<SyncOutlined spin />} color="#87d068">
                      营业中
                    </Tag>}
                    actions={[
                      <SettingOutlined key="setting" />,
                      <EditOutlined key="edit" />,
                      <DeleteOutlined key="delete" />,
                    ]}
                    onClick={() => {
                      history.push(`/store/${index}`);
                    }}
                  >
                    <div>到期剩余 10天</div>
                  </ProCard>
                </Col>
              ))}
          </Row>
        )}
        {id && (
          <div>
            <div>{'店铺' + id + '详细'}</div>
            <Link to={`/store/${id}/dishes`}>所有菜单</Link>
          </div>
        )}
      </PageContainer>
    </div>
  );
};
