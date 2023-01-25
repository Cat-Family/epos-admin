import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import request from 'umi-request';

type InterfaceLogItem = {
  uuid: string,
  reqName: string,
  reqUrl: string,
  tenantId: string,
  reqUser: string,
  clientVersion: string,
  reqParameters: string,
  respResult: string,
  respCode: string,
  time: string,
  creatTime: string
};

const columns: ProColumns<InterfaceLogItem>[] = [
  {
    title: '接口名称',
    dataIndex: 'reqName',
    ellipsis: true
  },
  {
    title: '接口路径',
    dataIndex: 'reqUrl',
    ellipsis: true
  },
  {
    title: '店铺id',
    dataIndex: 'tenantId',
    ellipsis: true
  },
  {
    title: '用户',
    dataIndex: 'reqUser',
    ellipsis: true,
  },
  {
    title: '接口版本',
    dataIndex: 'clientVersion',
    ellipsis: true,
  },
  {
    title: '请求参数',
    dataIndex: 'reqParameters',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '返回参数',
    dataIndex: 'respResult',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '返回状态码',
    dataIndex: 'respCode',
    // ellipsis: true,
  },
  {
    title: '耗时',
    dataIndex: 'time',
    ellipsis: true,
  },
  {
    title: '请求时间',
    dataIndex: 'creatTime',
    width: 150
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<InterfaceLogItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}) => {
        return request<{
          data: InterfaceLogItem[];
        }>('https://qianyushop.shop/api/openStage/queryInterfaceLog', {
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
  );
};