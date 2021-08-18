import styled from 'styled-components';

export const Container = styled.div`
  //height: 100vh;

  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  background-color: ${props => props.theme.colors.primary};
`;

export const Content = styled.main`
  display: flex;
  flex: 2;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  height: calc(100vh - 200px);

  width: 100%;
  background-color: ${props => props.theme.colors.primary};
`;

export const ContentForm = styled.main`
  display: flex;
  flex-grow: 1;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px);

  background-color: ${props => props.theme.colors.primary};
`;

export const ContentList = styled.main`
  display: flex;
  //flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  margin-left: 20px;
  padding-inline: 20px;
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

export const List = styled.main`
  width: 100%;
  height: calc(100vh - 200px);
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

export const Form = styled.form`
  width: 100%;
  height: 100%;
  margin-right: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 10px;

  background-color: ${props => props.theme.colors.tertiary};
`;

export const FormTitle = styled.h1`
  font-size: 24px;
  color: ${props => props.theme.colors.white};

  &:after {
    content: '';
    display: block;
    width: 55px;
    border-bottom: 10px solid ${props => props.theme.colors.warning};
  }
`;

export const Flex = styled.div`
  display: flex;
  gap: 15px;
`;

export const ContainerInput = styled.div`
  position: relative;
  box-sizing: content-box;
  flex-grow: 1;
`;

export const Span = styled.span`
  position: absolute;
  top: 10px;
  left: 25px;
  font-size: 16px;
  letter-spacing: 0.05em;
  pointer-events: none;
  font-weight: 600;
  font-family: sans-serif;
  transition: 0.4s;
  color: ${props => props.theme.colors.white};
`;

export const InputForm = styled.input`
  width: 100%;
  padding: 10px 5px;
  font-size: 15px;
  outline: none;

  border: 1px solid ${props => props.theme.colors.white};
  border-radius: 5px;

  background-color: ${props => props.theme.colors.tertiary} !important;
  color: ${props => props.theme.colors.white};

  &:focus {
    border: none;

    box-shadow: 0 0 0 1px ${props => props.theme.colors.white};
  }

  &:focus + ${Span}, &:valid + ${Span} {
    top: -12px;
    left: 10px;
    font-size: 15px;
    padding: 0 10px;

    background: ${props => props.theme.colors.tertiary};
  }
`;
