import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import FormTable from "../components/tables/FormTable";
import AddForm from "../components/forms/AddForm";
import { deleteForm, getForm } from "../api/form.api";
import Loader from "../components/Loader";

const CreateForm = () => {
  const [view, setView] = useState("table"); // 'table' | 'add'
  const [editingForm, setEditingForm] = useState(null);

  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1)
  let dataInTable = 5

  const [searchText, setSearchText] = useState("");

  const filteredForms = searchText
    ? formData.filter((form) =>
      form.formTitle?.toLowerCase().includes(searchText.toLowerCase())
    )
    : formData;

  const fetchForms = async () => {
    try {
      const res = await getForm();
      console.log(res)
      setFormData(res.data.data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditForm = (form) => {
    setEditingForm(form);
    setView("add");
  };

  const handleDeleteForm = async (formId) => {
    if (!formId) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this form?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await deleteForm(formId);

      toast.success(
        res?.data?.message || "Form deleted successfully"
      );

      const newTotalRecords = filteredForms.length - 1;
      const newTotalPages = Math.ceil(newTotalRecords / dataInTable);

      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages > 0 ? newTotalPages : 1);
      }
      fetchForms()
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete form"
      );
      console.error("Error deleting form:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    document.title = "Form Management | CFMS";

    fetchForms();
  }, []);

  if (loading) {
    return <Loader />
  }

  const lastDataIndex = currentPage * dataInTable;
  const firstDataIndex = lastDataIndex - dataInTable;

  const currentData = filteredForms.slice(firstDataIndex, lastDataIndex);

  const totalPages = Math.ceil(filteredForms.length / dataInTable);
  const totalRecords = filteredForms.length;

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  return (
    <div>
      {view === "table" && (
        <FormTable
          onAddForm={() => {
            setEditingForm(null);
            setView("add");
          }}
          onEditForm={handleEditForm}
          onDeleteForm={handleDeleteForm}
          data={currentData}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={dataInTable}
          onPageChange={setCurrentPage}
          totalRecords={totalRecords}
          onSearch={handleSearch}
        />
      )}

      {view === "add" && (
        <AddForm
          editData={editingForm}
          onBack={() => {
            setEditingForm(null);
            setView("table");
          }}
          onSuccess={() => {
            fetchForms();
            setEditingForm(null);
            setView("table");
          }}
        />
      )}

    </div>
  );
};

export default CreateForm;
