import { Users, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import SettingTable from "../components/tables/SettingTable";
import UserDetails from "../components/UserDetails";
import { getProfile, updateProfileImage } from "../api/user.api";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const Profile = () => {
    const fileInputRef = useRef(null);

    const [uploading, setUploading] = useState(false);

    const [activeTab, setActiveTab] = useState("details");

    const [profile, setProfile] = useState({});

    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const res = await getProfile();
            setProfile(res.data.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);

            const res = await updateProfileImage(formData);

            setProfile(prev => ({
                ...prev,
                ...res.data.data,
            }));

            toast.success(
                res?.data?.message || "Profile image updated successfully"
            );
        } catch (error) {
            console.error("Image upload failed", error);
            toast.error(
                error?.response?.data?.message || "Image upload failed"
            );
        } finally {
            setUploading(false);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };


    useEffect(() => {
        document.title = "Profile";
        fetchProfile();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="flex gap-6 p-6">

            <div className="w-2/7 pb-4 bg-white rounded-sm shadow-md/30 overflow-hidden">

                <div className="h-32 bg-gradient-to-r from-purple-800 to-purple-500" />

                <div className="relative -mt-18 flex flex-col items-center">
                    <img
                        src={profile.profilePicture}
                        alt="User"
                        className="h-38 w-38 rounded-sm border-2 border-white shadow"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleImageChange}
                    />

                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="absolute bottom-1 right-35 bg-white px-2 py-1 text-xs shadow rounded"
                    >
                        Edit
                    </button>

                    {uploading && (
                        <p className="text-xs text-gray-500 mt-1">
                            Uploading...
                        </p>
                    )}
                </div>

                <div className="text-center mt-2">
                    <h2 className="text-xl font-semibold">{profile.username}</h2>
                    <p className="text-sm text-gray-800">
                        Manager Of Corporate IT
                    </p>
                </div>

                <div className="border-t border-gray-300 my-4" />

                <div className="px-4 text-sm space-y-3">
                    <div className="border-b border-gray-300 pb-4">
                        <p className="font-medium">Email:</p>
                        <p>{profile.email}</p>
                    </div>

                    {profile.contactNo && (
                        <div className="border-b border-gray-300 pb-4">
                            <p className="font-medium">Contact No:</p>
                            <p>{profile.contactNo}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1">
                <div className="bg-[#e9edf3] rounded-t-md flex">
                    <button
                        onClick={() => setActiveTab("details")}
                        className={`flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-sm
                        ${activeTab === "details" ? "bg-gray-300 text-black" : "hover:bg-gray-300 hover:text-white"}`}
                    >
                        <Users size={16} />
                        User Details
                    </button>

                    <button
                        onClick={() => setActiveTab("settings")}
                        className={`flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-sm
                        ${activeTab === "settings" ? "bg-gray-300 text-black" : "hover:bg-gray-300 hover:text-white"}`}
                    >
                        <Settings size={16} />
                        Settings
                    </button>
                </div>

                <div className="bg-white rounded-b-md shadow-md px-4 py-2">
                    {activeTab === "details" && <UserDetails profile={profile} />}
                    {activeTab === "settings" && <SettingTable />}
                </div>
            </div>
        </div>
    );
};

export default Profile;
