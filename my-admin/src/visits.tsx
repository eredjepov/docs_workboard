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
} from "react-admin";

type VisitFormValues = {
  created_at?: string;
  patient_id?: number | string | null;
  comments?: string | null;
  appointment?: string | null;
  diagnosis_id?: number | string | null;
};

const normalizeNullable = <T,>(value: T | "" | undefined): T | null => {
  if (value === "" || value === undefined) {
    return null;
  }

  return value;
};

const visitFilters = [
  <TextInput
    key="appointment"
    label="Appointment"
    source="appointment@ilike"
    alwaysOn
  />,
  <TextInput key="comments" label="Comments" source="comments@ilike" />,
];

const visitInputs = (
  <>
    {/* FK можно начать с NumberInput; когда будет справочник, заменишь на ReferenceInput. */}
    <NumberInput source="patient_id" label="Patient ID" fullWidth />
    <TextInput source="appointment" label="Appointment" fullWidth />
    <TextInput
      source="comments"
      label="Comments"
      multiline
      rows={4}
      fullWidth
    />
    <NumberInput source="diagnosis_id" label="Diagnosis ID" fullWidth />
  </>
);

const prepareVisitData = (data: VisitFormValues) => ({
  ...data,
  patient_id: normalizeNullable(data.patient_id),
  comments: normalizeNullable(data.comments),
  appointment: normalizeNullable(data.appointment),
  diagnosis_id: normalizeNullable(data.diagnosis_id),
  // created_at обязателен в Supabase, поэтому ставим его здесь, а не просим пользователя вводить дату.
  created_at: data.created_at ?? new Date().toISOString(),
});

export const VisitList = () => (
  <List
    filters={visitFilters}
    perPage={25}
    sort={{ field: "created_at", order: "DESC" }}
  >
    <Datagrid rowClick="show">
      <NumberField source="id" label="ID" />
      <DateField source="created_at" label="Created" showTime />
      <NumberField source="patient_id" label="Patient ID" />
      <TextField source="appointment" label="Appointment" />
      <TextField source="comments" label="Comments" />
      <NumberField source="diagnosis_id" label="Diagnosis ID" />
      <ShowButton />
      <EditButton />
      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);

export const VisitCreate = () => (
  <Create transform={prepareVisitData} redirect="list">
    <SimpleForm>{visitInputs}</SimpleForm>
  </Create>
);

export const VisitEdit = () => (
  <Edit transform={prepareVisitData} redirect="list">
    <SimpleForm>{visitInputs}</SimpleForm>
  </Edit>
);

export const VisitShow = () => (
  <Show>
    <SimpleShowLayout>
      {/* Для show-экрана бери те же поля, что в таблице, чтобы пользователь легко сверял запись. */}
      <NumberField source="id" label="ID" />
      <DateField source="created_at" label="Created" showTime />
      <NumberField source="patient_id" label="Patient ID" />
      <TextField source="appointment" label="Appointment" />
      <TextField source="comments" label="Comments" />
      <NumberField source="diagnosis_id" label="Diagnosis ID" />
    </SimpleShowLayout>
  </Show>
);
