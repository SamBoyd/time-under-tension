import {render, screen, fireEvent} from '@testing-library/react';
import {Provider} from "react-redux";
import {v4 as uuidv4} from 'uuid';

import Work from './work'
import store from "../store";

const availableExercises = [
    {value: 'exercise1', name: "Exercise 1"},
    {value: 'exercise2', name: "Exercise 2"},
    {value: 'exercise3', name: "Exercise 3"},
]


jest.mock('./set', () => props => (<div>set{props.id}</div>));

const renderWork = () => {
    const providedWork = {
        id: uuidv4(),
        exercise: {
            type: {value: 'benchPress', name: 'Bench Press'},
            defaultRestTime: 50,
            defaultWorkTimeBandStart: 40,
            defaultWorkTimeBandFinish: 60
        },
        order: 0,
        sets: [
            {id: '123'},
            {id: '456'},
        ],
        finished_at: null
    }
    render(
        <Provider store={store}>
            <Work {...providedWork} />
        </Provider>
    )
}

beforeEach(() => {
    renderWork()
})

test('can render', () => {
    // expect(screen.getByText('Bench Press')).toBeInTheDocument()
    // expect(screen.getByText('set123')).toBeInTheDocument()
    // expect(screen.getByText('set456')).toBeInTheDocument()

})
