import { X } from "lucide-react";

const FormPreviewSidebar = ({ isOpen, onClose, form }) => {

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-2/3 bg-[#f3f3f3]
                shadow-2xl transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER (Sticky) */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#4169e1] text-white sticky top-0 z-10">
          <h2 className="font-medium text-sm">Question Preview</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="h-[calc(100vh-48px)] text-sm overflow-y-auto p-3 space-y-3">
          {!form ? (
            <p className="text-gray-500">No form selected</p>
          ) : (
            <>
              {/* Completed Date */}
              <div className="bg-white rounded-sm shadow-md/30 p-3 space-y-1">
                <p className="font-semibold">Completed Date</p>
                <p>{form.completedDate}</p>
              </div>

              {/* Form Info */}
              <div className="p-2 bg-[#d4e4ef] rounded-sm shadow-md/30 space-y-1">
                <p className="font-semibold">
                  <span className="font-bold">Form Title:</span>{" "}
                  {form.formTitle}
                </p>
                <p className="font-semibold">
                  <span className="font-bold">Description:</span>{" "}
                  {form.description}
                </p>
              </div>

              {/* Questions */}
              {form.answeredQuestions?.map((q, index) => (
                <div
                  key={q.id}
                  className="border border-gray-300 rounded bg-white shadow-md/30 flex items-start gap-4 p-2"
                >
                  <div className="w-30 font-semibold text-center bg-[#4169e1] text-white px-3 py-1 rounded">
                    Q : {index + 1}
                  </div>

                  <div className="w-full">
                    <p className="font-semibold pb-1.5">
                      {q.answerRequired && (
                        <span className="text-red-600 mr-1">*</span>
                      )}
                      {q.questionName}
                    </p>

                    <p className="pb-2 text-gray-700">
                      {q.description}
                    </p>

                    <p className="font-semibold pb-1.5">Answer</p>
                    <div className="flex items-center gap-2">
                      {q.answers.map((a, index) => (
                        <p key={index} className="text-gray-700">
                          {a}
                        </p>
                      ))}
                    </div>

                  </div>

                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FormPreviewSidebar;
