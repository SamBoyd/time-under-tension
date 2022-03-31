import {createSlice} from '@reduxjs/toolkit';
import 'react-native-get-random-values';


const workoutTemplatesSlice = createSlice({
    name: 'templates',
    initialState: [],
    reducers: {
        reset: state => {
            state.splice(0, state.length)
        },
        addToTemplates: (state, action) => {
            const newTemplate = {...action.payload}
            delete newTemplate.existingTemplate

            const indexOfExistingTemplate = state.map(t => t.id).indexOf(newTemplate.id)

            if (indexOfExistingTemplate === -1) {
                state.push(newTemplate)
            } else {
                state.splice(indexOfExistingTemplate, 1, newTemplate)
            }
        }
    }
})

export const selectTemplates = state => state.templates
export const {
    reset,
    addToTemplates
} = workoutTemplatesSlice.actions
export default workoutTemplatesSlice.reducer