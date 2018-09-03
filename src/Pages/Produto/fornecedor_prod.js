import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';
import { addFornecProd, removeFornecProd } from '../../actions'; 

class FornecedorProd extends Component {

    constructor(props) {
        super(props);        
        this.state = {
            idUn: '',
            idFor: '',
            codigo: '',
            fator: 0,
            edicao: false    
        };

        this.idPrd = 1;

        this.handleDelete = this.handleDelete.bind(this);
        this.unidadesChange = this.unidadesChange.bind(this);        
        this.fornecedorChange = this.fornecedorChange.bind(this);        
        this.handleSubmit = this.handleSubmit.bind(this);
    }      

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            idUn: nextProps.idUn || '',
            idFor: nextProps.idFor || '',
            codigo: nextProps.codigo || '', 
            fator: nextProps.fator || 0, 
            edicao: nextProps.edicao || false 
        })
    }

    fornecedorChange(e) {
        this.setState({ idFor: e.target.value })
    }

    unidadesChange(e) {
        this.setState({ idUn: e.target.value })    }

    handleSubmit(e) {
        e.preventDefault();

        const id = this.props.id ? this.props.id : 0;
        const { idUn, idFor, fator, codigo } = this.state;
        this.props.addFornecProd({ id, idPrd: this.idPrd, idFor, idUn, fator, codigo });
        this.setState({ idUn: 0, idFor: 0, fator: 0, codigo: '', edicao: false })
    }

    handleDelete(){
        this.props.removeFornecProd(this.props.id)
    }

    renderAcoes() {
        if (!this.state.edicao) {
            return (
                <div>
                    <IconButton type="submit" color="primary">
                        <Add />
                    </IconButton>    
                </div>
            )
        } else {
            return (
                <div>
                    <IconButton>
                        <Edit />
                    </IconButton>    
                    <IconButton onClick={this.handleDelete} color="secondary">
                        <Delete />
                    </IconButton>  
                </div>
            )
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <form className={classes.container} onSubmit={this.handleSubmit}>
                    <FormControl style={{ flex: 2, marginRight: 10 }}>
                        <InputLabel>Fornecedor</InputLabel>
                        <Select value={this.state.idFor} onChange={this.fornecedorChange}>                                                                                                      
                            { this.renderFornecedores() }    
                        </Select>
                    </FormControl>
            
                    <TextField 
                        id="codigo"
                        style={{ flex: 1, marginRight: 10 }} 
                        label="Referência" 
                        type="text"
                        value={ this.state.codigo }
                        onChange={(e) => { this.setState( { codigo: e.target.value }) }}
                    >
                    </TextField>

                    <FormControl style={{ flex: 1, marginRight: 10 }}>
                        <InputLabel>Unidade</InputLabel>
                        <Select value={this.state.idUn} onChange={this.unidadesChange}>
                            { this.renderUnidades() }
                        </Select>
                    </FormControl>
            
                    <TextField 
                        id="fator"
                        style={{ flex: 1 }} 
                        label="Fator" 
                        type="number"
                        value={ this.state.fator }
                        onChange={(e) => { this.setState( { fator: e.target.value }) }}
                    >                                
                    </TextField>  

                    <div className={classes.flexItemAcoes} style={{ textAlign: 'center' }}>                                
                        { this.renderAcoes() }                                       
                    </div>
                </form>
            </div>
        )
    }

    renderFornecedores() {
        const { fornecedores } = this.props;
        return (
            fornecedores.map(forn => {
                return (
                    <MenuItem key={forn.id} value={forn.id}>{forn.razSoc}</MenuItem>
                )    
            })
        )
    }

    renderUnidades() {
        const { unidades } = this.props;
        return (
            unidades.map(un => {
                return (
                    <MenuItem key={un.id} value={un.id}>{un.abrev}</MenuItem>
                )
            })
        )
    }
}

const styles = {
    container: {
        display: 'flex', 
        padding: 20,
        marginTop: 10,
        background: '#d3dec8', 
        borderRadius: '6px'        
    },
    
    '@media(max-width: 540px)': {
        container: {
            flexDirection: 'column',
            '& div': {
                marginRight: '0 !important',
                marginBottom: 10                
            },
            '& div:last-of-type': {
                marginBottom: 0,
            },
            flexItemAcoes: {
                flexBasis: '0 !important'
            }
        }
    }
}

function mapStateToProps(state) {
    return { 
        unidades: state.unidades,
        fornecedores: state.fornecedores
    }
} 

export default connect(mapStateToProps, { addFornecProd, removeFornecProd })(withStyles(styles)(FornecedorProd))