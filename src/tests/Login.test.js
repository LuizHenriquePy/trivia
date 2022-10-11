import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from '../App';
import userEvent from "@testing-library/user-event";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";

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

  test('Verifica se o usuário foi direcionado para a página correta e se o token é salvo no localStorage', async () => {
    const tokenResponse = {
      "response_code": 0,
      "response_message": "Token Generated Successfully!",
      "token": "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    };

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(tokenResponse),
    }));

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
    userEvent.click(buttonPlay);
    // setInterval(() => {
    //   console.log('esperando')
    // }, 3000);
    await waitForElementToBeRemoved(screen.queryByText('Play'));
    // .then(() => {
    //  const { pathname } = history.location;
    //   expect(pathname).toBe('/game');
    //  });
    const { pathname } = history.location;
    // console.log(pathname);
    expect(pathname).toBe('/game');
    global.fetch.mockClear();
    expect(localStorage.getItem('token')).toBe('f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6')
  });

  // test('Verifica se a fetch é chamada 2X para gerar token se o token do localStorage for inválido', async () => {
  //   const tokenResponse = {
  //     "response_code": 3,
  //     "response_message": "Token Generated Successfully!",
  //     "token": "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
  //   };

  //   global.fetch = jest.fn(() => Promise.resolve({
  //     json: () => Promise.resolve(tokenResponse),
  //   }));

  //   const { history } = renderWithRouterAndRedux(<App />);
  //   const buttonPlay = screen.getByRole('button', {
  //     name: /play/i
  //   })
  //   const inputNome = screen.getByRole('textbox', {
  //     name: /nome/i
  //   })
  //   const inputEmail = screen.getByRole('textbox', {
  //     name: /email/i
  //   })

  //   userEvent.type(inputEmail, 'alguem@teste.com');
  //   userEvent.type(inputNome, 'Alguém');
  //   userEvent.click(buttonPlay);
  //   // setInterval(() => {
  //   //   console.log('esperando')
  //   // }, 3000);
  //   await waitForElementToBeRemoved(screen.queryByText('Play'));
  //   expect(fetch).toBeCalledTimes(2);
  //   global.fetch.mockClear();
  // })

  test('Verifica se fetch é chamada 1x se o token do localStorage for válido', async () => {
    const tokenResponse = {
      "response_code": 0,
      "response_message": "Token Generated Successfully!",
      "token": "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    };

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(tokenResponse),
    }));

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
    userEvent.click(buttonPlay);
    // setInterval(() => {
    //   console.log('esperando')
    // }, 3000);
    await waitForElementToBeRemoved(screen.queryByText('Play'));
    expect(fetch).toBeCalledTimes(1);
    global.fetch.mockClear();
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
