import React from 'react';
import { Table, Button, Divider, Popconfirm, Modal, Form, Input, Pagination } from 'antd';

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
        {
          id: '4',
          key: '4',
          name: 'Jeckey Brown',
          age: 24,
          address: 'address 4',
        },
        {
          id: '5',
          key: '5',
          name: 'Jeckey Brown',
          age: 25,
          address: 'address 5',
        },
        {
          id: '6',
          key: '6',
          name: 'Jeckey Brown',
          age: 26,
          address: 'address 6',
        },
        {
          id: '7',
          key: '7',
          name: 'Jeckey Brown',
          age: 27,
          address: 'address 7',
        },
      ],
      // eslint-disable-next-line react/no-unused-state
      count: 3,
      visible: false,
      formLayout: 'horizontal',
      editingValue: {
        id: '',
        key: '',
        name: '',
        age: '',
        address: '',
      },
      pageSize: 3,
      pageNum: 0,
      total: 0,
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
    const editingValue = { ...this.state.editingValue };
    if (editingValue.id) {
      const index = dataSource.findIndex(item => item.id === editingValue.id);
      if (index !== -1) {
        dataSource[index] = editingValue;
      }
    } else {
      editingValue.id = dataSource.length + 1;
      editingValue.key = dataSource.length + 1;
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
    // eslint-disable-next-line react/no-access-state-in-setstate
    const editValue = {
      id: '',
      key: '',
      name: '',
      age: '',
      address: '',
    };
    this.setState({
      visible: true,
      editingValue: editValue,
    });
  };

  // eslint-disable-next-line class-methods-use-this
  onShowSizeChange(current, pageSize) {
    console.log('current, pagesize: ', current, pageSize);
    // this.setState({
    //   pageSize,
    // });
  }

  // eslint-disable-next-line class-methods-use-this
  onChange(pageNum, pageSize) {
    console.log('pagenum, pagesize; ', pageNum, pageSize);
    // this.setState({
    //   pageNum,
    //   pageSize,
    // });
  }

  // eslint-disable-next-line class-methods-use-this
  showTotal(total) {
    return `共计${total}条数据`;
  }

  render() {
    const { formLayout, editingValue, dataSource, pageNum, pageSize, total } = this.state;
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : null;
    const pagination = {
      showQuickJumper: true,
      showSizeChanger: true,
      total: dataSource.length,
      pageSize,
      current: pageNum,
      pageSizeOptions: ['2', '3', '10', '20'],
      onShowSizeChange: this.onShowSizeChange,
      onChange: this.onChange,
      showTotal: this.showTotal,
    };
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          新增dd
        </Button>
        <Table columns={this.columns} dataSource={dataSource} pagination={pagination} />
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
