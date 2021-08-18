import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 200px);

  width: 100%;
  background-color: ${props => props.theme.colors.primary};
`;

export const Content = styled.main`
  height: calc(100vh - 200px);

  background-color: ${props => props.theme.colors.primary};
`;

export const ContentList = styled.main`
  //display: flex;
  //flex-grow: 1;
  //flex-direction: column;
  //justify-content: center;
  //align-items: center;
  overflow: scroll;
  height: 100%;
  //margin-left: 20px;
  //padding-inline: 20px;
  //box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-clip: padding-box;
    background: #a7a9b3;
  }

  &::-webkit-scrollbar-track {
    margin: 15px;
  }

  background-color: ${props => props.theme.colors.primary};
`;

export const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

export const Td = styled.td`
  color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.primary};
  text-align: left;
  padding: 8px;
`;

export const Th = styled.th`
  color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.primary};
  text-align: left;
  padding: 8px;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: ${props => props.theme.colors.tertiary};
  }
`;

export const Filters = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  margin-bottom: 30px;

  .tag-filter {
    font-size: 18px;
    font-weight: 500;

    background: none;
    color: ${props => props.theme.colors.white};

    margin: 0 10px;

    opacity: 0.4;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  .tag-filter-recurrent::after {
    content: '';
    display: block;
    width: 55px;
    margin: 0 auto;
    border-bottom: 10px solid ${props => props.theme.colors.success};
  }

  .tag-filter-eventual::after {
    content: '';
    display: block;
    width: 55px;
    margin: 0 auto;
    border-bottom: 10px solid ${props => props.theme.colors.warning};
  }

  .tag-actived {
    opacity: 1;
  }
`;
