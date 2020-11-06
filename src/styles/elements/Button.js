import styled from "styled-components"

export const Primary = styled.div`
  display: inline-block;
  padding: 0.2rem 1rem;
  color: white;
  border-radius: 5px;
  background-color: #186bc4;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #11549c;
  }
`

export const Error = styled.div`
  display: inline-block;
  padding: 0.2rem 1rem;
  color: white;
  border-radius: 5px;
  background-color: #d63e4d;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #a62834;
  }
`