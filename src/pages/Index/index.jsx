import React, { Component } from 'react';
import { connect } from 'dva';
import ArticleList from "../../components/ArticleList/index";
import { getlocalStorage, dellocalStorage } from '../../utils/helper';

class IndexPage extends Component {
  state = {
    current_page: 1,
  };
  componentDidMount(){
    if (getlocalStorage('id')) {
      this.props.dispatch({
        type: 'user/queryUserInfo',
        payload: getlocalStorage('id')
      });
    } else {
      dellocalStorage();
    }
    this.props.dispatch({
      type: 'article/queryAllArticle',
      payload: 1
    });
    this.props.dispatch({
      type: 'kind/queryAllClass'
    });
  }
  loadingMoreArticle = () => {
    this.props.dispatch({
      type: 'article/appendArticle',
      payload: this.state.current_page+1,
    });
    this.setState({current_page: this.state.current_page+1});
  };

  render(){
    const { articleList, total } = this.props;
    return (
      <div>
        <ArticleList
          loadingMoreArticle={this.loadingMoreArticle}
          title="所有文章"
          list={articleList}
          total={total}/>
      </div>
    );
  }
}

export default connect(({article}) => ({
  articleList: article.articleList,
  total: article.total
}))(IndexPage);
