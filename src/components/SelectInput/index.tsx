import React from 'react';

import { Container } from './styles';

interface ISlectInputProps {
    options: {
        value: string | number;
        label: string | number;
    }[],
    onChange(event: React.ChangeEvent<HTMLSelectElement>) : void | undefined;
    defaultValue?: string | number;
    
}

const SelectInput: React.FC <ISlectInputProps> = ({ options, onChange, defaultValue }) => {
    return (
        <Container>
            <select onChange={onChange} defaultValue={defaultValue}>
                {
                    options.map(options =>(
                    <option 
                    key={options.value}
                    value={options.value}
                    >
                        {options.label}
                    </option>
                    ))
                }
            </select>
        </Container>
    );
}

export default SelectInput;