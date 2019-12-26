import React from 'react';
import { Button } from 'antd';

class Alarm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      // eslint-disable-next-line react/no-unused-state
      timer: '',
    };
  }

  componentDidMount = () => {
    this.timer = setInterval(() => this.getAlarm(), 1000);
  };

  componentWillMount = () => {
    clearInterval(this.timer);
  };

  startAlarm = () => {
    this.timer = setInterval(() => this.getAlarm(), 1000);
  };

  stopAlarm = () => {
    clearInterval(this.timer);
  };

  getAlarm = () => {
    this.setState({
      date: new Date(),
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.startAlarm} style={{ margin: 10 }}>
          开始
        </Button>
        <Button onClick={this.stopAlarm} style={{ margin: 10 }}>
          停止
        </Button>
        <h2 style={{ textAlign: 'center' }}>{this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

export default Alarm;
