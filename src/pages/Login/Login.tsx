import { Button, Checkbox, Form, Typography, Input, Card } from 'antd';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { ROUTE_CONSTANTS } from '../../CONSTANTS';
import { useGetTokenMutation } from '../../services/filmApiService';
import { storageService } from '../../services/storage.service';
import { Logo } from '../../shared/icons';
import styles from './Login.module.css';

const onFinishFailed = () => {};

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [trigger] = useGetTokenMutation();

  const onSubmit = (e: FieldType): void => {
    storageService.setTokenToLocalStorage('token');
    trigger(e)
      .unwrap()
      .then((response) => {
        if (response) {
          // eslint-disable-next-line no-unused-expressions
          e.remember
            ? storageService.setTokenToLocalStorage(response)
            : storageService.setTokenToSessionStorage(response);
          navigate('/');
        } else {
          setShowMessage(true);
        }
      });
  };

  return (
    <main className={styles.main}>
      <Card className={styles.paper}>
        <div className={styles.logoContainer}>
          <Logo className={styles.logo} />
        </div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
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

          <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {showMessage && (
          <Typography.Paragraph color="secondary">
            This user does not exist, maybe your password or email is not correct
          </Typography.Paragraph>
        )}
        <Typography.Paragraph>
          If you are unable to authorize, you may need to{' '}
          <NavLink to={ROUTE_CONSTANTS.REGISTRATION_PAGE}>register</NavLink>
        </Typography.Paragraph>
      </Card>
    </main>
  );
};
