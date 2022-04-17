import React from 'react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import renderer from "react-test-renderer";
import {v4 as uuidv4} from "uuid";
import '@testing-library/jest-dom/extend-expect'

import GenericWork from "./genericWork";

jest.useFakeTimers()


const mockStore = configureStore([]);

describe('GenericWork component', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            settings: {
                defaultRestTime: 10,
                defaultWorkTimeStart: 20,
                defaultWorkTimeEnd: 30,
            },
            workoutState: {
                name: 'Workout',
                id: uuidv4(),
                created_at: (new Date()).toISOString(),
                work: ['work_1'],
                started_at: null,
                finished_at: null,
            },
            work: [
                {
                    id: 'work_1',
                    created_at: (new Date()).toISOString(),
                    exercise: {name: 'ex1', category: 'cat1'},
                    sets: ['set1'],
                    restTime: null,
                    workTimeStart: null,
                    workTimeEnd: null,
                    finished: false,
                }
            ],
            set: [
                {
                    id: 'set1',
                    numberReps: 12,
                    weight: 40,
                    workTime: null,
                    finished: false,
                }
            ],
            timer: {},
        });
    });

    const getComponent = (
        id = 'work1',
        exercise = {name: 'ex1', category: 'cat1'},
        sets = ['set1'],
        restTime = 10,
        workTimeStart = 20,
        workTimeEnd = 30,
        finished = null,
        active = true,
        workIndex = 0,
        fireAddSet = jest.fn(),
        fireRemoveSet = jest.fn(),
        fireChangeRestTime = jest.fn(),
        fireChangeWorkTimeStart = jest.fn(),
        fireChangeWorkTimeEnd = jest.fn(),
        removeWork = jest.fn(),
        moveWorkUp = jest.fn(),
        moveWorkDown = jest.fn(),
        displayChangeActiveWork = jest.fn(),
        previousSets = [],
    ) => {
        return renderer.create(
            <Provider store={store}>
                <GenericWork
                    id={id}
                    exercise={exercise}
                    sets={sets}
                    restTime={restTime}
                    workTimeStart={workTimeStart}
                    workTimeEnd={workTimeEnd}
                    finished={finished}
                    active={active}
                    workIndex={workIndex}
                    fireAddSet={fireAddSet}
                    fireRemoveSet={fireRemoveSet}
                    fireChangeRestTime={fireChangeRestTime}
                    fireChangeWorkTimeStart={fireChangeWorkTimeStart}
                    fireChangeWorkTimeEnd={fireChangeWorkTimeEnd}
                    removeWork={removeWork}
                    moveWorkUp={moveWorkUp}
                    moveWorkDown={moveWorkDown}
                    displayChangeActiveWork={displayChangeActiveWork}
                    previousSets={previousSets}
                />
            </Provider>
        )
    }

    it('should render with given state from Redux store', () => {
        const component = getComponent()
        expect(component.toJSON()).toMatchSnapshot();
    });

    xit('displays zero values for the rest and work time', () => {
        const component = getComponent(
            'work1',
            {name: 'ex1', category: 'cat1'},
            ['set1'],
            0,
            0,
            0,
            null,
            true,
            0,
            jest.fn(),
            jest.fn(),
            jest.fn(),
            jest.fn(),
            jest.fn(),
            jest.fn(),
            jest.fn(),
            jest.fn(),
            jest.fn(),
            [],
        )

        expect(component.root.findByProps({testId: 'workTime_work1'}).textContent).toBe('Target tension for 0 to 0 sec')
        expect(component.root.findByProps({testId: 'restTime_work1'}).textContent).toBe('Rest for 0 sec')
    })

    xit('can edit the work', () => {
        renderer.act(() => {
            component.root.findByProps({testId: 'toggleEditWork'}).props.onPress()
        })

        renderer.act(() => {
            component.root.findByProps({testId: 'saveEditWork'}).props.onPress()
        })


        expect(component.root.children[0].props.fireChangeRestTime).not.toBeCalled()
        expect(component.root.children[0].props.fireChangeWorkTimeStart).not.toBeCalled()
        expect(component.root.children[0].props.fireChangeWorkTimeEnd).not.toBeCalled()
        renderer.act(() => {
            component.root.findByProps({testId: 'toggleEditWork'}).props.onPress()
        })
        renderer.act(() => {
            component.root.findByProps({testId: 'optionRestTime_1'}).click()
        })
        renderer.act(() => {
            component.root.findByProps({testId: 'saveEditWork'}).props.onPress()

        })

        expect(component.root.findByProps({testId: 'restTime_work1'})).toHaveTextContent('Rest time for 2')
    })
})
