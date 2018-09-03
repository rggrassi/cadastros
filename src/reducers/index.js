import { combineReducers } from 'redux';
import UnidadesReducer from './unidades_reducer';
import FornecedoresReducer from './fornecedores_reducer'; 
import FornecedoresProd from './fornec_prod_reducer';

const rootReducer = combineReducers({
    unidades: UnidadesReducer,
    fornecedores: FornecedoresReducer,
    fornecedoresProd: FornecedoresProd
});

export default rootReducer;