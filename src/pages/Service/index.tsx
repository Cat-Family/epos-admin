import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import { RingProgress } from '@ant-design/charts';
import { Tag, Button } from 'antd';
import { request } from 'umi';
import { SyncOutlined, PoweroffOutlined,ReloadOutlined } from '@ant-design/icons';

const { Statistic } = StatisticCard;


    
// 系统服务概览
const SystemCatPie = () => {
    const config = {
        height: 150,
        width: 150,
        autoFit: true,
        percent: 0.4,
        color: ['#F4664A', '#E8EDF3'],
        innerRadius: 0.85,
        radius: 0.98,
        statistic: {
            title: {
                style: {
                    color: '#363636',
                    fontSize: '12px',
                    lineHeight: '14px',
                },
                formatter: () => '内存使用率',
            },
        },
    };
    return <RingProgress {...config} />;
};

const a = () => {
    console.log("sss")
}
export default () => {

    const [responsive, setResponsive] = useState(false);
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };

    const req = () => {request('https://qianyushop.shop/api/openStage/queryInterfaceLog', {
        params: {
            current: 1,
            pageSize: 10
        },
        method: "GET",
        skipErrorHandler: true,
      }).then((resp => {
        console.log(resp.code)
      }))} ;

    return (
        <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
                setResponsive(offset.width < 596);
            }}
        >
            {Array(2)
                .fill('tset')
                // eslint-disable-next-line react/jsx-key
                .map((item, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <ProCard split={responsive ? 'horizontal' : 'vertical'} style={{ marginTop: 10 }}>
                        <StatisticCard
                            onClick={a}
                            hoverable
                            colSpan={responsive ? 24 : 24}
                            title="千渝掌柜"
                            statistic={{
                                title: '服务器IP',
                                value: "82.157.67.150"
                            }}
                            chart={
                                SystemCatPie()
                            }
                            footer={
                                <>
                                    <Statistic value="70.98%" title="CPU使用率" layout="horizontal" />
                                    <Tag icon={<SyncOutlined spin />} color="#87d068">
                                        运行中
                                    </Tag>
                                    <Button
                                        style={{ float: "right" }}
                                        size="small"
                                        type="primary"
                                        icon={<ReloadOutlined />}
                                        loading={loadings[2]}
                                        onClick={() => req()}
                                    >
                                        重启
                                    </Button>
                                    <Button
                                        style={{ float: "right",marginRight: 8 }}
                                        size="small"
                                        type="primary"
                                        danger
                                        icon={<PoweroffOutlined />}
                                        loading={loadings[2]}
                                        onClick={() => enterLoading(2)}
                                    >
                                        停止
                                    </Button>
                                </>
                            }
                        />
                    </ProCard>
                ))}
        </RcResizeObserver>
    );
};