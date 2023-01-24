import { ProList } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import request from 'umi-request';

type GithubIssueItem = {
  user: string;
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

export default () => (
  <ProList<GithubIssueItem>
    style={{ overflow: 'auto' }}
    toolBarRender={() => {
      return [
        <Button key="3" type="primary">
          新建
        </Button>,
      ];
    }}
    search={{
      filterType: 'light',
    }}
    rowKey="name"
    headerTitle="基础列表"
    request={async (params = {}) =>
      request<{
        data: GithubIssueItem[];
      }>('https://proapi.azurewebsites.net/github/issues', {
        params,
      })
    }
    pagination={{
      pageSize: 15,
    }}
    showActions="hover"
    metas={{
      title: {
        dataIndex: 'user',
        title: '用户',
        render: (text) => <label style={{ wordBreak: 'keep-all' }}>{text}</label>,
      },
      avatar: {
        dataIndex: 'avatar',
        search: false,
      },
      description: {
        dataIndex: 'title',
        search: false,
        render: (text) => <label style={{ wordBreak: 'normal' }}>{text}</label>,
      },
      subTitle: {
        dataIndex: 'labels',
        render: (_, row) => {
          return (
            <Space size={0}>
              {row.labels?.map((label: { name: string }) => (
                <Tag color="blue" key={label.name}>
                  {label.name}
                </Tag>
              ))}
            </Space>
          );
        },
        search: false,
      },
      actions: {
        render: (text, row) => [
          <a href={row.url} target="_blank" rel="noopener noreferrer" key="view">
            查看
          </a>,
        ],
        search: false,
      },
      status: {
        // 自己扩展的字段，主要用于筛选，不在列表中显示
        title: '状态',
        valueType: 'select',
        valueEnum: {
          all: { text: '全部', status: 'Default' },
          open: {
            text: '未解决',
            status: 'Error',
          },
          closed: {
            text: '已解决',
            status: 'Success',
          },
          processing: {
            text: '解决中',
            status: 'Processing',
          },
        },
      },
    }}
  />
);