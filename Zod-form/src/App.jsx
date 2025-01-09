import { createBrowserRouter } from "react-router-dom";
import FormLayout from "./Layouts/FormLayout";
import FormCard from "./componentsCustom/formCard";
import FormShadCn from "./componentsCustom/FormShadCn";

const App = createBrowserRouter([
  {
    path: "/",
    element: <FormLayout />,
    children: [
      {
        index:true,
        element: <FormShadCn />
      }
    ]
  },
])

export default App