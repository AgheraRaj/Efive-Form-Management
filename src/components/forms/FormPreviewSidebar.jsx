import { X } from "lucide-react";

const FormPreviewSidebar = ({ isOpen, onClose, form }) => {

  const getDisplayAnswer = (answers) => {
    if (!Array.isArray(answers) || answers.length === 0) return null;
    return answers.join(", ");
  };

  return (
    <>
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

        <div className="flex items-center justify-between px-4 py-2 bg-[#4169e1] text-white sticky top-0 z-10">
          <h2 className="font-medium text-sm">Question Preview</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="h-[calc(100vh-48px)] text-sm overflow-y-auto p-3 space-y-3">
          {!form ? (
            <p className="text-gray-500">No form selected</p>
          ) : (
            <>
              <div className="bg-white rounded-sm shadow-md/30 p-3">
                <p className="font-semibold">Completed Date</p>
                <p>{form.completedDate}</p>
              </div>

              <div className="p-2 bg-[#d4e4ef] rounded-sm shadow-md/30">
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
              {form.answeredQuestions?.map((q, index) => {
                const displayAnswer = getDisplayAnswer(q.answers);

                return (
                  <div
                    key={q.id}
                    className="border border-gray-300 rounded bg-white shadow-md/30 flex items-start gap-4 p-2"
                  >
                    <div className="w-35 font-semibold text-center bg-[#4169e1] text-white px-3 py-1 rounded">
                      Q : {index + 1}
                    </div>

                    <div className="w-full">
                      <p className="font-semibold pb-1">
                        {q.answerRequired && (
                          <span className="text-red-600 mr-1">*</span>
                        )}
                        {q.questionName}
                      </p>

                      {q.description && (
                        <p className="pb-2 text-gray-700">
                          {q.description}
                        </p>
                      )}

                      {/* answer  */}
                      {displayAnswer && (
                        <>
                          <p className="font-semibold pb-1">Answer</p>
                          <p className="text-gray-700">
                            {displayAnswer}
                          </p>
                        </>
                      )}

                    </div>

                  </div>);
              })}
            </>
          )}
        </div>
      </div>
    </>);
};

export default FormPreviewSidebar;
