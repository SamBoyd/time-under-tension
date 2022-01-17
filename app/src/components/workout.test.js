import {render, screen} from '@testing-library/react';
import {Provider} from "react-redux";


import Workout from './workout'
import store from "../store";


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

test('can add a work', () => {
    const addWorkBtn = screen.getByText('Add work')
    addWorkBtn.click()

    const workComponent = screen.getByText('Work 0')
    expect(workComponent).toBeInTheDocument()
})

test('can remove a work', () => {
    const workComponent = screen.getByText('Work 0')
    expect(workComponent).toBeInTheDocument()

    const removeWorkBtn = screen.getByText('Remove work 0')
    removeWorkBtn.click()

    expect(workComponent).not.toBeInTheDocument()
})

test('can removing work reorders work', () => {
    const addWorkBtn = screen.getByText('Add work')
    addWorkBtn.click()
    addWorkBtn.click()
    addWorkBtn.click()
    addWorkBtn.click()

    for (let i=0; i<2; i++) {
        const removeWorkBtn = screen.getByText('Remove work 0')
        removeWorkBtn.click()
    }

    for (let i=0; i<2; i++) {
        const workComponent = screen.getByText(`Work ${i}`)
        expect(workComponent).toBeInTheDocument()
    }
})


test('can rearrange work', () => {
    const addWorkBtn = screen.getByText('Add work')
    addWorkBtn.click()
    addWorkBtn.click()

    const moveWork0DownBtn = screen.getByTestId('moveWork0DownBtn')
    moveWork0DownBtn.click()

    for (let i=0; i<2; i++) {
        const workComponent = screen.getByText(`Work ${i}`)
        expect(workComponent).toBeInTheDocument()
    }

    const moveWork1UpBtn = screen.getByTestId('moveWork1UpBtn')
    moveWork1UpBtn.click()

    for (let i=0; i<2; i++) {
        const workComponent = screen.getByText(`Work ${i}`)
        expect(workComponent).toBeInTheDocument()
    }
})
