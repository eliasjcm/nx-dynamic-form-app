import FormPage from "src/pages/form/FormPage";
import ThankYouPage from "src/pages/thank-you/ThankYouPage";

export const routesConfig = [
    {
      path: '/thank-you',
      element: <ThankYouPage />,
    },
    {
      path: '/',
      element: <FormPage />,
    },
  ];