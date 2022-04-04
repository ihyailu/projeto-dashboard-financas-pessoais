import React, {useState, useMemo} from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import ListOfmonths from '../../utils/months';
import HistoryBox from '../../components/HistoryBox';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';




import {
    Container,
    Content,
} from './styles';

const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());


    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach( item => {
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

    },[])


    const months = useMemo(() => {
        return ListOfmonths.map((months, index) => {
            return {
                value: index + 1,
                label: months,
            }
        })

    },[])



    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected){
                try{
                    total += Number(item.amount)
                }catch{
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        })

        return total;
    },[monthSelected, yearSelected])


    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected){
                try{
                    total += Number(item.amount)
                }catch{
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        })

        return total;
    },[monthSelected, yearSelected])

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
    },[totalGains, totalExpenses]);

    const message = useMemo(() => {
        if(totalBalance <0){
            return {
                title: "Que triste!",
                description: "Neste mês, você gastou mais do que deveria.",
                footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
                icon: sadImg
            }
        }
        else if(totalBalance === 0){
            return {
                title: "Ufa!",
                description: "Neste mês você ficou no limite.",
                footerText: "Pleneje melhor no próximo mês.",
                icon: happyImg
            }
        }

        else{
            return {
                title: "Muito bem!",
                description: "Continue assim!",
                footerText: "Tente investir um pouco.",
                icon: happyImg
            }
        }

    },[totalBalance])

    const relationExpenseVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const percentGains = (totalGains / total) * 100;
        const percentExpenses = (totalExpenses / total) * 100;

        const data = [
            {
                name: "Entradas",
                value: totalExpenses,
                percent: Number(percentGains.toFixed(1)),
                color: '#F7931B'
                
            },
            {
                name: "Saídas",
                value: totalExpenses,
                percent: Number(percentExpenses.toFixed(1)),
                color: '#E44C4E'
            },
        ];

        return data;
    },[totalGains, totalExpenses]);

    const historyData = useMemo(() => {
        return ListOfmonths
        .map((_, month) => {

            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainsMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if(gainsMonth === month && gainYear === yearSelected){
                    try{
                        amountEntry += Number(gain.amount);
                    }catch{
                        throw new Error('amountEntry is invalid. amountEntry must be valid number.')
                    }
                }
            });

            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth= date.getMonth();
                const expenseYear = date. getFullYear();

                if(expenseMonth === month && expenseYear === yearSelected){
                    try{
                        amountOutput += Number(expense.amount);
                    }catch{
                        throw new Error('amountOutput is invalid. amountOutput must be valid number.')
                    }
                }
            });

            return {
                monthNumber: month,
                month: ListOfmonths[month].substr(0, 3),
                amountEntry,
                amountOutput
            }
        })
        .filter(item => {
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();
                return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
        })
    },[yearSelected])

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }
        catch{
            throw new Error('invalid month value. Is accept 0 - 24.')
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        }
        catch{
            throw new Error('invalid year value. Is accept integer number.')
        }
    }



    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={months}
                onChange={(e) => handleMonthSelected(e.target.value)}
                defaultValue={monthSelected}/>
                <SelectInput options={years}
                onChange={(e) => handleYearSelected(e.target.value)}
                defaultValue={yearSelected}/>
            </ContentHeader>

            <Content>
                <WalletBox
                title="saldo"
                color="#4E41F0"
                amount={totalBalance }
                footerlabel="atualizado com base nas entradas e saídas"
                icon="dolar"
            />

                <WalletBox
                title="entradas"
                color="#F7931B"
                amount={totalGains}
                footerlabel="atualizado com base nas entradas e saídas"
                icon="arrowUp"
            />

                <WalletBox
                title="saídas"
                color="#E44C4E"
                amount={totalExpenses}
                footerlabel="atualizado com base nas entradas e saídas"
                icon="arrowDown"
            />

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
            />

            <PieChartBox data={relationExpenseVersusGains} />

            <HistoryBox
                data={historyData}
                lineColorAmountEntry="#F7931B"
                lineColorAmountOutput="#E44C4E"
            />

            </Content>
        </Container>
        
    );
}

export default Dashboard;