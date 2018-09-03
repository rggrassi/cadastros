import { ADD_VINCULO, DELETE_VINCULO, UPDATE_VINCULO } from '../actions/types'
import _ from 'lodash';

const INITIAL_STATE = [{ id: 0 }];

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_VINCULO: 
            return state.map(item => {
                if(item.id === action.payload.id){
                  return { ...item, ...action.payload }
                }
                return item
            }).concat(
                [{ id: _.uniqueId() }]
            )            

        case UPDATE_VINCULO:
            return state.map(item => {
                if(item.id === action.payload.id){
                  return { ...item, ...action.payload }
                }
                return item
            })            
        case DELETE_VINCULO: 
            return state.filter(fp => fp.id !== action.payload)     
        default: 
            return state
    }
}