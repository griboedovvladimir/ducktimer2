import { Button, Card, Form, Input, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import { storageService } from '../../services/storage.service';
import { Logo } from '../../shared/icons';
import styles from './Registration.module.css';

type FieldType = {
  email?: string;
  name?: string;
  password?: string;
};

export const Registration = () => {
  const [showMessage] = useState('');

  useEffect(() => {
    if (storageService.getTokenFromLocalStorage() || storageService.getTokenFromSessionStorage()) {
      // this.props.history.push('/main');
    }
    // this.props.switchTheme('b-n-w');
  }, []);

  const onSubmit = (): void => {
    // restService.post(API_CONSTANTS.REGISTER, this.register).then(response => {
    //   response.text().then(token => {
    //     if (token) {
    //       this.props.authorize({ authorize: token });
    //       storageService.setTokenToSessionStorage(token);
    //       this.props.history.push('/main');
    //     } else {
    //       this.setState({ ...this.state, showMessage: true });
    //     }
    //   });
    // });
  };

  return (
    <main className={styles.main}>
      <Card className={styles.paper}>
        <div className={styles.logoContainer}>
          <Logo className={styles.logo} />
        </div>

        <Typography.Title level={5}>Registration</Typography.Title>
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
  );
};
