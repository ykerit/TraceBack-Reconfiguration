import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux} from 'dva/router';
import BasicTable from "../../../components/BasicTable/index";
import ArticleList from "../../../components/ArticleList/index";

class ArticeManage extends Component{
  state = {
    current_page: 1,
  };
  componentDidMount(){
    const { role, id } = this.props;

    if (role === 1) {
      this.props.dispatch({
        type: 'article/queryAllArticle',
        payload: 1
      })
    } else {
      console.log(id);
      this.props.dispatch({
        type: 'article/queryCurrentUserArticle',
        payload: {id: id, page_size: 1}
      });
    }

  };

  loadingMoreArticle = () => {
    const { role, id } = this.props;

    if (role === 1) {
      this.props.dispatch({
        type: 'article/appendArticle',
        payload: this.state.current_page+1,
      });
    } else {
      this.props.dispatch({
        type: 'article/appendCurrentUserArticle',
        payload: {id: id, page_size: this.state.current_page+1},
      });
    }

    this.setState({current_page: this.state.current_page+1});
  };

  render(){
    const { articleList, total, role, currentUserList, currentUserList_total } = this.props;
    let list = role === 1 ? articleList : currentUserList;
    let all = role === 1 ? total : currentUserList_total;
    return (
      <BasicTable
        text="新建文章"
        showModal={() => this.props.dispatch(routerRedux.push('/Admin/MDEditor'))}
        isButton={true}>
        <ArticleList
          title={role === 1 ? "所有文章" : ""}
          list={list}
          total={all}
          loadingMoreArticle={this.loadingMoreArticle}
        />
      </BasicTable>
    );
  }
}

export default connect(({ article, user }) => ({
  articleList: article.articleList,
  total: article.total,
  role: user.currentUser.role,
  id: user.currentUser.id,
  currentUserList: article.currentUserList,
  currentUserList_total: article.currentUserList_total
}))(ArticeManage);
