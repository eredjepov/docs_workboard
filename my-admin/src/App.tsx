import { Admin, CustomRoutes, Resource } from "react-admin";
import { BrowserRouter, Route } from "react-router-dom";
import {
  defaultI18nProvider,
  ForgotPasswordPage,
  LoginPage,
  SetPasswordPage,
} from "ra-supabase";
import {
  PatientCreate,
  PatientEdit,
  PatientList,
  PatientShow,
} from "./patients";
import {
  DiagnoseCreate,
  DiagnoseEdit,
  DiagnoseList,
  DiagnoseShow,
} from "./diagnosis";
import { VisitCreate, VisitEdit, VisitList, VisitShow } from "./visits";
import { authProvider, dataProvider } from "./supabase";
import { Layout } from "./Layout";

export const App = () => (
  <BrowserRouter>
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      i18nProvider={defaultI18nProvider}
      layout={Layout}
      loginPage={LoginPage}
    >
      {/* Начинай новый раздел с Resource: name всегда равен имени таблицы в Supabase. */}
      <Resource
        name="patients_info"
        list={PatientList}
        create={PatientCreate}
        edit={PatientEdit}
        show={PatientShow}
        options={{ label: "Patients" }}
      />
      {/* По этому же шаблону добавляй следующие таблицы: list/create/edit/show лежат в отдельном файле. */}
      <Resource
        name="visits"
        list={VisitList}
        create={VisitCreate}
        edit={VisitEdit}
        show={VisitShow}
        options={{ label: "Visits" }}
      />
      <Resource
        name="diagnosis"
        list={DiagnoseList}
        create={DiagnoseCreate}
        edit={DiagnoseEdit}
        show={DiagnoseShow}
        options={{ label: "Diagnoses" }}
        // Пока не создаем страницы для диагнозов, но ресурс нужен, чтобы React Admin понимал связи между таблицами.
      />
      {/* Auth-страницы оставь в App: без логина Supabase RLS не даст создавать записи. */}
      <CustomRoutes noLayout>
        <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
        <Route
          path={ForgotPasswordPage.path}
          element={<ForgotPasswordPage />}
        />
      </CustomRoutes>
    </Admin>
  </BrowserRouter>
);
