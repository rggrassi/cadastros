import _ from 'lodash';

export function obterDado(dado, campo){
    const info = _.deburr(dado[campo])
    return info === null ? '' : info;
}

export function getSuggestions(data, suggestion, tamanho) {
    const value = _.deburr(suggestion.trim().toLowerCase());
    if (value.length >= tamanho) { 
        const sugestoes = data.filter(produto => {                
            return (obterDado(produto, 'descricao').toLowerCase().includes(value));
        });
        return sugestoes;
    } else {
        return data;
    }
}