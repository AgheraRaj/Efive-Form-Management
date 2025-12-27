
import { useEffect, useState } from "react";


import FillFormSearchCriteria from "../components/search-criteria/FillFormSearchCriteria";
import FormFill from "../components/forms/FormFill";
import Loader from "../components/Loader";
import { getFormById, getOption } from "../api/form.api";

const FillForm = () => {

  const [formTitle, setFormTitle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState(null);

  const fetchFormTitles = async () => {
    try {
      const res = await getOption();
      setFormTitle(res.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Fill Form";

    fetchFormTitles();
  }, []);

  const handleSearch = async (formId) => {
    if (!formId) return;

    const res = await getFormById(formId);
    setSelectedForm(res.data);
    console.log(selectedForm);
  };


  if (loading) {
    return <Loader />
  }
  const handleFormSubmitted = () => {
    fetchFormTitles();
    setSelectedForm(null); 
  };

  const onClose = () => {
    setSelectedForm(null);
    }

  return (
    <div>
      <FillFormSearchCriteria
        formTitle={formTitle}
        onSearch={handleSearch}
      />

      {selectedForm && <FormFill selectedForm={selectedForm} onSubmitted={handleFormSubmitted} onClose={onClose} />}
    </div>
  );
};

export default FillForm;
