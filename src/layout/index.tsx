import React, { useState } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import type { RouteConfig } from '@/router';
import { Layout, Menu, Breadcrumb } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';
import styles from './layout.module.less';

const { Header, Content, Footer, Sider } = Layout;

export default function Home({ routes }: { routes?: Array<RouteConfig> }) {
  const [collapsed, onCollapse] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={styles.logo} />
        <Menu theme="dark" defaultSelectedKeys={[routes ? routes[0].path : '']} mode="inline">
          {routes?.map(route => (
            <Menu.Item key={route.path} icon={<PieChartOutlined />}>
              <Link to={route.path}>{route.path}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360 }}>
            <Switch>
              {routes &&
                routes.map(route => (
                  <Route path={route.path} key={route.path}>
                    <route.component />
                  </Route>
                ))}
              <Redirect to={routes![0].path} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}
