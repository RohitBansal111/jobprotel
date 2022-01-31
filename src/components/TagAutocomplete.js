

import React from 'react'
import ReactDOM from 'react-dom'
import ReactTags from 'react-tag-autocomplete'

class TagAutocomplete extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      suggestions: [
        { id: 1, name: "nextjs" },
        { id: 2, name: "reactjs" },
        { id: 3, name: "python" },
        { id: 4, name: "nodejs"}
      ]
    }

    this.reactTags = React.createRef()
  }

  onDelete (i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
  }

  classes = {
    root: 'form-control p-0',
  }

  onAddition (tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags })
  }

  render () {
    return (
      <>
      <label htmlFor="dfas">Course Tag</label>
      <ReactTags
        ref={this.reactTags}
        tags={this.state.tags}
        classNames={this.classes}
        placeholderText={'Enter Course Tags'}
        suggestions={this.state.suggestions}
        onDelete={this.onDelete.bind(this)}
        onAddition={this.onAddition.bind(this)} />
        </>
    )
  }
}

export default TagAutocomplete;