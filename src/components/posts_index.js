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


  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
        List of blog posts
      </div>
    );
  }
}

/*function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch);
}

export default connect(null, mapDispatchToProps)(PostsIndex);
*/

//1. UPDATED THE ABOVE BOILER PLATE (mapDispatchToProps) WITH THIS REFACTOR BELOW

//export default connect (null, { fetchPosts: fetchPosts })(PostsIndex);

//2. since have same key: value above, can refactor even further

export default connect (null, { fetchPosts })(PostsIndex);
