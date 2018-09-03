import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import CustomTableHead from './table_head';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

class TableProdutos extends Component {    

    state = {
        order: 'asc',
        orderBy: 'descricao',
        selected: [],
        page: 0,
        rowsPerPage: 5,
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
    
        if (this.state.orderBy === property && this.state.order === 'desc') {
          order = 'asc';
        }
    
        this.setState({ order, orderBy });
    };
    
    handleSelectAllClick = (event, checked) => {
        if (checked) {
          this.setState(state => ({ selected: this.props.produtos.map(produto => produto.id) }));
          return;
        }
        this.setState({ selected: [] });
    };
    
    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        this.setState({ selected: newSelected });
    };
    
    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    
    isSelected = id => this.state.selected.indexOf(id) !== -1;

    
    render() {
        const { produtos } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, produtos.length - page * rowsPerPage);

        return(
            <div>    
                <div style={{ overflowX: 'auto' }}>
                    <Table >
                        <CustomTableHead 
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={produtos.length}
                        >
                        </CustomTableHead>
                        <TableBody>
                            {produtos
                                .sort(getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(produto => {
                                    const isSelected = this.isSelected(produto.id);
                                    return (            
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, produto.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={produto.id}
                                            selected={isSelected}
                                        >
                                            <TableCell>{produto.descricao}</TableCell>
                                            <TableCell>{produto.grupo}</TableCell>
                                            <TableCell>{produto.subgrupo}</TableCell>
                                            <TableCell>{produto.un}</TableCell>
                                            <TableCell>
                                                <IconButton title="Editar">
                                                    <Edit />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton title="Remover">
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>                      
                    </Table>       
                </div> 
                <TablePagination
                    component="div"
                    count={produtos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    labelRowsPerPage="Itens por página"
                    rowsPerPageOptions={[5, 10, 20]}
                />  
            </div>                     
        )
    }
}

function desc(a, b, orderBy) {    
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}
  
function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

export default TableProdutos;