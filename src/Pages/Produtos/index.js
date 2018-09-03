import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CustomPaper from '../../Pages/Template/CustomPaper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TableProdutos from './table';
import { getSuggestions } from '../../utils/suggestions';

class Produtos extends Component {    
    
    constructor(props) {
        super(props)
        this.state = {
            produtos: [
                { id: 1, descricao: 'Carne de frango', grupo: 'Carnes', subgrupo: 'Carnes brancas', un: 'Kg' },
                { id: 2, descricao: 'Carne de gado', grupo: 'Carnes', subgrupo: 'Carnes vermelhas', un: 'Kg' },
                { id: 3, descricao: 'Sardinha', grupo: 'Carnes', subgrupo: 'Peixes', un: 'Kg' },
                { id: 4, descricao: 'Carne de porco', grupo: 'Carnes', subgrupo: 'Carnes vermelhas', un: 'Kg' },
                { id: 5, descricao: 'Massa', grupo: 'Empacotados', subgrupo: 'Massas/Macarões', un: 'Kg' },
                { id: 6, descricao: 'Azeite de oliva', grupo: 'Empacotados', subgrupo: ' Óleos e Azeites', un: 'Un' },
                { id: 7, descricao: 'Alecrim', grupo: 'Empacotados', subgrupo: 'Temperos', un: 'Kg' },
                { id: 8, descricao: 'Queijo de colonia', grupo: 'Laticínios', subgrupo: 'Queijos', un: 'Kg' },
                { id: 9, descricao: 'Danoninho', grupo: 'Laticínios', subgrupo: 'Iogurtes', un: 'Un' },
                { id: 10, descricao: 'Pão colonial', grupo: 'Padaria', subgrupo: 'Pães', un: 'Kg' },
                { id: 11, descricao: 'Risólis', grupo: 'Padaria', subgrupo: 'Salgados', un: 'Kg' },
                { id: 12, descricao: 'Banana', grupo: 'Ceasa/Hortifruti', subgrupo: 'Frutas', un: 'Kg' },
                { id: 13, descricao: 'Salada', grupo: 'Ceasa/Hortifruti', subgrupo: 'Hortaliças', un: 'Kg' },
                { id: 14, descricao: 'Folha A4', grupo: 'Uso Interno', subgrupo: 'Material de escritório', un: 'Un' },
                { id: 15, descricao: 'Banda larga', grupo: 'Uso Interno', subgrupo: 'Internet e telefone', un: 'Un' }            
            ]
        }
        this.produtos = [];
    }

    componentDidMount() {
        this.produtos = this.state.produtos;
    }

    handleChange(e) {
        const produtos = getSuggestions(this.produtos, e.target.value, 3);
        this.setState({ produtos })
    }

    render() {
        const { classes } = this.props;
        return (
            <CustomPaper title="Produtos">
                <div className={classes.header}>
                    <TextField onChange={this.handleChange.bind(this)}
                        className={classes.input} 
                        id="descricao" 
                        label="Pesquisa..." 
                        type="text" />                                
                    <Button 
                        onClick={() => this.props.history.push("/produto")}                         
                        variant="outlined"
                        color="primary"
                    >
                        Adicionar
                    </Button>
                </div>
                <div style={{ marginTop: 25 }}>
                    <TableProdutos produtos={this.state.produtos}/>    
                </div>
            </CustomPaper>    
        )
    }
}

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    input: {
        marginRight: 10
    },
    '@media (max-width: 420px)': {
        header: {
            flexDirection: 'column',
            '& button': {
                marginTop: 20
            },
        },
        input: {
            marginRight: '0 !important',
        }
    },
}

export default withRouter(withStyles(styles)(Produtos));