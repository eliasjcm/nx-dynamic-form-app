type Field = {
  id: string;
  placeholder?: string;
  required?: boolean;
  type: string;
  name: string;
  options?: string[];
};

export type Fields = (Field[] | Field)[];

export const fields: Fields = [
  [
    {
      id: 'firstName',
      placeholder: 'First name',
      required: true,
      type: 'text',
      name: 'First name',
    },
    {
      id: 'lastName',
      placeholder: 'Last name',
      required: true,
      type: 'text',
      name: 'Last name',
    },
  ],
  {
    id: 'email',
    required: true,
    type: 'text',
    name: 'Email',
  },
  {
    id: 'address1',
    placeholder: 'Address 1',
    type: 'text',
    name: 'Address',
  },
  [
    {
      id: 'city',
      type: 'text',
      name: 'City',
    },
    {
      id: 'state',
      type: 'text',
      name: 'State',
    },
    {
      id: 'zip',
      type: 'text',
      name: 'Zip',
    },
  ],
  {
    id: 'phone',
    required: true,
    type: 'text',
    name: 'Phone',
  },
  {
    id: 'jobTitle',
    options: [
      'Engineer - lead',
      'Engineer - mid level',
      'Engineer - junior',
      'Engineer - front end focused',
      'Engineer - backend focused',
      'Engineer - full stack',
    ],
    placeholder: 'Please select job title',
    type: 'select',
    name: 'Job Title',
  },
  {
    id: 'reason',
    placeholder:
      'Describe why you are a good fit for the job you are applying for.',
    type: 'textarea',
    name: 'Reason',
  },
];

export const getFormIds = () => {
  const ids: string[] = [];
  fields.forEach((field) => {
    if (!Array.isArray(field)) {
      ids.push(field.id);
    } else {
      field.forEach((subField) => ids.push(subField.id));
    }
  });
  return ids;
};

export const getFormNames = () => {
  const names: string[] = [];
  fields.forEach((field) => {
    if (!Array.isArray(field)) {
      names.push(field.name);
    } else {
      field.forEach((subField) => names.push(subField.name));
    }
  });
  return names;
};

export const getPlainForm = () => {
  let plainForm: Field[] = [];
  fields.forEach((field) => {
    if (Array.isArray(field)) {
      plainForm = [...plainForm, ...field];
    } else {
      plainForm.push(field);
    }
  });

  return plainForm;
};
