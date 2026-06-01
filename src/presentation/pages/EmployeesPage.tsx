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
    <section className="w-full h-[85vh] bg-white rounded-3xl border shadow-sm overflow-hidden flex">
      <div className="w-[380px] lg:w-[450px] border-r overflow-y-auto">
        <div className="p-5 border-b">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 mb-4 text-sm font-medium text-gray-600 hover:text-black transition"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to shop
          </Link>

          <h1 className="text-2xl font-bold">Contacts</h1>

          <p className="text-sm text-gray-500">Start a conversation</p>
        </div>

        {employees.map((employee) => (
          <button
            key={employee.id}
            onClick={() => setSelectedEmployee(employee.id)}
            className={`w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition ${
              selectedEmployee === employee.id ? 'bg-gray-100' : ''
            }`}
          >
            <img
              src={employee.image}
              alt={employee.firstName}
              className="w-14 h-14 rounded-full object-cover"
            />

            <div>
              <h2 className="font-semibold">
                {employee.firstName} {employee.lastName}
              </h2>

              <p className="text-sm text-gray-500">{employee.email}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        {activeEmployee ? (
          <>
            <div className="border-b p-5 flex items-center gap-4">
              <img
                src={activeEmployee.image}
                alt={activeEmployee.firstName}
                className="w-12 h-12 rounded-full"
              />

              <div>
                <h2 className="font-semibold text-lg">
                  {activeEmployee.firstName} {activeEmployee.lastName}
                </h2>

                <p className="text-sm text-gray-500">{activeEmployee.email}</p>
              </div>
            </div>

            <div className="flex-1 p-5 overflow-y-auto bg-gray-50 space-y-3">
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
                      className={`max-w-xs px-4 py-3 rounded-2xl ${
                        msg.sender === 'me'
                          ? 'bg-black text-white'
                          : 'bg-white border'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t p-4 flex gap-3">
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
                className="flex-1 border rounded-2xl px-4 py-3 outline-none"
              />

              <button
                onClick={sendMessage}
                className="bg-black text-white px-6 rounded-2xl"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </section>
  );
}
