import Switch, { ReactSwitchProps } from 'react-switch';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
`;

export const ToggleLabel = styled.span`
    color: ${props => props.theme.colors.white};
`;
//@ts-ignore
export const ToggleSelector = styled(Switch).attrs<ReactSwitchProps>(
    ({ theme }) => ({
        onColor: theme.colors.info,
        offColor: theme.colors.warning
    }))<ReactSwitchProps>`
    margin: 0 7px;
`;
