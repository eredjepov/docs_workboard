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


const diagnoseFilters = [
  <TextInput key="title" label="Диагноз" source="title@ilike" alwaysOn />,
  <TextInput key="description" label="Заметки" source="description@ilike" />,
];

const diagnoseInputs = (
  <>
    {/* В форме оставляй только поля, которые человек вводит руками; id и даты лучше не трогать. */}
    <TextInput source="title" label="Диагноз" validate={[required()]} fullWidth />
    <TextInput  source="description" label="Заметки" fullWidth />
  
  </>
);


// CRUD - Create Read Update Delete

export const DiagnoseList = () => (
  <List
    filters={diagnoseFilters}
    perPage={25}
    sort={{ field: "created_at", order: "DESC" }}
  >
    <Datagrid rowClick="show">
      <NumberField source="id" label="ID" />
      <TextField source="title" label="Диагноз" />
      <TextField source="description" label="Заметки" />
      <DateField source="created_at" label="Created" showTime />
      <ShowButton />
      <EditButton />
      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);

export const DiagnoseCreate = () => (
  <Create>
    <SimpleForm>{diagnoseInputs}</SimpleForm>
  </Create>
);

export const DiagnoseEdit = () => (
  <Edit>
    <SimpleForm>{diagnoseInputs}</SimpleForm>
  </Edit>
);

export const DiagnoseShow = () => (
  <Show>
    <SimpleShowLayout>
      {/* Show почти повторяет List, только без input-компонентов и кнопок изменения. */}
      <NumberField source="id" label="ID" />
      <TextField source="title" label="Диагноз" />
      <TextField source="description" label="Заметки" />
      <DateField source="created_at" label="Created" showTime />
    </SimpleShowLayout>
  </Show>
);
