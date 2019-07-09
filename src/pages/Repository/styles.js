import styled from 'styled-components';

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    text-decoration: none;
    font-size: 16px;
    margin-bottom: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-right: 10px;
    }
  }

  img {
    width: 120px;
    border-radius: 3px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 10px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 3px;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;
          margin-right: 10px;

          &:hover {
            color: #7159c1;
          }
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

const getConstrat = hexcolor => {
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
};

export const IssueLabel = styled.span`
  background: #${props => props.labelColor};
  color: ${props => getConstrat(props.labelColor)};
  border-radius: 2px;
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  padding: 3px 4px;
  margin-right: 10px;
  display: inline-block;
`;

export const Filter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

export const FilterButton = styled.button.attrs({
  type: 'button',
})`
  width: 60px;
  height: 20px;
  margin-left: 10px;
  background: ${props => (props.selected ? '#7159c1' : '#fff')};
  border: 1px solid #7159c1;
  color: ${props => (props.selected ? '#fff' : '#7159c1')};
  border-radius: 5px;
`;

export const Paginator = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: #7159c1;
    color: #fff;
    border-radius: 50%;
    margin: 0 10px;
  }

  button {
    width: 60px;
    height: 20px;
    background: #fff;
    border: 1px solid #7159c1;
    color: #7159c1;
    border-radius: 5px;

    :hover {
      color: #fff;
      background: #7159c1;
      border: 1px solid #7159c1;
    }
  }
`;
