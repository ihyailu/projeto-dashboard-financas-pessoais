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
    dateFormatted: string;
    tagColor: string;

}

const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequencyFilterSelected, setfrequencyFilterSelected] = useState(['recorrente', 'eventual']);
    
    
    const  movimentType  = match.params.type;

    const pageData = useMemo(() => {
        return movimentType === 'entry-balance' ? 

        {
            title: 'Entradas',
            lineColor: '#F7931B',
            data: gains
        }
        :
        {
            title: 'Saídas',
            lineColor: '#E44C4E',
            data: expenses
        }
    },[movimentType]);


    // const years = [
     //   {value: 2019, label: '2019'},
     //   {value: 2018, label: '2018'},
     //   {value: 2020, label: '2020'},
    //];

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        pageData.data.forEach( item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if (!uniqueYears.includes(year)) {

                uniqueYears.push(year)
        
                uniqueYears.sort()

        
                setYearSelected(year)
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year,
            }
        })

    },[pageData.data])


    const months = useMemo(() => {
        return ListOfmonths.map((months, index) => {
            return {
                value: index + 1,
                label: months,
            }
        })

    },[])


    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

        if(alreadySelected >= 0) {
            const filtered = frequencyFilterSelected.filter(item => item != frequency);
            setfrequencyFilterSelected(filtered);
        }else {
            setfrequencyFilterSelected((prev) => [...prev, frequency ]);
        }
    }

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }
        catch(error){
            throw new Error('invalid month value. Is accept 0 - 24.')
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        }
        catch(error){
            throw new Error('invalid year value. Is accept integer number.')
        }
    }


    useEffect (() => {
        const filteredData = pageData.data.filter(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
        });

        const formattedData = filteredData.map(item => {
            return {
                id: uuid(),
                description: item.description,
                amountformatted: formatCurrency(Number( item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E', 
            }
        })

        setData(formattedData);
    },[pageData.data, monthSelected, yearSelected, data.length, frequencyFilterSelected ]);
    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>

            </ContentHeader>

            <Filters> 
                <button 
                    type="button"
                    className={`tag-filter tag-filter-recurrent
                    ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>

                <button 
                    type="button"
                    className={`tag-filter tag-filter-eventual
                    ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('eventual')}
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
            subtitle={item.dateFormatted}
            amount={item.amountformatted}
            />
        ))}
</Content>
        </Container>
    );

}

export default List;


