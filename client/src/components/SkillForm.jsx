import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class SkillForm extends React.Component {

  constructor() {
    super();

    this.state = {
      confirmDirty: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onSubmitForm(values);
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input a skill name!',
              },
              {
                validator: null,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Type">
          {getFieldDecorator('type', {
            initialValue: 'Language',
            rules: [
              {
                required: true,
                message: 'Please choose a skill type!',
              },
            ],
          })(
            <Select >
              <Option value="language">Language</Option>
              <Option value="framework">Framework</Option>
              <Option value="design">Design</Option>
              <Option value="database">Database</Option>
              <Option value="tool">Tool</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            rules: [
              {
                required: true,
                message: 'Please input a skill description!',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default SkillForm;