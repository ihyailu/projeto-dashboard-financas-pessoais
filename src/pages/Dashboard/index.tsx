import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';


import { Container } from './styles';

const Dashboard: React.FC = () => {

    const option = [
        {value: 'Gustavo', label: 'Gustavo'},
        {value: 'Barbosa', label: 'Barbosa'},
        {value: 'Assis', label: 'Assis'}
    ]

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={option} />
            </ContentHeader>
        </Container>
    );
}

export default Dashboard;


