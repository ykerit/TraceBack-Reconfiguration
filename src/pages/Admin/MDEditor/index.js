import React, {Component} from 'react';
import {message} from 'antd';
import {connect} from 'dva';
import MarkDownEdit from '../../../library/src/markdown-edit';
import ArticleEdit from '../../../components/ArticlePublish/index';
import router from 'umi/router';
import { getlocalStorage } from '../../../utils/helper';

class MdeEditorPage extends Component {
  state ={
    visible: false,
    title: '',
    text: '',
    html: '',
    tag: [],
    kind: null,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'kind/queryAllClass'
    });
    this.height = document.getElementById("editContent")
  };

  strTag = data => {
    let str = '';
    for (let i = 0; i < data.length; i++) {
      str = data[i] + '-' + str
    }
    return str.substring(0,str.length-1);
  };

  releaseArticle = () => {
    this.setState({visible: false});

    if (this.state.title !== '' &&
      this.state.html !== '' &&
      this.state.html !== '') {
      console.log(getlocalStorage('id'), this.props.id, this.props.isAuthorization);
      if (getlocalStorage('id') && this.props.id && this.props.isAuthorization) {
        this.props.dispatch({
          type: 'article/createArticle',
          payload: {'title': this.state.title,
            'body': this.state.text,
            'body_html': this.state.html,
            'kind': this.state.kind,
            'tag': this.strTag(this.state.tag),
            'id': this.props.id
          }
        });
        router.push('/Admin/Article');
      } else {
        message.warning('新建失败!');
      }
    }
  };

  receiveTag = tags => this.setState({tag: tags});
  receiveKind = kinds => this.setState({kind: kinds});
  receiveTitle = e => this.setState({title: e});

  onChange =(html, mark) => {
    this.setState({text: mark, html: html});
  };

  // 添加分类
  addClassification = res => {
    this.props.dispatch({
      type: 'admin/createKind',
      payload: { name: res }
    });
  };

  render(){
    const editOptions = {
      visible: this.state.visible,
      receiveTag: this.receiveTag,
      receiveKind: this.receiveKind,
      releaseArticle: this.releaseArticle,
      receiveTitle: this.receiveTitle,
      classification: this.props.classification,
      onCancel: () => this.setState({visible: false}),
      onOpen: () => this.setState({visible: true}),
      backAdmin: () => router.push('/Admin/Article'),
      addClassification: this.addClassification
    };

    return (
      <div id="editContent">
        <ArticleEdit
          {...editOptions}
        >
          <MarkDownEdit
            height={this.height - 80}
            onChange={this.onChange}
          />
        </ArticleEdit>
      </div>
    );
  }
}

export default connect(({user, kind}) => ({
  classification: kind.classification,
  id: user.currentUser.id,
  isAuthorization: user.currentUser.isAuthorization
}))(MdeEditorPage);
