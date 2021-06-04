const GET_FISH_TYPES = 'appointments/GET_FISH_TYPES'

const getFishTypes = (list) => {
    return {
        type: GET_FISH_TYPES,
        list
    }
};

export const displayFishTypes = () => async (dispatch) => {
    const response = await fetch('/api/fish-types/');
    // console.log(response)
    if (response.ok) {
        const data = await response.json();
        dispatch(getFishTypes(data))
    }
}

const initialState = {
    list: [],
};

const sortList = list => {
    return list.map(type => type.id)
}

export default function fishTypesReducer(state = initialState, action) {
    switch (action.type) {

        case GET_FISH_TYPES:
            const nextState = {}
            action.list.fish_types.forEach(type => {
                nextState[type.id] = type
            })
            return {
                ...state,
                ...nextState,
                list: sortList(action.list.fish_types)
            };
        default:
            return state;
    }
}
