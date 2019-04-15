import React, { PureComponent } from 'react';
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Input } from 'antd';
import { connect } from 'dva';
import ArticleList from "../../../../components/ArticleList/index";
import styles from './index.css';


class Center extends PureComponent {
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
    current_page: 1,
  };

  componentDidMount() {
    const { currentUser } = this.props;
    const { id, tag } = currentUser;
    this.props.dispatch({
      type: 'article/queryCurrentUserArticle',
      payload: {id: id, page_size: 1}
    });
    this.setState({newTags: this.state.newTags.concat(tag)})
  }

  // 为以后的tab（项目）预留
  onTabChange = key => {

  };
  // 关闭标签
  handleClose = async removedTag => {
    const { currentUser } = this.props;
    const { id } = currentUser;
    const newTags = this.state.newTags.filter(newTags => newTags !== removedTag);
    await this.setState({ newTags });
    this.props.dispatch({
      type: 'user/updateUserTag',
      payload: {id: id, values: this.strTag(this.state.newTags)}
    });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  strTag = data => {
    let str = '';
    for (let i = 0; i < data.length; i++) {
      str = data[i] + '-' + str
    }
    return str.substring(0,str.length-1);
  };

  handleInputConfirm = async () => {
    const { state } = this;
    const { inputValue } = state;
    const { currentUser } = this.props;
    const { id } = currentUser;
    let { newTags } = state;
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [...newTags, inputValue.slice(0, 20)];
    }
    await this.setState({
      newTags,
      inputVisible: false,
      inputValue: '',
    });
    this.props.dispatch({
      type: 'user/updateUserTag',
      payload: {id: id, values: this.strTag(this.state.newTags)}
    });
  };

  loadingMoreArticle = () => {
    const { currentUser } = this.props;
    const { id } = currentUser;
    this.props.dispatch({
      type: 'article/appendCurrentUserArticle',
      payload: {id: id, page_size: this.state.current_page+1},
    });
    this.setState({current_page: this.state.current_page+1});
  };

  render() {
    const { newTags, inputVisible, inputValue } = this.state;
    const { currentUser, currentUserList, currentUserList_total } = this.props;
    const {
      name,
      face,
      signature,
      title,
      group
    } = currentUser;

    const operationTabList = [
      {
        key: 'articles',
        tab: (
          <span>
            文章 <span style={{ fontSize: 14 }}>({currentUserList_total})</span>
          </span>
        ),
      },
      {
        key: 'projects',
        tab: (
          <span>
            项目 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        ),
      },
    ];

    return (
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              style={{ marginBottom: 24 }}
            >
              <div>
                <div className={styles.avatarHolder}>
                  <Avatar alt="头像" src={face} className={styles.img}/>
                  <div className={styles.name}>{name}</div>
                  <div>{signature}</div>
                </div>
                <div className={styles.detail}>
                  <p>
                    <Icon type="gift" className={styles.title}/>
                    {title}
                  </p>
                  <p>
                    <Icon type="cluster" className={styles.group}/>
                    {group}
                  </p>
                  <p>
                    <Icon type="environment" className={styles.address}/>
                    中国西安
                  </p>
                </div>
                <Divider dashed />
                <div className={styles.tags}>
                  <div className={styles.tagsTitle}>标签</div>
                  {newTags.map((item, index) => (
                    <Tag
                      key={index}
                      closable={index >= 0}
                      onClose={() => this.handleClose(item)}
                    >{item}</Tag>
                  ))}
                  {inputVisible && (
                    <Input
                      ref={this.saveInputRef}
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputConfirm}
                      onPressEnter={this.handleInputConfirm}
                    />
                  )}
                  {!inputVisible && (
                    <Tag
                      onClick={this.showInput}
                      style={{ background: '#fff', borderStyle: 'dashed' }}
                    >
                      <Icon type="plus" />
                    </Tag>
                  )}
                </div>
              </div>
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              headStyle={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 16, paddingRight: 16 }}
              bordered={false}
              tabList={operationTabList}
              onTabChange={this.onTabChange}
            >
              <ArticleList
                title=""
                list={currentUserList}
                total={currentUserList_total}
                loadingMoreArticle={this.loadingMoreArticle}
              />
            </Card>
          </Col>
        </Row>
    );
  }
}
export default connect(({ user, article }) => ({
  currentUser: user.currentUser,
  currentUserList: article.currentUserList,
  currentUserList_total: article.currentUserList_total
}))(Center);