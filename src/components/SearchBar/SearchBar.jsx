import { Formik } from 'formik';
import { SearchBar, Button, Form, Input } from './SearchBar.styled';
import { BiSearch } from 'react-icons/bi';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = ({ query }, action) => {
    if (!query) {
      return alert('You need to input something here for a successful search.');
    }

    onSubmit(query);
    action.resetForm();
  };

  return (
    <SearchBar>
      <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
        <Form>
          <Button>
            <BiSearch />
          </Button>
          <Input
            name="query"
            type="text"
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </SearchBar>
  );
};
