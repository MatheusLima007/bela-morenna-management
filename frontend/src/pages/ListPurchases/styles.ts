import styled, { keyframes } from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main``;

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
        
        opacity: .4;
        transition: opacity .3s;

        &:hover {
            opacity: .7;
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

export const Flex = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`

export const Text = styled.div`
    margin: 12px;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    color: ${props => props.theme.colors.warning};
`

export const TextProduct = styled.div`
   // margin: 12px;
    font-size: 16px;
    font-weight: bold;
    color: ${props => props.theme.colors.white};
`

export const H3 = styled.h3`
   margin: 12px;
   color: ${props => props.theme.colors.info}; 
`

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

export const ContainerProduct = styled.li`
  background-color: ${props => props.theme.colors.tertiary};
  width: 500px;
  list-style: none;
  border-radius: 10px;
  flex: 2 0 40%; /* explanation below */
  //margin: 5px;
  flex-direction: column;

  margin-block: 10px;
  margin-left: 10px;
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


