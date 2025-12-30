import { useEffect, useState } from 'react';


import CompletedFormTable from '../components/tables/CompletedFormTable'
import { getCompletedForm } from '../api/form.api';
import Loader from '../components/Loader';

const CompletedForm = () => {

  const [formData, setFormData] = useState([]);
  
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1)
  let dataInTable = 5

  const [searchText, setSearchText] = useState("");

  const filteredForms = formData.filter((form) =>
    form.formTitle?.toLowerCase().includes(searchText.toLowerCase()) ||
    form.formId?.toString().includes(searchText) ||
    form.completedDate?.toLowerCase().includes(searchText.toLowerCase())
  );


  const fetchCompletedForms = async () => {
    try {
      const res = await getCompletedForm();
      setFormData(res.data.data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Completed Forms";

    fetchCompletedForms();
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
      <CompletedFormTable
        data={currentData}
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
        pageSize={dataInTable}
        onPageChange={setCurrentPage}
        onSearch={handleSearch}
      />
    </div>
  )
}

export default CompletedForm
