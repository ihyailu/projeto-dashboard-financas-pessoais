import React from "react";

import logo from '../../assets/logo.svg';

import Input from "../../components/Input";

import {
    Container,
    Logo,
    Form,
    FormTitle
} from './styles';

const SignIn: React.FC = () => {
    return (
        <Container>
            <Logo>
                <img src={logo} alt="Minha Carteira" />
                <h2>Minha Carteira</h2>
            </Logo>

            <Form onSubmit={() =>{}}>
                <FormTitle>Entrar</FormTitle>

                <Input 
                    type="email"
                    required
                    placeholder="e-mail"
                />
                <Input
                    type="password" 
                    required
                    placeholder="senha"
                />
                <button type="submit">Acessar</button>
            </Form>
        </Container>  

    );
}

export default SignIn;