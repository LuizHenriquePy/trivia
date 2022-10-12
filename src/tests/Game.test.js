import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Ranking from "../pages/Ranking";
import App from '../App';
import Game from '../pages/Game';
import { questionsResponse } from '../../cypress/mocks/questions';

function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}

describe('Faz os testes do game.', () => {
  test('Verifica se a imagem do usuário aparece na tela.', async () => {
    const INITIAL_STATE = {
      player: {
        name: 'João',
        assertions: 3,
        score: 20,
        gravatarEmail: 'user@email.com',
      }
    };
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    const userImg = screen.queryByTestId('header-profile-picture');
    expect(userImg).toBeInTheDocument();
    await waitForElementToBeRemoved(userImg);
    const { pathname } = history.location;
    
    expect(pathname).toBe('/');
  });

  test('Verifica se renderiza a pergunta', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const INITIAL_STATE = {
      player: {
        name: 'João',
        assertions: 3,
        score: 20,
        gravatarEmail: 'user@email.com',
      }
    };

    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    const questionCategory = await screen.findByTestId('question-category');

    expect(questionCategory).toBeInTheDocument();

    global.fetch.mockClear();
  });

  test('Verifica se troca a pergunta', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const INITIAL_STATE = {
      player: {
        name: 'João',
        assertions: 3,
        score: 20,
        gravatarEmail: 'user@email.com',
      }
    };

    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));

    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));

    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));

    userEvent.click(await screen.findByTestId('wrong-answer-1'));
    userEvent.click(screen.getByTestId('btn-next'));

    userEvent.click(await screen.findByTestId('correct-answer'));

    const nextBtn = screen.getByTestId('btn-next');

    expect(nextBtn).toBeInTheDocument();

    userEvent.click(screen.getByTestId('btn-next'));

    expect(nextBtn).not.toBeInTheDocument();

    global.fetch.mockClear();
  });

  test('Verifica se muda o timer volta para a página de login se o token estiver errado', async () => {
    const invalidTokenResponse = {
      "response_code": 3,
      "response_message": "Token Generated Successfully!",
      "token": "INVALID_TOKEN"
    }

    const INITIAL_STATE = {
      player: {
        name: 'João',
        assertions: 3,
        score: 20,
        gravatarEmail: 'user@email.com',
      }
    };

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(invalidTokenResponse),
    }));

    const { history } =  renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    const userImg = screen.queryByTestId('header-profile-picture');

    await waitForElementToBeRemoved(userImg);

    expect(history.location.pathname).toBe('/')

    global.fetch.mockClear();
  });
});
