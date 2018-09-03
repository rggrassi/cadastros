import React, { Component } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

class TableHeadProdutos extends Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };
    
    render() {
        const { order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell key="descricao"
                        sortDirection={orderBy === "descricao" ? order : false}
                    >
                        <Tooltip title="Ordenar"
                            placement={'bottom-start'}
                            enterDelay={300}
                        >
                            <TableSortLabel
                                active={orderBy === "descricao"}
                                direction={order}
                                onClick={this.createSortHandler("descricao")}
                            >
                                Descrição
                            </TableSortLabel>
                        </Tooltip>

                    </TableCell>    
                    <TableCell key="grupo"
                        sortDirection={orderBy === "grupo" ? order : false}
                    >
                        <Tooltip title="Ordenar"
                            placement={'bottom-start'}
                            enterDelay={300}
                        >
                            <TableSortLabel
                                active={orderBy === "grupo"}
                                direction={order}
                                onClick={this.createSortHandler("grupo")}
                            >
                                Grupo
                            </TableSortLabel>
                        </Tooltip>
                    </TableCell>    
                    <TableCell key="subgrupo"
                        sortDirection={orderBy === "subgrupo" ? order : false}
                    >
                        <Tooltip title="Ordenar"
                            placement={'bottom-start'}
                            enterDelay={300}
                        >
                            <TableSortLabel
                                active={orderBy === "subgrupo"}
                                direction={order}
                                onClick={this.createSortHandler("subgrupo")}
                            >
                                Grupo
                            </TableSortLabel>
                        </Tooltip>
                    </TableCell>    
                    <TableCell key="un"
                        sortDirection={orderBy === "un" ? order : false}
                    >
                        <Tooltip title="Ordenar"
                            placement={'bottom-start'}
                            enterDelay={300}
                        >
                            <TableSortLabel
                                active={orderBy === "un"}
                                direction={order}
                                onClick={this.createSortHandler("un")}
                            >
                                Unidade
                            </TableSortLabel>
                        </Tooltip>
                    </TableCell>    
                    <TableCell key="edit">
                    </TableCell>    
                    <TableCell key="del">
                    </TableCell>   
                </TableRow>
            </TableHead>
        )
    }
}

export default TableHeadProdutos;