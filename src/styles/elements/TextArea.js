import TextareaAutosize from 'react-autosize-textarea';

import styled from "styled-components"

export const TextArea = styled(TextareaAutosize)`
  border: 1px solid #BBB;
  border-radius: 5px;
  padding: 0.2rem;
  width: 100%;
  &:focus {
    // outline: none;
  }
`