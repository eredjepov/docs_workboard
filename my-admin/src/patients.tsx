import {
  Create,
  Datagrid,
  DateField,
  DeleteButton,
  Edit,
  EditButton,
  List,
  NumberField,
  NumberInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  required,
} from "react-admin";

type PatientFormValues = {
  name?: string;
  surname?: string | null;
  phone?: number | string | null;
  created_at?: string;
  updated_at?: string | null;
};

const normalizeNullable = <T,>(value: T | "" | undefined): T | null => {
  if (value === "" || value === undefined) {
    return null;
  }

  return value;
};

const patientFilters = [
  <TextInput key="name" label="Name" source="name@ilike" alwaysOn />,
  <TextInput key="surname" label="Surname" source="surname@ilike" />,
];

const patientInputs = (
  <>
    {/* В форме оставляй только поля, которые человек вводит руками; id и даты лучше не трогать. */}
    <TextInput source="name" label="Name" validate={[required()]} fullWidth />
    <TextInput source="surname" label="Surname" fullWidth />
    <NumberInput source="phone" label="Phone" fullWidth />
  </>
);

const preparePatientCreate = (data: PatientFormValues) => ({
  ...data,
  surname: normalizeNullable(data.surname),
  phone: normalizeNullable(data.phone),
  created_at: data.created_at ?? new Date().toISOString(),
});

const preparePatientEdit = (data: PatientFormValues) => ({
  ...data,
  surname: normalizeNullable(data.surname),
  phone: normalizeNullable(data.phone),
  // Здесь мы сами ставим updated_at, чтобы ты видел, где готовить данные перед Supabase.
  updated_at: new Date().toISOString(),
});

export const PatientList = () => (
  <List
    filters={patientFilters}
    perPage={25}
    sort={{ field: "created_at", order: "DESC" }}
  >
    <Datagrid rowClick="show">
      <NumberField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="surname" label="Surname" />
      <NumberField source="phone" label="Phone" />
      <DateField source="created_at" label="Created" showTime />
      <DateField source="updated_at" label="Updated" showTime />
      <ShowButton />
      <EditButton />
      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);

export const PatientCreate = () => (
  <Create transform={preparePatientCreate} redirect="list">
    <SimpleForm>{patientInputs}</SimpleForm>
  </Create>
);

export const PatientEdit = () => (
  <Edit transform={preparePatientEdit} redirect="list">
    <SimpleForm>{patientInputs}</SimpleForm>
  </Edit>
);

export const PatientShow = () => (
  <Show>
    <SimpleShowLayout>
      {/* Show почти повторяет List, только без input-компонентов и кнопок изменения. */}
      <NumberField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="surname" label="Surname" />
      <NumberField source="phone" label="Phone" />
      <DateField source="created_at" label="Created" showTime />
      <DateField source="updated_at" label="Updated" showTime />
    </SimpleShowLayout>
  </Show>
);
