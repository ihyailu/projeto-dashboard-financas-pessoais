import React, { useMemo, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import ListOfmonths from '../../utils/months';

import { Container, Content, Filters } from './styles';
import { isTypeNode } from 'typescript';
import { fileURLToPath } from 'url';
import { uuid } from 'uuidv4';

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
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
    const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear));
    
    
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


    // const years = [
     //   {value: 2019, label: '2019'},
     //   {value: 2018, label: '2018'},
     //   {value: 2020, label: '2020'},
    //];

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        listData.forEach( item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if (!uniqueYears.includes(year)) {

                uniqueYears.push(year)
        
                uniqueYears.sort()

        
                setYearSelected(String(year))
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year,
            }
        })

    },[listData])


    const months = useMemo(() => {
        return ListOfmonths.map((months, index) => {
            return {
                value: index + 1,
                label: months,
            }
        })

    },[])


    useEffect (() => {
        const filteredData = listData.filter(item => {
            const date = new Date(item.date);
            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            return month === monthSelected && year === yearSelected;
        });

        const formattedData = filteredData.map(item => {
            return {
                id: uuid(),
                description: item.description,
                amountformatted: formatCurrency(Number( item.amount)),
                frequency: item.frequency,
                dataFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#E44C4E' : '#4E41F0',
            }
        })

        setData(formattedData);
    },[listData, monthSelected, yearSelected, data.length]);
    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
                <SelectInput options={months} onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected}/>

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
        {data.map((item, index) => (
            <HistoryFinanceCard
            key={index}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dataFormatted}
            amount={item.amountformatted}
            />
        ))}
</Content>
        </Container>
    );

}

export default List;


