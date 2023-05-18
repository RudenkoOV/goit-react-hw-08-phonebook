import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import css from './ContactForm.module.css';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

const initialValues = {
  name: '',
  number: '',
};


let userSchema = object().shape({
  name: string().min(2).required(),
  number: string()
    .min(10, '10 number not with space: 067 954 310')
    .matches(
      /^((\(\d{3}\)?)|(\d{3}))?\d{3}\d{4}$/,
      '10 number not with space: 067 954 310'
    )
    .required(),
});

export function ContactForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = ({ name, number }, action) => {
   
    if (contacts.find(contact => contact.name === name) !== undefined) {
      Notiflix.Notify.failure(`${name} already in your contact book`);
      return;
    }

    dispatch(addContact({ name, number }));
    

    Notiflix.Notify.success(`You added ${name} to phonebook`);
 
    action.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={userSchema}
    >
      <Form autoComplete="off">
        <label className={css.labelBox}>
          <p>Name</p>
          <Field className={'input'} type="text" name="name" />
          <ErrorMessage component="p" className={css.nameError} name="name" />
        </label>

        <label className={css.labelBox}>
          <p>Phone</p>
          <Field type="tel" name="number" />
          <ErrorMessage component="p" className={css.nameError} name="number" />
        </label>

        <button type="submit">addContact</button>
      </Form>
    </Formik>
  );
}
