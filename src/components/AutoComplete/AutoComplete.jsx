import React, { useCallback } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { debounce } from '../../utils/debounce';

/**
 * Typeahead component which returns the list of options and returns the selected value in the onSelect function 
 */
function Typeahead({ placeholder, value, options, onSelect, onRequestOptions, onChange }) {

  const debouncedSave = useCallback(
    debounce((newValue) => onRequestOptions(newValue)),
		[debounce]
	);

  const updateSearchField = (newValue) => {
    onChange(newValue);
		debouncedSave(newValue);
  }

  return (
    <TypeaheadContainer>
      <StyledLabel>{placeholder}</StyledLabel>
      <InputGroup>
        <FormControl
          type="text"
          value={value}
          onChange={(event) => updateSearchField(event.target.value)}
        />
          <StyledIcon variant="outline-secondary" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </StyledIcon>
        <ResultsContainer>
          {options.map((option, index) => (
            <Results key={option.label + index} onClick={() => onSelect(option)}>
              {option.label}
            </Results>
          ))}
        </ResultsContainer>
      </InputGroup>
    </TypeaheadContainer>
  );
}

export default Typeahead;

const StyledLabel = styled.label`
  float: left;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
`;

const StyledIcon = styled(Button)`
  color: var(--bs-btn-hover-color);
  background-color: var(--bs-btn-hover-bg);
  border: 1px solid #ced4da;
`;

const TypeaheadContainer = styled.div`
  position: relative;
`;

const ResultsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: #fff;
  border-top: none;
  z-index: 1;
  text-align: start;
  font-size: 14px;
`;

const Results = styled.div`
  padding: 4px;
  cursor: pointer;

  :hover {
    background-color: #f0f0f0;
  }
`;