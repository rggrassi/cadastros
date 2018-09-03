import { ADD_VINCULO, DELETE_VINCULO, UPDATE_VINCULO } from './types';

export function addFornecProd(fornecProd) {
    return {
        type: ADD_VINCULO,
        payload: fornecProd
    }
}

export function updateFornecProd(fornecProd) {
    return {
        type: UPDATE_VINCULO,
        payload: fornecProd
    }
}

export function removeFornecProd(id) {
    return {
        type: DELETE_VINCULO,
        payload: id
    }
}