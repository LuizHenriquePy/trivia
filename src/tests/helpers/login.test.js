import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import App from '../../App';
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

beforeEach( () => {
    renderWithRouterAndRedux(<App />)
});
describe('Verifica se os inputs email e nome estão renderizados', () => {
    test('Verifica se o input email', () => {

    });
});
