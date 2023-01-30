import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable,WaterMark } from '@ant-design/pro-components';
import { useRef } from 'react';
import request from 'umi-request';

type InterfaceLogItem = {
  id: number,
  tenantId: string,
  userId: string,
  content: string,
  creatTime: string
};

const columns: ProColumns<InterfaceLogItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '租户id',
    dataIndex: 'tenantId',
    ellipsis: true,
    width: 280
  },
  {
    title: '用户id',
    dataIndex: 'userId',
    width: 80
  },
  {
    title: '发送内容',
    dataIndex: 'content',
    copyable: true,
    ellipsis: true,
    search: false
  },
  {
    title: '请求时间',
    dataIndex: 'creatTime',
    search: false,
    width: 150,
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <WaterMark content="dog">
    <ProTable<InterfaceLogItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}) => {
        return request<{
          data: InterfaceLogItem[];
        }>('https://qianyushop.shop/api/openStage/queryWebsocketLog', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="uuid"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
    />
    </WaterMark>
  );
};