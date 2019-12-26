import React from 'react';
import { Table, Button, Divider, Popconfirm, Modal, Form, Input } from 'antd';
// import RightContent from '@/components/GlobalHeader/RightContent';
function MyFrom() {
  this.id = '';
  this.key = '';
  this.name = '';
  this.age = '';
  this.address = '';
}
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={() => this.edit(record)}>edit</a>
            <Divider type="vertical" />
            {this.state.dataSource.length >= 1 ? (
              <Popconfirm title="确认删除？" onConfirm={() => this.handleDelete(record)}>
                <a>Delete</a>
              </Popconfirm>
            ) : null}
          </span>
        ),
      },
    ];

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      dataSource: [
        {
          id: '1',
          key: '1',
          name: 'John Brown',
          age: 22,
          address: 'address 1',
        },
        {
          id: '2',
          key: '2',
          name: 'Lucy Brown',
          age: 21,
          address: 'address 2',
        },
        {
          id: '3',
          key: '3',
          name: 'Jeckey Brown',
          age: 23,
          address: 'address 3',
        },
      ],
      // eslint-disable-next-line react/no-unused-state
      count: 3,
      visible: false,
      formLayout: 'horizontal',
      editingValue: new MyFrom(),
    };
  }

  edit = record => {
    this.setState({ editingValue: record });
    this.setState({
      visible: true,
    });
  };

  handleChange = e => {
    const { editingValue } = this.state;
    const editingVal = { ...editingValue };
    editingVal[e.target.name] = e.target.value;
    this.setState({
      editingValue: editingVal,
    });
  };

  handleOk = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const dataSource = [...this.state.dataSource];
    // console.log('dataSource:', dataSource);
    const editingValue = { ...this.state.editingValue };
    if (editingValue.id !== '') {
      let i = 0;
      for (i; i < dataSource.length;) {
        if (dataSource[i].id === editingValue.id) {
          dataSource[i] = editingValue;
        }
        i += 1;
      }
    } else {
      editingValue.id = dataSource.length;
      dataSource.push(editingValue);
    }
    this.setState({
      dataSource,
    });
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleDelete = record => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.id !== record.id) });
  };

  handleAdd = () => {
    const editValue = new MyFrom();
    this.setState({ editingValue: editValue });
    this.setState({
      visible: true,
    });
  };

  render() {
    const { formLayout, editingValue } = this.state;
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : null;
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          新增dd
        </Button>
        <Table columns={this.columns} dataSource={this.state.dataSource} />
        <Modal
          title="修改数据"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form layout={formLayout}>
            <Form.Item label="名称" {...formItemLayout}>
              <Input
                name="name"
                placeholder="input placeholder"
                value={editingValue.name}
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item label="年龄" {...formItemLayout}>
              <Input
                placeholder="input placeholder"
                value={editingValue.age}
                name="age"
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item label="地址" {...formItemLayout}>
              <Input
                placeholder="input placeholder"
                value={editingValue.address}
                name="address"
                onChange={this.handleChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default EditableTable;
