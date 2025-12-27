import { X, GripVertical } from "lucide-react";
import { useState } from "react";

import {
    DndContext,
    closestCenter,
} from "@dnd-kit/core";

import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

const initialQuestions = [
    { id: "03", text: "FS-TRI-OPS-03 : Fire Department Access" },
    { id: "04", text: "FS-TRI-OPS-04 : Fire Separations" },
    { id: "01", text: "FS-TRI-OPS-01 : Emergency Power Systems & Lighting" },
    { id: "02", text: "FS-TRI-OPS-02 : Fire Alarm & Voice Communication" },
    { id: "05", text: "FS-TRI-OPS-05 : Portable Extinguishers" },
];

function SortableItem({ item }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white cursor-grab hover:bg-gray-50"
        >
            <GripVertical size={16} className="text-gray-400" />
            <span className="text-sm">{item.text}</span>
        </div>
    );
}

const QuestionModal = ({ onClose }) => {
    const [questions, setQuestions] = useState(initialQuestions);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setQuestions((items) => {
            const oldIndex = items.findIndex(i => i.id === active.id);
            const newIndex = items.findIndex(i => i.id === over.id);

            const updated = [...items];
            const [moved] = updated.splice(oldIndex, 1);
            updated.splice(newIndex, 0, moved);
            return updated;
        });
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

            <div className="fixed top-1/2 left-1/2 z-50 w-2xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg">

                <div className="flex items-center justify-between bg-[#4169e1] text-white px-4 py-2 rounded-t-md">
                    <h3 className="font-semibold text-sm">Sort Form Question</h3>
                    <button onClick={onClose}>
                        <X size={16} />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto">
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={questions.map(q => q.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-2">
                                {questions.map((q) => (
                                    <SortableItem key={q.id} item={q} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>

                <div className="flex justify-end px-4 py-2 border-t border-gray-300">
                    <button onClick={onClose} className="flex items-center gap-2 bg-[#4169e1] text-white px-2 py-1 rounded-sm">
                        <X size={15} strokeWidth={4} />
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

export default QuestionModal;
