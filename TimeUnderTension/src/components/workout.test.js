import {render, screen} from '@testing-library/react';
import {Provider} from "react-redux";

import Workout from './workout'
import store from "../store";


jest.mock('./work',  () => props => <div>Work {props.order}</div>);

const renderWorkout = () => {
    render(
        <Provider store={store}>
            <Workout />
        </Provider>
    )
}

beforeEach(() => {
    renderWorkout()
})

test('renders', () => {
    const textElement = screen.getByText('Workout')
    expect(textElement).toBeInTheDocument()
})

// test('can add a work', () => {
//     const addWorkBtn = screen.getByText('Add work')
//     addWorkBtn.click()
//
//     const workComponent = screen.getByText('Work 0')
//     expect(workComponent).toBeInTheDocument()
// })
//
// test('can remove a work', () => {
//     const workComponent = screen.getByText('Work 0')
//     expect(workComponent).toBeInTheDocument()
//
//     const removeWorkBtn = screen.getByText('Remove work 0')
//     removeWorkBtn.click()
//
//     expect(workComponent).not.toBeInTheDocument()
// })
