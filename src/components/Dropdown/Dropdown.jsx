import React from 'react'
import styled from 'styled-components';
import { InputGroup, Dropdown, DropdownButton, Form  } from 'react-bootstrap';

/**
 * Dropdown component which returns the list of options and returns the selected value in the selectedOptions function 
 */
const CustomDropdown = ({ label, value, options, selectedOptions }) => (
  <Form.Group>
      <StyledLabel>{label}</StyledLabel>
      <StyledDropdownButton as={InputGroup.Append} title={value}>
        {options.map((option) => (
          <DropdownOptions key={option.label} onClick={() => selectedOptions(option)}>
            {option.label}
          </DropdownOptions>
        ))}
      </StyledDropdownButton>
  </Form.Group>
)

export default CustomDropdown

const StyledDropdownButton = styled(DropdownButton)`
  > button {
    background-color: white !important;
    border: none;
    width: 100%;
    border: none;
    border-bottom: 1px solid #CFD8DC !important;
    color: black !important;
    text-align: start;
    border-radius: 0px;
    font-size: 14px;
    height: 52px;

    :hover {
      color: black !important;
      background-color: white;
      border: none;
      border-bottom: 1px solid #CFD8DC;
    }

    ::after {
      position: absolute;
      right: 15px;
      bottom: 25px;
    }
  }

  > button + div {
    font-size: 14px;
    width: 100%;
    text-overflow: ellipsis;
  }

`

const DropdownOptions = styled(Dropdown.Item)`
  width: 95%;
`

const StyledLabel = styled(Form.Label)`
  font-weight: 500;
  text-align: left;
  width: 100%;
  float: left;
  margin-top: 15px;
  font-size: 14px;
  margin-bottom: 0px;
`