import React from "react";
import { useState, useEffect } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { PropTypes } from "prop-types";

export const RenderTagField = ({
  input: { name, value, onChange },
  label,
  suggestions,
  type,
  dvalue,
  meta: { touched, error, warning },
}) => {
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const [tags, setTags] = useState(dvalue ? dvalue : []);

  useEffect(() => {
    setTags(dvalue || []);
  }, [dvalue]);
  const handleDelete = (i) => {
    let newTags = tags.filter((tag, index) => index !== i);
    onChange(newTags);
    setTags(newTags);
  };

  const handleAddition = (tag) => {
    let newTags = [...tags, tag];
    onChange(newTags);
    setTags(newTags);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    onChange(newTags);
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };
  return (
    <div className="field-render-main">
      <label> {label} </label>
      <div className="ReactTags" style={{ marginBottom: 20 }}>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="inline"
          autocomplete
          minQueryLength={1}
          renderSuggestion={({ text }, query) => (
            <div>
              {text} ({query})
            </div>
          )}
        />
        {touched && error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

RenderTagField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  suggestions: PropTypes.array,
  type: PropTypes.string,
  meta: PropTypes.object,
  touched: PropTypes.bool,
  error: PropTypes.string,
  warning: PropTypes.string,
};

export const RenderTagFieldOnlySuggestions = ({
  input: { name, value, onChange },
  label,
  suggestions,
  type,
  meta: { touched, error, warning },
}) => {
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  // const newsuggestions = [{ id: "India", text: "india" }, { id: 'australia', text: 'australia' }];
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const [tags, setTags] = useState(value ? value : []);
  useEffect(() => {
    setTags(value || []);
  }, [value]);
  const handleDelete = (i) => {
    let newTags = tags.filter((tag, index) => index !== i);
    onChange(newTags);
    setTags(newTags);
  };

  const handleAddition = (tag) => {
   
    const isFound = suggestions.some((element) => {
      if (element.id === tag.id) {
        let newTags = [...tags, tag];
        onChange(newTags);
        setTags(newTags);
      }
    });
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    onChange(newTags);
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <div className="field-render-main">
      <label> {label} </label>
      <div className="ReactTags" style={{ marginBottom: 20 }}>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="inline"
          autocomplete
          renderSuggestion={({ text }, query) => (
            <div>
              {text} ({query})
            </div>
          )}
        />
        {touched && error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

RenderTagField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  suggestions: PropTypes.array,
  type: PropTypes.string,
  meta: PropTypes.object,
  touched: PropTypes.bool,
  error: PropTypes.string,
  warning: PropTypes.string,
};
