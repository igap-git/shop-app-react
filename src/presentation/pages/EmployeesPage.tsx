import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useEmployees } from '@hooks/useEmployees';
import { useEmployeeChat } from '@hooks/useEmployeeChat';

export function EmployeesPage() {
  const { data: employees = [], isLoading, error } = useEmployees();

  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);

  const activeEmployee = employees.find(
    (employee) => employee.id === selectedEmployee
  );

  const { message, setMessage, sendMessage, currentMessages } =
    useEmployeeChat(selectedEmployee);

  if (isLoading) {
    return <div className="text-center py-10">Loading employees...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load employees
      </div>
    );
  }

  return (
    <section
      className="
        w-full
        min-h-[85vh]
        bg-white
        rounded-2xl
        sm:rounded-3xl
        border
        shadow-sm
        overflow-hidden
        flex
        flex-col
        lg:flex-row
      "
    >
      <div
        className="
          w-full
          lg:w-[380px]
          xl:w-[450px]
          border-b
          lg:border-b-0
          lg:border-r
          max-h-[320px]
          lg:max-h-none
          overflow-y-auto
        "
      >
        <div className="p-4 sm:p-5 border-b">
          <Link
            to="/home"
            className="
              inline-flex
              items-center
              gap-2
              mb-4
              text-sm
              font-medium
              text-gray-600
              hover:text-black
              transition
            "
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to shop
          </Link>

          <h1 className="text-xl sm:text-2xl font-bold">Contacts</h1>

          <p className="text-sm text-gray-500">Start a conversation</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
          {employees.map((employee) => (
            <button
              key={employee.id}
              type="button"
              onClick={() => setSelectedEmployee(employee.id)}
              className={`
                w-full
                flex
                items-center
                gap-3
                sm:gap-4
                p-3
                sm:p-4
                text-left
                hover:bg-gray-50
                transition
                min-w-0
                ${selectedEmployee === employee.id ? 'bg-gray-100' : ''}
              `}
            >
              <img
                src={employee.image}
                alt={employee.firstName}
                className="
                  w-11 h-11
                  sm:w-14 sm:h-14
                  rounded-full
                  object-cover
                  shrink-0
                "
              />

              <div className="min-w-0">
                <h2 className="font-semibold text-sm sm:text-base truncate">
                  {employee.firstName} {employee.lastName}
                </h2>

                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {employee.email}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-[520px]">
        {activeEmployee ? (
          <>
            <div className="border-b p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
              <img
                src={activeEmployee.image}
                alt={activeEmployee.firstName}
                className="
                  w-10 h-10
                  sm:w-12 sm:h-12
                  rounded-full
                  object-cover
                  shrink-0
                "
              />

              <div className="min-w-0">
                <h2 className="font-semibold text-base sm:text-lg truncate">
                  {activeEmployee.firstName} {activeEmployee.lastName}
                </h2>

                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {activeEmployee.email}
                </p>
              </div>
            </div>

            <div className="flex-1 p-4 sm:p-5 overflow-y-auto bg-gray-50 space-y-3">
              {currentMessages.length === 0 ? (
                <p className="text-gray-400 text-center mt-20">
                  No messages yet
                </p>
              ) : (
                currentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === 'me' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`
                        max-w-[80%]
                        sm:max-w-xs
                        px-4
                        py-3
                        rounded-2xl
                        text-sm
                        sm:text-base
                        break-words
                        ${
                          msg.sender === 'me'
                            ? 'bg-black text-white'
                            : 'bg-white border'
                        }
                      `}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t p-3 sm:p-4 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage();
                  }
                }}
                placeholder="Write a message..."
                className="
                  flex-1
                  border
                  rounded-2xl
                  px-4
                  py-3
                  outline-none
                  text-sm
                  sm:text-base
                  min-w-0
                "
              />

              <button
                type="button"
                onClick={sendMessage}
                className="
                  bg-black
                  text-white
                  px-6
                  py-3
                  rounded-2xl
                  text-sm
                  sm:text-base
                  hover:opacity-90
                  transition
                "
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-center px-4">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </section>
  );
}
