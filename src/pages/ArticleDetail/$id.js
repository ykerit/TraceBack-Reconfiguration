import React, { Component } from 'react';
import { connect } from 'dva';
import { message, BackTop } from 'antd';
import Comments from '../../components/BasicComponents/comment/comment';
import ArticleInfo from '../../components/BasicComponents/ArticleInfo/index';
import { getlocalStorage } from '../../utils/helper';
import styles from './index.css';


class ArticleDetail extends Component{
  constructor(props){
    super(props);
    props.dispatch({
      type: 'article/queryArticleById',
      payload: props.match.params.id
    });
    this.state={
      value: '',
      page: props.match.params.id
    };
  }

  componentDidMount(){
    document.getElementById('content').style.minHeight= (window.screen.availHeight - 150) + 'px';
    this.props.dispatch({
      type: 'article/queryComment',
      payload: {article: this.state.page, page_size: 1 },
    })
  }
  // 获取全部字数 限制换行

  handlerSubmit = () => {
    const id = this.props.id === '' ? getlocalStorage('id') : this.props.id;
    if (this.state.value !== '') {
      if (this.state.value.length <= 150) {
        this.props.dispatch({
          type: 'article/createComment',
          payload: {id: id, content: this.state.value, article_id: this.state.page},
        });
        this.setState({value: ''});
      }  else {
        message.warning('输入字数大于150');
      }
    } else {
      message.warning('输入框不能为空');
    }
  };
  handlerChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render(){
    const { articleContent, comment, dispatch, comment_total } = this.props;
    const data = {...articleContent[0]};

    return (
      <div>
        <div id="content" className={styles.content}>
          <div className={styles.middle}>
            <div className={styles.title}>
              <h1>{data.title}</h1>
            </div>
            <div>
              <ArticleInfo face={data.face} time={data.create_time} star="0" name={data.name}/>
            </div>
            <div dangerouslySetInnerHTML={{__html: data.preview}} className={styles.htmlCon}>
            </div>
          </div>
        </div>
        <div className={styles.comment}>
          <Comments
            data={comment}
            dispatch={dispatch}
            onSubmit={this.handlerSubmit}
            value={this.state.value}
            page={this.state.page}
            comment_total={comment_total}
            onChange={this.handlerChange}/>
        </div>
        <div>
          <BackTop />
        </div>
      </div>
    );
  }
}


export default connect(({ article, user }) => ({
  id: user.currentUser.id,
  articleContent: article.articleContent,
  comment: article.comment,
  comment_total: article.comment_total
}))(ArticleDetail)
