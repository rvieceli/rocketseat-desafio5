import styled, { keyframes } from "styled-components";

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #${props => (props.error ? "f00" : "eee")};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    color: #${props => (props.error ? "f00" : "000")};
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: "submit",
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: #fff;
    size: 14px;
  }

  :hover {
    background: #fff;
    border: 1px solid #7159c1;

    svg {
      color: #7159c1;
    }
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;

    svg {
      animation: ${rotate} 2s linear infinite;
    }
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    div.repo {
      display: flex;
      flex-direction: row;
      align-items: center;

      img {
        width: 20px;
        height: 20px;
        border-radius: 3px;
        margin-right: 10px;
      }
    }

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
