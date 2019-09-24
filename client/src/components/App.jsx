import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Drawer, Button, Form } from 'antd';
import SkillForm from './SkillForm.jsx';
import SkillList from './SkillList.jsx';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

var skills = [];

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      drawerVisible: false,
      skills: [],
      content: 'list-skills'
    };

    this.onClose = this.onClose.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.changeContent = this.changeContent.bind(this);
  }

  showDrawer() {
    this.setState({
      visible: true,
    });
  };

  onClose() {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    console.log('mounted');
    if (window.localStorage.getItem('skills')) {
      skills = JSON.parse(window.localStorage.getItem('skills'));
      console.log('storage', skills);
      this.setState({
        skills
      });
    }
  }

  handleSubmitForm(skill) {
    console.log('app', skill);
    skills.push(skill);

    window.localStorage.setItem('skills', JSON.stringify(skills));

    this.setState({
      skills
    });

    this.changeContent('list-skills');
  }

  changeContent(content) {
    this.setState({
      content
    });
  }

  render() {
    console.log(this.state.skills);

    const WrappedSkillForm = Form.create({ name: 'create' })(SkillForm);
    let content = '';

    if (this.state.content === 'list-skills') {
      content = <SkillList skills={this.state.skills} />
    } else if (this.state.content === 'new-skill') {
      content = <WrappedSkillForm onSubmitForm={this.handleSubmitForm} />
    } else if (this.state.content === 'settings') {
      content = 'Settings content will be here';
    }

    return (
      <Layout>
        <div>
          <Drawer
            title="Skills Menu"
            placement="left"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </div>
        <Header className="header">
          <div className="logo" >
            <img onClick={this.showDrawer} src="images/hackreactor-logo.png" />
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['skill-menu-0']}
            style={{ lineHeight: '64px' }}
            className="top-ant-menu"
          >
            <Menu.Item key="skill-menu-0">All Types</Menu.Item>
            <Menu.Item key="skill-menu-1">Languages</Menu.Item>
            <Menu.Item key="skill-menu-2">Framework</Menu.Item>
            <Menu.Item key="skill-menu-3">Design</Menu.Item>
            <Menu.Item key="skill-menu-4">Database</Menu.Item>
            <Menu.Item key="skill-menu-5">Tools</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Skills</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['2']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="laptop" />
                      Skills
                    </span>
                  }
                >
                  <Menu.Item key="1" onClick={this.changeContent.bind(this, 'new-skill')}>New Skill</Menu.Item>
                  <Menu.Item id="list-skills" key="2" onClick={this.changeContent.bind(this, 'list-skills')}>List Skills</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="laptop" />
                      Manage Skills
                    </span>
                  }
                >
                  <Menu.Item key="5">Edit</Menu.Item>
                  <Menu.Item key="6">Delete</Menu.Item>
                </SubMenu>

                <Menu.Item id="settings" key="9" onClick={this.changeContent.bind(this, 'settings')}>
                  <Icon type="setting" />
                  Settings
                </Menu.Item>

              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {content}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Skills Tracker ©2019</Footer>
      </Layout>
    )
  }
}

export default App;