import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import Home from '../../pages/Home';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { initialStateStoreRedux, selectCategories } from '../mocks';

describe('Page Home', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({
      json: async () => selectCategories,
    }));
  });
  afterEach(() => jest.clearAllMocks());
  
  it('all elements start disabled waiting for the API response and after the response all elements are enabled', async () => {
    renderWithRouterAndRedux(<Home />, initialStateStoreRedux);
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
  it('All elements remain disabled and an error message appears when there is an error in the API request', async () => {
    global.fetch = jest.fn().mockRejectedValue();
    renderWithRouterAndRedux(<Home />, initialStateStoreRedux);
    const alertErrorMessage = await screen.findByRole('alert', { text: 'Error when trying to connect to the server' })
    const imgLogo = screen.getByRole('img', {  name: /logo/i});
    const inputNickname = screen.getByRole('textbox');
    const disabledButtonPlay = screen.getByTestId('buttonPlay');
    const buttonEasy = screen.getByRole('button', {  name: /easy/i});
    const buttonMedium = screen.getByRole('button', {  name: /medium/i});
    const buttonHard = screen.getByRole('button', {  name: /hard/i});
    const buttonRandom = screen.getByRole('button', {  name: /random/i});
    const selectCategories = screen.getByRole('combobox');
    const buttonRanking = screen.getByRole('button', {  name: /podium ranking/i});
    
    expect(alertErrorMessage).toBeInTheDocument();
    expect(imgLogo).toBeInTheDocument();
    expect(inputNickname).toBeInTheDocument();
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
  });
  it('Error message appears when the user presses the "Play" button with the input "nickname" having less than 3 characters and the message disappears after continue typing in the input', async () => {
    renderWithRouterAndRedux(<Home />, initialStateStoreRedux);
    const buttonPlay = await screen.findByRole('button', {  name: /play/i});
    const inputNickname = screen.getByRole('textbox');
    const errorMessage = screen.getByText(/please enter at least 3 characters/i)

    expect(errorMessage).not.toBeVisible();

    userEvent.type(inputNickname, 'a')
    userEvent.click(buttonPlay)

    expect(errorMessage).toBeInTheDocument();

    userEvent.type(inputNickname, 'aa')

    expect(errorMessage).not.toBeVisible();

    userEvent.click(buttonPlay)

    expect(errorMessage).not.toBeVisible();
  });
})