import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import Home from '../../pages/Home';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockCategories = {
  trivia_categories: [
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Entertainment: Books" },
    { id: 11, name: "Entertainment: Film" },
    { id: 12, name: "Entertainment: Music" },
    { id: 13, name: "Entertainment: Musicals & Theatres" },
  ],
};

describe('Page Home', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockCategories,
    }));
  });
  afterEach(() => jest.clearAllMocks());
  
  it('all elements start disabled waiting for the API response and after the response all elements are enabled', async () => {
    renderWithRouterAndRedux(<Home />);
    const imgLogo = screen.getByRole('img', {  name: /logo/i});
    const inputNickname = screen.getByRole('textbox');
    const disabledButtonPlay = screen.getByTestId('buttonPlay');
    const buttonEasy = screen.getByRole('button', {  name: /easy/i});
    const buttonMedium = screen.getByRole('button', {  name: /medium/i});
    const buttonHard = screen.getByRole('button', {  name: /hard/i});
    const buttonRandom = screen.getByRole('button', {  name: /random/i});
    const selectCategories = screen.getByRole('combobox');
    const buttonRanking = screen.getByRole('button', {  name: /podium ranking/i});
    
    expect(imgLogo).toBeInTheDocument();
    expect(inputNickname).toBeInTheDocument();
    expect(inputNickname).toBeDisabled();
    expect(disabledButtonPlay).toBeInTheDocument();
    expect(disabledButtonPlay).toBeDisabled();
    expect(buttonEasy).toBeInTheDocument();
    expect(buttonEasy).toBeDisabled();
    expect(buttonMedium).toBeInTheDocument();
    expect(buttonMedium).toBeDisabled();
    expect(buttonHard).toBeInTheDocument();
    expect(buttonHard).toBeDisabled();
    expect(buttonRandom).toBeInTheDocument();
    expect(buttonRandom).toBeDisabled();
    expect(selectCategories).toBeInTheDocument();
    expect(selectCategories).toBeDisabled();
    expect(buttonRanking).toBeInTheDocument();
    expect(buttonRanking).toBeDisabled();

    const enabledButtonPlay = await screen.findByRole('button', {  name: /play/i});
    expect(enabledButtonPlay).toBeInTheDocument();
    expect(enabledButtonPlay).toBeEnabled();
    expect(imgLogo).toBeInTheDocument();
    expect(inputNickname).toBeInTheDocument();
    expect(inputNickname).toBeEnabled();
    expect(disabledButtonPlay).toBeInTheDocument();
    expect(disabledButtonPlay).toBeEnabled();
    expect(buttonEasy).toBeInTheDocument();
    expect(buttonEasy).toBeEnabled();
    expect(buttonMedium).toBeInTheDocument();
    expect(buttonMedium).toBeEnabled();
    expect(buttonHard).toBeInTheDocument();
    expect(buttonHard).toBeEnabled();
    expect(buttonRandom).toBeInTheDocument();
    expect(buttonRandom).toBeEnabled();
    expect(selectCategories).toBeInTheDocument();
    expect(selectCategories).toBeEnabled();
    expect(screen.getAllByRole('option').length).toEqual(6);
    expect(buttonRanking).toBeInTheDocument();
    expect(buttonRanking).toBeEnabled();
  });
  it('Todos elementos permanecem desabilitados e aparece um toast de erro quando há um erro na requisição da API', () => {});
  it('Error message appears when the user presses the "Play" button with the input "nickname" having less than 3 characters and the message disappears after continue typing in the input', () => {});
})