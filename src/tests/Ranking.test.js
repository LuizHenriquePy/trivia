import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Ranking from "../pages/Ranking";
import App from '../App';

describe('Teste do componente Ranking', () => {
  it('verifica se o componente Ranking é renderizado corretamente', () => {
    renderWithRouterAndRedux(<Ranking />);
    const titleElement = screen.getByTestId("ranking-title");
    const playerName = screen.getByTestId('player-name-0');
    const score = screen.getByTestId('player-score-0');
    const btnHome = screen.getByTestId('btn-go-home')
    expect(titleElement).toBeDefined();
    expect(playerName).toBeDefined();
    expect(score).toBeDefined();
    expect(btnHome).toBeDefined();
  });
  it('verifica se ao clicar no botão "Go home" redireciona para rota "/"', () => {
    const INITIAL_STATE = {
      player: {
        name: 'João',
        assertions: 3,
        score: 20,
        gravatarEmail: 'user@email.com',
      }
    };
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    const btnHome = screen.getByTestId('btn-go-home')
    userEvent.click(btnHome);
    const { pathname } = history.location;
    console.log(pathname);
    expect(pathname).toBe('/');
  })
})