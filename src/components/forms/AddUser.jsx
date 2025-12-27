import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RotateCcw, Save, Trash2, Upload, X } from "lucide-react";


import userImage from "../../assets/users/default_user.png";
import { createUser, updateUser } from "../../api/user.api";

const AddUser = ({ onBack, editData }) => {

    const isEditMode = Boolean(editData);

    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            contactNo: "",
            gender: "",
            validFrom: "",
            validTo: "",
            role: "",
        },
    });

    useEffect(() => {
        if (!editData) return;

        reset({
            firstName: editData.firstname,
            lastName: editData.lastname,
            email: editData.email,
            contactNo: editData.contactNo,
            gender: editData.gender,
            validFrom: editData.validFrom,
            validTo: editData.validTo,
            role: editData.role,
        });

        if (editData.profilePicture) {
            setImagePreview(editData.profilePicture);
        }
    }, [editData, reset]);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append(
            "user",
            new Blob(
                [JSON.stringify({
                    firstname: data.firstName,
                    lastname: data.lastName,
                    email: data.email,
                    contactNo: data.contactNo,
                    gender: data.gender,
                    validFrom: data.validFrom,
                    validTo: data.validTo,
                    role: data.role,
                })],
                { type: "application/json" }
            )
        );

        if (imageFile) {
            formData.append("file", imageFile);
        }

        if (isEditMode) {
            await updateUser(editData.id, formData);
        } else {
            await createUser(formData);
        }

        reset();
        setImagePreview(null);
        setImageFile(null);
        onBack();
    };


    return (
        <div className="bg-white border border-gray-300 rounded-md shadow-md my-4 mx-8">

            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
                <h2 className="font-semibold">
                    {isEditMode ? "Edit User" : "Add Users"}
                </h2>


                <button
                    onClick={onBack}
                    type="button"
                    className="flex items-center gap-2 bg-[#4169e1] text-white px-3 py-1 rounded-sm"
                >
                    <RotateCcw size={18} />
                    Move Back
                </button>
            </div>

            <div className="flex space-x-10 pl-8 py-4">
                <div className="flex items-center flex-col space-y-3">
                    <div className="border-2 border-gray-400 rounded-xl shadow-md/30">
                        <img
                            src={imagePreview || userImage}
                            alt="User"
                            className="h-40 w-40 object-cover"
                        />
                    </div>

                    <div className="flex justify-center gap-2">
                        <label className="flex items-center gap-2 bg-[#4169e1] text-white px-3 py-1 rounded-sm cursor-pointer">
                            <Upload size={18} />
                            Upload
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                        </label>

                        {imagePreview && (
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-sm"
                            >
                                <Trash2 size={18} />
                                Remove
                            </button>
                        )}
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex-1 space-y-4 pb-2 text-sm"
                >
                    <div>
                        <h3 className="text-[#4eb7eb] font-medium">Basic Details</h3>
                        <div className="border-t border-gray-300 mt-2" />
                    </div>

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4">
                            <label className="block mb-1 font-medium">
                                First Name <span className="text-red-600">*</span>
                            </label>
                            <input
                                {...register("firstName", { required: "First name is required" })}
                                className="w-full px-3 py-1 border border-gray-300 rounded"
                            />
                            {errors.firstName && (
                                <p className="text-red-600 text-xs mt-1">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>

                        <div className="col-span-4">
                            <label className="block mb-1 font-medium">
                                Last Name <span className="text-red-600">*</span>
                            </label>
                            <input
                                {...register("lastName", { required: "Last name is required" })}
                                className="w-full px-3 py-1 border border-gray-300 rounded"
                            />
                            {errors.lastName && (
                                <p className="text-red-600 text-xs mt-1">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-5">
                            <label className="block mb-1 font-medium">
                                Email <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email",
                                    },
                                })}
                                className="w-full px-3 py-1 border border-gray-300 rounded"
                            />
                            {errors.email && (
                                <p className="text-red-600 text-xs mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="col-span-3">
                            <label className="block mb-1 font-medium">
                                Contact No. <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="tel"
                                {...register("contactNo", {
                                    required: "Contact number is required",
                                })}
                                className="w-full px-3 py-1 border border-gray-300 rounded"
                            />
                            {errors.contactNo && (
                                <p className="text-red-600 text-xs mt-1">
                                    {errors.contactNo.message}
                                </p>
                            )}
                        </div>

                        <div className="col-span-3">
                            <label className="block mb-1 font-medium">
                                Gender <span className="text-red-600">*</span>
                            </label>
                            <select
                                {...register("gender", { required: "Gender is required" })}
                                className="w-full px-3 py-1 border border-gray-300 rounded"
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.gender && (
                                <p className="text-red-600 text-xs mt-1">
                                    {errors.gender.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-2">
                            <label className="block mb-1 font-medium">Valid From</label>
                            <input
                                type="date"
                                {...register("validFrom")}
                                className="w-full px-3 py-1 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block mb-1 font-medium">Valid To</label>
                            <input
                                type="date"
                                {...register("validTo")}
                                className="w-full px-3 py-1 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="col-span-3">
                            <label className="block mb-1 font-medium">
                                Role <span className="text-red-600">*</span>
                            </label>
                            <select
                                {...register("role", { required: "Role is required" })}
                                className="w-full px-3 py-1 border border-gray-300 rounded"
                            >
                                <option value="">Select</option>
                                <option value="ADMIN">Admin</option>
                                <option value="CLIENT">User</option>
                            </select>
                            {errors.role && (
                                <p className="text-red-600 text-xs mt-1">
                                    {errors.role.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-gray-300" />

                    <div className="flex justify-center gap-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 bg-[#4169e1] text-white px-3 py-1 rounded-sm"
                        >
                            <Save size={18} />
                            {isEditMode ? "Update" : "Save"}
                        </button>

                        <button
                            type="button"
                            onClick={onBack}
                            className="flex items-center gap-1 bg-[#4169e1] text-white px-3 py-1 rounded-sm"
                        >
                            <X size={18} />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
