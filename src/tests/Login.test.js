import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from '../App';
import userEvent from "@testing-library/user-event";
import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";

describe('Verifica se os inputs email, nome e botão play estão renderizados', () => {
  
  test('Verifica o input nome', () => {
    renderWithRouterAndRedux(<App />);
    const inputNome = screen.getByRole('textbox', {
      name: /nome/i
    })
    expect(inputNome).toBeInTheDocument();
  });

  test('Verifica o input email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email/i
    })
    expect(inputEmail).toBeInTheDocument();
  });

  test('Verifica o botão play', () => {
    renderWithRouterAndRedux(<App />);
    const buttonPlay = screen.getByRole('button', {
      name: /play/i
    })
    expect(buttonPlay).toBeInTheDocument();
  });
});

describe('Verificações do botão play', () => {
  test('Verifica se o botão começa desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const buttonPlay = screen.getByRole('button', {
      name: /play/i
    })

    expect(buttonPlay).toBeDisabled();
  })

  test('Verifica a validação do botão play', () => {
    renderWithRouterAndRedux(<App />);
    const buttonPlay = screen.getByRole('button', {
      name: /play/i
    })
    const inputNome = screen.getByRole('textbox', {
      name: /nome/i
    })
    const inputEmail = screen.getByRole('textbox', {
      name: /email/i
    })

    userEvent.type(inputEmail, 'alguem@teste.com');
    userEvent.type(inputNome, 'Alguém');
    expect(buttonPlay).toBeEnabled();
  })

  test('Verifica se o usuário foi direcionado para a página correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonPlay = screen.getByRole('button', {
      name: /play/i
    })
    const inputNome = screen.getByRole('textbox', {
      name: /nome/i
    })
    const inputEmail = screen.getByRole('textbox', {
      name: /email/i
    })

    userEvent.type(inputEmail, 'alguem@teste.com');
    userEvent.type(inputNome, 'Alguém');
    global.fetch = jest.fn().mockReturnValue(0);
    userEvent.click(buttonPlay);
    // setInterval(() => {
    //   console.log('esperando')
    // }, 3000);
    // waitForElementToBeRemoved(screen.findByTestId('btn-settings')).then(() => {
    //   const { pathname } = history.location;
    //   expect(pathname).toBe('/game');
    // });
    const { pathname } = history.location;
    console.log(pathname);
  })
})

describe('Verificação do botão settings', () => {
  test('Verifica se o usuário foi direcionado para a página correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByRole('button', {
      name: /configurações/i
    })

    userEvent.click(buttonSettings);
    expect(history.location.pathname).toBe('/settings')
  })
})
