import { Bell, Mail } from "lucide-react";
import { useState } from "react";


import ToggleButton from "../ToggleButton";

const forms = [
    {
        id: 1,
        title: "Form",
        description: "These are notifications for when admin generates Form or when a Form is completed."
    },
    {
        id: 2,
        title: "System Notification",
        description: "These are notifications for when Other system level trasanction generates."
    },
];

const SettingTable = () => {

    const [notificationSettings, setNotificationSettings] = useState({
        1: { push: true, email: true },
        2: { push: true, email: true },
    });

    const handleToggle = (id, type) => {
        setNotificationSettings(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [type]: !prev[id][type],
            },
        }));
    };

    return (
        <>
            <h3 className="text-[#4eb7eb] font-medium">
                Notifications Setting
            </h3>

            <div className="border-t border-gray-300 my-2" />

            <div className="overflow-x-auto pt-1.5 pb-4">
                <table className="w-full border-y border-gray-300 text-sm">
                    <thead className="bg-[#e9edf3] text-left">
                        <tr>
                            <th className="px-2 py-1 w-2xl">Description</th>
                            <th className="px-2 py-1">
                                <div className="flex items-center gap-2">
                                    <Bell size={18} /> Push
                                </div>
                            </th>
                            <th className="px-2 py-1">
                                <div className="flex items-center gap-2">
                                    <Mail size={18} /> Email
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {forms.map((form) => (
                            <tr key={form.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-y border-gray-300">
                                    <div className="space-y-1.5">
                                        <p className="font-medium">{form.title}</p>
                                        <p className="text-gray-700">{form.description}</p>
                                    </div>
                                </td>

                                <td className="px-4 py-2 border-y border-gray-300">
                                    <ToggleButton
                                        value={notificationSettings[form.id].push}
                                        onChange={() => handleToggle(form.id, "push")}
                                    />
                                </td>

                                <td className="px-4 py-2 border-y border-gray-300">
                                    <ToggleButton
                                        value={notificationSettings[form.id].email}
                                        onChange={() => handleToggle(form.id, "email")}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};


export default SettingTable
