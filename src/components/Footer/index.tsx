import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Cat-Family',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '千渝掌柜',
          title: '千渝掌柜 - 开放平台',
          href: 'https://github.com/Cat-Family/epos-admin/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Cat-Family',
          blankTarget: true,
        },
        {
          key: 'Cat-Family',
          title: 'Cat-Family',
          href: 'https://github.com/Cat-Family',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
