import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
//redux form injects props/action-creators that can be used in component just like redux-connect
import { createPost } from '../actions/index';
//createPost is an action-creator made in index
import { Link } from 'react-router';

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {

    this.props.createPost(props)
    .then(() => {
      this.context.router.push('/');
    });
  }


  render () {
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    //same as const handleSubmit = this.props.handleSubmit;


    /*below, {...title} destructres object, says 'make sure all of properties of title object shows up in input'*/

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Posts</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories}/>
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content}/>
            <div className="text-help">
              {content.touched ? content.error : ''}
            </div>
          </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
    </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username';
  }
  if (!values.categories) {
    errors.categories = 'Enter category';
  }
  if (!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}




//redux-connect:  first argument is mapStateToProps, 2nd is mapDispatchToProps
//reduxForm: first argument is form config., 2nd is mapStateToProps (here it's null), 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
},null, { createPost })(PostsNew);
