import React from 'react';
// import {
//    PieChart,
//    Pie,
//    Cell,
//    ResponsiveContainer,
//    Legend
// } from 'recharts';


import { 
    Container,
    SideLeft,
    LegendContainer,
    Legend,
    SideRight,
} from './styles';

const PieChart: React.FC = () => (
    <Container>
        <SideLeft>
            <h2>Relação</h2>
            <LegendContainer>
                <Legend color="#F7931B">
                <div>5%</div>
                <span>Entradass</span>
                </Legend>
                <Legend color="#E44C4B">
                <div>95%</div>
                <span>Saídas</span>
                </Legend>
                <Legend color="#F7931B">
                <div>5%</div>
                <span>Entradass</span>
                </Legend>
                <Legend color="#E44C4B">
                <div>95%</div>
                <span>Saídas</span>
                </Legend>
                <Legend color="#F7931B">
                <div>5%</div>
                <span>Entradass</span>
                </Legend>
                <Legend color="#E44C4B">
                <div>95%</div>
                <span>Saídas</span>
                </Legend>
                <Legend color="#F7931B">
                <div>5%</div>
                <span>Entradass</span>
                </Legend>
                <Legend color="#E44C4B">
                <div>95%</div>
                <span>Saídas</span>
                </Legend>
                <Legend color="#F7931B">
                <div>5%</div>
                <span>Entradass</span>
                </Legend>
                <Legend color="#E44C4B">
                <div>95%</div>
                <span>Saídas</span>
                </Legend>
                <Legend color="#F7931B">
                <div>5%</div>
                <span>Entradass</span>
                </Legend>
                <Legend color="#E44C4B">
                <div>95%</div>
                <span>Saídas</span>
                </Legend>
            </LegendContainer>
        </SideLeft>

        <SideRight>
    
        </SideRight>

    </Container>
);

export default PieChart;