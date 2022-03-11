import React, { useMemo, useState, useEffect } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import { Container, Content, Filters } from './styles';
import { isTypeNode } from 'typescript';

interface IRouteParams {
    match: {
        params: {
            type: string;
            
        }
    }
}

interface IData {
    id: string;
    description: string;
    amountformatted: string;
    frequency: string;
    dataFormatted: string;
    tagColor: string;

}

const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([])    
    const { type } = match.params;

    const title = useMemo(() => {
        return type === 'entry-balance' ? 'Entradas' : 'Saídas'
    
    },[type]);

    const lineColor = useMemo(() => {
        return type === 'entry-balance' ? '#F7931B' : '#E44C4E'
    
    },[type]);

    const listData = useMemo(() => {
        return type === 'entry-balance' ? gains : expenses;
    },[]);

    const months = [
        {value: 9, label: 'Setembro'},
        {value: 7, label: 'Julho'},
        {value: 8, label: 'Agosto'},
    ];

    const years = [
        {value: 2021, label: '2021'},
        {value: 2019, label: '2019'},
        {value: 2020, label: '2020'},
    ];


    useEffect (() => {
        const response = listData.map(item => {
            return {
                id: String(Math.random () * data.length),
                description: item.description,
                amountformatted: item.amount,
                frequency: item.frequency,
                dataFormatted: item.date,
                tagColor: item.frequency === 'recorrente' ? '#E44C4E' : '#4E41F0' 
            }
        })

        setData(response);
    },[]);
    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
                <SelectInput options={months} />
                <SelectInput options={years} />
            </ContentHeader>

            <Filters>
                <button 
                    type="button"
                    className="tag-filter tag-filter-recurrent"
                >
                    Recorrentes
                </button>

                <button 
                    type="button"
                    className="tag-filter tag-filter-eventual"
                >
                    Eventuais
                </button>
            </Filters>


            <Content>
                {
                    data.map(item =>(
                    <HistoryFinanceCard
                        key={item.id}
                        tagColor={item.tagColor}
                        title={item.description}
                        subtitle={item.dataFormatted}
                        amount={item.amountformatted}
                        
                    />
                    
                    ))
                }
            </Content>
        </Container>
    );

}

export default List;


