import { Button, Checkbox, Form, Typography, Input, Card } from 'antd';
import { useRef, useState } from 'react';
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
  const email = useRef<any>();
  const password = useRef<any>();
  const remember = useRef<any>();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [trigger] = useGetTokenMutation();

  const onSubmit = (): void => {
    storageService.setTokenToLocalStorage('token');
    trigger({ email: email.current.value, password: password.current.value })
      .unwrap()
      .then((response) => {
        if (response) {
          // this.props.authorize({ authorize: token });
          // eslint-disable-next-line no-unused-expressions
          remember.current.value
            ? storageService.setTokenToLocalStorage(response)
            : storageService.setTokenToSessionStorage(response);
          navigate('/main');
        } else {
          // this.setState({ ...this.state, showMessage: true });
        }
      });
    setShowMessage(true);
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
            <Input bordered={false} ref={email} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password bordered={false} ref={password} />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox ref={remember}>Remember me</Checkbox>
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
