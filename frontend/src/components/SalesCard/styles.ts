import styled, { keyframes } from 'styled-components';

interface ITagProps {
  color: string;
}

const animate = keyframes`
    0% {
        transform: translateX(-100px);
        opacity: 0;
    }
    50%{
        opacity: .3;
    }
    100%{
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const Container = styled.li`
  background-color: ${props => props.theme.colors.tertiary};
  width: 100%;
  list-style: none;
  border-radius: 10px;

  font-size: 20px;

  margin: 10px 0;
  padding: 12px 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  transition: all 0.3s;

  position: relative;

  animation: ${animate} 0.5s ease;

  &:hover {
    opacity: 0.7;
    transform: translateX(10px);
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding-left: 10px;
  }

  > div span {
    font-size: 22px;
    font-weight: 500;
  }
`;

export const Tag = styled.div<ITagProps>`
  width: 13px;
  height: 60%;

  background-color: ${props => props.color};

  position: absolute;
  left: 0;
`;

export const H3 = styled.h3`
  margin-right: 250px;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: row !important;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column !important;
`;