import { useEffect, useState } from "react";


import UsersTable from "../components/tables/UsersTable"
import UserSearchCriteria from "../components/search-criteria/UserSearchCriteria"
import AddUser from "../components/forms/AddUser"
import Loader from "../components/Loader";
import { deleteUser, getFilterUsers, getUser } from "../api/user.api";

const User = () => {
    const [view, setView] = useState("table");
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [editingUser, setEditingUser] = useState(null);

    const [currentPage, setCurrentPage] = useState(1)
    let dataInTable = 5

    const [searchText, setSearchText] = useState("");

    const filteredUsers = userData.filter((user) =>
        user.username?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.contactNo?.toString().includes(searchText) ||
        user.role?.toLowerCase().includes(searchText.toLowerCase())
    );

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await getUser();
            setUserData(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Users";
        fetchUsers();
    }, []);

    const fetchFilterUsers = async (criteria = {}) => {
        setLoading(true);
        try {
            const res = await getFilterUsers(criteria);
            setUserData(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setView("add");
    };

    const handleDeleteUser = async (userId) => {
        if (!userId) return;

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );
        if (!confirmDelete) return;

        try {
            setLoading(true);
            await deleteUser(userId);
            fetchUsers()
        } catch (error) {
            console.error("Error deleting user:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (criteria) => {
        fetchFilterUsers(criteria);
    };

    const handleReset = () => {
        fetchUsers();
    };

    { loading && <Loader /> }

    const lastDataIndex = currentPage * dataInTable;
    const firstDataIndex = lastDataIndex - dataInTable;
    const currentData = filteredUsers.slice(firstDataIndex, lastDataIndex);

    const totalPages = Math.ceil(filteredUsers.length / dataInTable);
    const totalRecords = filteredUsers.length;

    const handleTextSearch = (value) => {
        setSearchText(value);
        setCurrentPage(1);
    };

    return (
        <div>
            {view === "table" && (
                <>
                    <UserSearchCriteria
                        onSearch={handleSearch}
                        onReset={handleReset}
                    />
                    <UsersTable
                        onAddForm={() => {
                            setEditingUser(null);
                            setView("add");
                        }}
                        onEditUser={handleEditUser}
                        onDeleteUser={handleDeleteUser}
                        data={currentData}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalRecords={totalRecords}
                        pageSize={dataInTable}
                        onPageChange={setCurrentPage}
                        onSearch={handleTextSearch}
                    />
                </>
            )}

            {view === "add" && (
                <AddUser
                    editData={editingUser}
                    onBack={() => {
                        setEditingUser(null);
                        setView("table");
                        fetchUsers();
                    }}
                />
            )}

        </div>
    );
};


export default User
