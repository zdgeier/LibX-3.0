import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { handleFetchEdition } from '../actions';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class AutosuggestSearch extends React.Component {
  state = {
    single: '',
    suggestions: [],
  };
  
  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);
  
    return (
      <MenuItem 
          selected={isHighlighted} 
          component="div"
          onClick={(event) => {
              console.dir(event.target.textContent)
              fetch(`http://libx.org/editions/config/${event.target.textContent}`)
              .then((response) => {
                  return response.json();
              })
              .then((json) => {
                  console.log(json.revisions.live.config)
                  this.props.fetchEdition(json.revisions.live.config)
              })
          }}
          >
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </MenuItem>
    );
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    fetch(`http://libx.org/editions/search?q=${value}`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.dir(json)
        this.setState({
            suggestions: json.map(entry => ({label: entry.id}))
        });
    })
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Search for a LibX edition',
            value: this.state.single,
            onChange: this.handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    )
  }
}

AutosuggestSearch.propTypes = {
    classes: PropTypes.object.isRequired,
    fetchEdition: PropTypes.func
  };

const mapDispatchToProps = dispatch => ({
    fetchEdition: (edition) => {
        console.dir(edition)
        dispatch(handleFetchEdition(edition));
    }
})
  
export default connect(
null,
mapDispatchToProps
)(withStyles(styles)(AutosuggestSearch));