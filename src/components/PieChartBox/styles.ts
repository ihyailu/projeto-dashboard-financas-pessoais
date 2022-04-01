import styled from "styled-components";

interface IlegendProps {
    color: string;
}
export const Container = styled.div`
    width: 48%;
    height: 260px;

    margin: 10px 0;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    border-radius: 7px;

    display: flex; 
`;

export const SideLeft = styled.div`
    padding: 30px 20px;

    >h2 {
        margin-bottom: 20px;
    }
`;

export const LegendContainer = styled.ul`
    list-style: none;

    height: 175px;
    padding: 16px;
    overflow-y: scroll; 

{
    scrollbar-width: auto;
    scrollbar-color: #8f54a0;
}

    ::-webkit-scrollbar {
    width: 10px;
}

    ::-webkit-scrollbar-track {
    background-color: ${props => props.theme.colors.tertiary};
}

    ::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.secondary};
    display: none;
    border-radius: 10px;
}

`;

export const Legend = styled.li<IlegendProps>`
    display: flex;
    alignt-items: center;

    margin-bottom: 7px;

    >div {
        background-color: ${props => props.color};

        width: 38px;
        height: 38px;
        border-radius: 5px;

        font-size: 18px;
        line-height: 38px;
        text-alignt: center;

    }

    > span {
        margin-left: 6px;
    }

`;

export const SideRight = styled.main`
    display: flex;
    flex: 1;
    justify-content: center;
`;