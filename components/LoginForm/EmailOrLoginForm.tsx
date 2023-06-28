import React, {FC} from 'react';
import {useField} from "formik";


type Props = {
  name: string;
  label: string;
};
export const EmailOrLoginForm:FC<Props> = ({ name, label }) => {
  const [field, meta] = useField(name);

  return (
    <div>

    </div>
  );
};
