import { Save, X } from "lucide-react";
import { useForm } from "react-hook-form";


import { useModal } from "../../hooks/ModalContext";
import { changePasswordApi } from "../../api/user.api";

const ChangePasswordModal = () => {
    const { closeChangePassword } = useModal();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const newPassword = watch("newPassword");

    const onSubmit = async (data) => {
        const payload = {
            oldPassword: data.currentPassword,
            newPassword,
            confirmPassword: data.confirmPassword
        }
        
        await changePasswordApi(payload)

        closeChangePassword();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-sm rounded-md">

                <div className="flex items-center justify-between bg-[#4169e1] text-white px-4 py-2 rounded-t-md">
                    <h3 className="font-semibold text-sm">Change Password</h3>
                    <button onClick={closeChangePassword}>
                        <X size={16} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-2 space-y-3">

                    <div className="flex flex-col space-y-2">
                        <label className="font-medium">Current</label>
                        <input
                            type="password"
                            className="border border-gray-300 rounded px-3 py-0.5"
                            {...register("currentPassword", {
                                required: "Current password is required",
                            })}
                        />
                        {errors.currentPassword && (
                            <p className="text-red-500 text-xs">
                                {errors.currentPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="font-medium">New</label>
                        <input
                            type="password"
                            className="border border-gray-300 rounded px-3 py-0.5"
                            {...register("newPassword", {
                                required: "New password is required"
                            })}
                        />
                        {errors.newPassword && (
                            <p className="text-red-500 text-xs">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="font-medium">Re-type New</label>
                        <input
                            type="password"
                            className="border border-gray-300 rounded px-3 py-0.5"
                            {...register("confirmPassword", {
                                required: "Please re-type new password",
                                validate: (value) =>
                                    value === newPassword || "Passwords do not match",
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="border-t border-gray-300 mt-4" />

                    <div className="flex justify-end gap-2 pb-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 bg-[#4169e1] text-white px-3 py-1.5 rounded-sm text-sm disabled:opacity-60"
                        >
                            <Save size={14} />
                            Save Changes
                        </button>

                        <button
                            type="button"
                            onClick={closeChangePassword}
                            className="flex items-center gap-2 bg-[#4169e1] text-white px-2 py-1 rounded-sm"
                        >
                            <X size={15} />
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
