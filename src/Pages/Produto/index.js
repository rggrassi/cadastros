import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Ballot from '@material-ui/icons/Ballot';
import Group from '@material-ui/icons/Group';
import SwipeableViews from 'react-swipeable-views';
import TextField from '@material-ui/core/TextField';
import CustomPaper from '../../Pages/Template/CustomPaper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FornecedorProd from './fornecedor_prod';
import { connect } from "react-redux";
import { addFornecProd } from '../../actions'; 

class Produto extends Component {

    state = { value: 0 };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };  
    
    handleSubmit = async e => {
        e.preventDefault();
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <CustomPaper title="Cadastro de Produto">
                <BottomNavigation className={classes.header}
                    value={value} 
                    onChange={this.handleChange} 
                    showLabels>
                    <BottomNavigationAction label="Geral" icon={<Ballot />}/>
                    <BottomNavigationAction label="Fornecedores" icon={<Group />} />
                </BottomNavigation>  

                <SwipeableViews
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}>

                    <form onSubmit={this.handleSubmit}>
                        <div className={classes.flexContainer}>
                            <FormControl className={classes.flexItem}  style={{ marginRight: 10 }}>
                                <TextField id="descricao" label="Descrição" type="text" />                                
                            </FormControl>    
                            <FormControl className={classes.flexItem} style={{ flex: 0, minWidth: 80 }}>
                                <InputLabel htmlFor="un-label">Unidade</InputLabel>
                                <Select value="" inputProps={{ name: 'un', id: 'un-label' }}>]
                                    <MenuItem value=""><em>Nenhum</em></MenuItem>                            
                                    <MenuItem value="Kg">Kg</MenuItem>
                                    <MenuItem value="Un">Un</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.flexContainer}>
                            <FormControl className={classes.flexItem}  style={{ marginRight: 10 }}>
                                <InputLabel htmlFor="grupo-label">Grupo</InputLabel>
                                <Select value="" inputProps={{ name: 'grupo', id: 'grupo-label' }}>
                                    <MenuItem value=""><em>Nenhum</em></MenuItem>                            
                                    <MenuItem value="Carnes">Carnes</MenuItem>
                                    <MenuItem value="Empacotados">Empacotados</MenuItem>
                                    <MenuItem value="Frios">Frios</MenuItem>
                                </Select>
                            </FormControl>    
                            <FormControl className={classes.flexItem}>
                                <InputLabel htmlFor="subgrupo-label">Subgrupo</InputLabel>
                                <Select value="" inputProps={{ name: 'subgrupo', id: 'subgrupo-label' }}>
                                    <MenuItem value=""><em>Nenhum</em></MenuItem>                            
                                    <MenuItem value="Peixe">Peixe</MenuItem>
                                    <MenuItem value="Ovo">Ovo</MenuItem>
                                </Select>
                            </FormControl>    
                        </div>
                        <div className={classes.flexContainer}>
                            <FormControl className={classes.flexItem} style={{ marginRight: 10 }}>
                                <InputLabel htmlFor="origem-label">Origem</InputLabel>
                                <Select value="" inputProps={{ name: 'origem', id: 'origem-label' }}>
                                    <MenuItem value=""><em>Nenhum</em></MenuItem>                            
                                    <MenuItem value="Nanciona">Peixe</MenuItem>
                                    <MenuItem value="Importado">Ovo</MenuItem>
                                </Select>
                            </FormControl>    
                            <FormControl className={classes.flexItem}>
                                <InputLabel htmlFor="ncm-label">NCM</InputLabel>
                                <Select value="" inputProps={{ name: 'ncm', id: 'ncm-label' }}>
                                    <MenuItem value=""><em>Nenhum</em></MenuItem>                            
                                    <MenuItem value="99999999">99999999</MenuItem>
                                    <MenuItem value="00000000">00000000</MenuItem>
                                </Select>
                            </FormControl>  
                        </div>
                        <div className={classes.footer}>
                            <Button 
                                type="submit" 
                                variant="outlined" 
                                color="primary" 
                                style={{ marginRight: 10 }}
                            >
                                Salvar
                            </Button>
                            <Button 
                                variant="outlined" 
                                onClick={() => this.props.history.push("/produtos")}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                    <div>
                        { this.renderFornecedoresProd() }
                    </div>
                </SwipeableViews>
            </CustomPaper>
        )
    }

    renderFornecedoresProd() {
        const list = this.props.fornecedoresProd || [];
        return list.map((fp, index) => {
            return (
                <FornecedorProd 
                    key={index} 
                    id={fp.id}
                    idUn={fp.idUn}
                    idFor={fp.idFor}
                    codigo={fp.codigo}
                    fator={fp.fator}
                    edicao={index + 1 < list.length}>
                </FornecedorProd>
            )
        })        
    }
}

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'flex-start',
        background: '#eee',
        borderRadius: '3px'
    },
    flexContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 10        
    },
    flexItem: {
        flex: 1,
        marginTop: 10,
    },
    footer: {
        marginTop: 20
    },
    '@media (max-width: 420px)': {
        flexContainer: {
            flexDirection: 'column',
            '& div': {
                marginRight: '0 !important'
            }    
        }
    }
};

function mapStateToProps(state) {
    return { 
        fornecedoresProd: state.fornecedoresProd
    }
}

export default connect(mapStateToProps, { addFornecProd })(withRouter(withStyles(styles)(Produto)));