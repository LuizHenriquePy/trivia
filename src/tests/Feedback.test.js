import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Feedback from "../pages/Feedback";
import App from '../App';

describe('Verifica informações na tela de feedback: ', () => {
  test('Se tela de feedback é renderizada corretamente', () => {
    renderWithRouterAndRedux(<Feedback />);
    const title = screen.getByTestId("feedback-text");
    const scoreElement = screen.getByTestId("feedback-total-score");
    const assertionsElement = screen.getByTestId("feedback-total-question");
    expect(title).toBeDefined();
    expect(scoreElement).toBeDefined();
    expect(assertionsElement).toBeDefined();
  });
  test('Verifica se botão de ranking leva para a rota /ranking', () => {
    const INITIAL_STATE = {
      player: {
        name: 'João',
        assertions: 3,
        score: 20,
        gravatarEmail: 'user@email.com',
      }
    };
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
    const btnRanking = screen.getByTestId('btn-ranking');
    expect(btnRanking).toBeDefined();
    userEvent.click(btnRanking);
    const { pathname } = history.location;
    console.log(pathname);
    expect(pathname).toBe('/ranking');
  });
  test('Verifica se botão "Play Again" leva para a rota /', () => {
    const INITIAL_STATE = {
      player: {
        name: 'João',
        assertions: 3,
        score: 20,
        gravatarEmail: 'user@email.com',
      }
    };
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
    const btnLogin = screen.getByTestId('btn-play-again');
    expect(btnLogin).toBeDefined();
    userEvent.click(btnLogin);
    const { pathname } = history.location;
    console.log(pathname);
    expect(pathname).toBe('/');
  })

})