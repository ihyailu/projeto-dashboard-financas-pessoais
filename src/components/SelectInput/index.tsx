import React from 'react';

import { Container } from './styles';

interface ISlectInputProps {
    options: {
        value: string | number;
        label: string | number;
    }[],
    
}

const SelectInput: React.FC <ISlectInputProps> = ({ options }) => {
    return (
        <Container>
            <select>
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