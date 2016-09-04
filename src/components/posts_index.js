import React, { Component} from 'react';
import { connect } from 'react-redux';
//with the refactor below we can get rid of {bindActionCreators} here
//import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={"posts/" + post.id}> 
          <span className="pull-xs-right">{post.categories}</span>
          <strong>{post.title}</strong>
          </Link>
      </li>
      );
    });
  }


  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.posts)
  return { posts: state.posts.all };
}

/*function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch);
}

export default connect(null, mapDispatchToProps)(PostsIndex);
*/

//1. UPDATED THE ABOVE BOILER PLATE (mapDispatchToProps) WITH THIS REFACTOR BELOW

//export default connect (null, { fetchPosts: fetchPosts })(PostsIndex);

//2. since have same key: value above, can refactor even further

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
