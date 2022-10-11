import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen } from "@testing-library/react";
import Feedbacks from "../pages/Feedbacks";

describe('Verifica informações na tela de feedback: ', () =>{
  test('Se tela de feedback é renderizada corretamente', () => {
      renderWithRouterAndRedux(<Feedbacks />);
      const title = screen.getByTestId("feedback-text");
      const scoreElement = screen.getByTestId("feedback-total-score");
      const assertionsElement = screen.getByTestId("feedback-total-question");
      expect(title).toBeDefined();
      expect(scoreElement).toBeDefined();
      expect(assertionsElement).toBeDefined();
  })

})