import React from 'react';
import configureStore from 'redux-mock-store';
import {Provider} from "react-redux";
import renderer from "react-test-renderer";

import PickExercise from "./pickExercise";
import {PAGE} from "../constants";

jest.useFakeTimers()

const mockStore = configureStore([]);

describe('Pick Exercise for workout', () => {
    let store;
    let component;
    let navigation;
    let route;


    beforeEach(() => {
        store = mockStore({
            exercises: {
                exercises: [
                    {
                        "name": "Exercise 1",
                        "category": "cat_1"
                    },
                    {
                        "name": "Exercise 2",
                        "category": "cat_2"
                    }
                ],
                categories: ['cat_1', 'cat_2'],
                newExercise: {
                    'name': '',
                    'category': ''
                }
            }

        });

        navigation = jest.fn();
        navigation.navigate = jest.fn()
        route = {
            params: {
                saveWorkTo: 'workout'
            }
        }

        component = renderer.create(
            <Provider store={store}>
                <PickExercise
                    navigation={navigation}
                    route={route}
                />
            </Provider>
        );
    });

    it('should render with given state from Redux store', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('can move to creating a new exercise', () => {
        renderer.act(() => {
            component.root.findByProps({testId: 'newExerciseButton'}).props.onPress()
        })

        // expect(store.dispatch).toHaveBeenCalledTimes(0);

        expect(navigation.navigate).toHaveBeenCalledTimes(1)
        expect(navigation.navigate).toHaveBeenCalledWith(PAGE.addExercise)
    })
})