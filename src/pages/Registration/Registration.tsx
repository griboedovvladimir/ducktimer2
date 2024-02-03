import { Button, Card, ConfigProvider, Form, Input, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTE_CONSTANTS } from '../../CONSTANTS';
import { useSetTokenMutation } from '../../services/filmApiService';
import { storageService } from '../../services/storage.service';
import { Logo } from '../../shared/icons';
import styles from '../Login/Login.module.css';

type FieldType = {
  email?: string;
  name?: string;
  password?: string;
};

export const Registration = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [trigger] = useSetTokenMutation();

  useEffect(() => {
    if (storageService.getTokenFromLocalStorage() || storageService.getTokenFromSessionStorage()) {
      navigate(ROUTE_CONSTANTS.ROOT);
    }
  }, [navigate]);

  const onSubmit = (e: FieldType): void => {
    storageService.setTokenToLocalStorage('token');
    trigger(e)
      .unwrap()
      .then((response) => {
        if (response) {
          storageService.setTokenToSessionStorage(response);
          navigate(ROUTE_CONSTANTS.ROOT);
        } else {
          setShowMessage(true);
        }
      });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000000',
          colorBorder: '#000000',
        },
      }}
    >
      <main className={styles.main}>
        <Card className={styles.paper}>
          <div className={styles.logoContainer}>
            <Logo className={styles.logo} />
            <Typography.Title level={3}>Registration</Typography.Title>
          </div>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            onFinishFailed={() => {}}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input bordered={false} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password bordered={false} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
          {showMessage && <Typography.Paragraph>A user with this email already exists</Typography.Paragraph>}
        </Card>
      </main>
    </ConfigProvider>
  );
};
