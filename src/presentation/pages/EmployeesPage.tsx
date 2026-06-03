import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
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

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chatContainerRef.current) return;

    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [currentMessages]);

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
    <>
      <Link
        to="/home"
        className="
          flex
          gap-2
          text-gray-700
          hover:text-black
          transition
          mb-6
          self-start
        "
      >
        <ArrowLeft size={20} />
        Back To Shop
      </Link>

      <section
        className="
          w-full
          max-w-4xl
          h-[70vh]
          mx-auto
          mt-6
          bg-white
          rounded-3xl
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
            md:w-[280px]
            lg:w-[320px]
            border-b
            md:border-b-0
            md:border-r
            max-h-[210px]
            md:max-h-none
            overflow-y-auto
            bg-white
          "
        >
          <div className="p-3 border-b">
            <h1 className="text-lg font-bold">Contacts</h1>

            <p className="text-xs text-gray-500">Start a conversation</p>
          </div>

          <div className="grid grid-cols-1">
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
                  px-3
                  py-2.5
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
                    w-9
                    h-9
                    rounded-full
                    object-cover
                    shrink-0
                  "
                />

                <div className="min-w-0">
                  <h2 className="font-semibold text-sm truncate">
                    {employee.firstName} {employee.lastName}
                  </h2>

                  <p className="text-xs text-gray-500 truncate">
                    {employee.email}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          {activeEmployee ? (
            <>
              <div className="border-b px-3 py-2.5 flex items-center gap-3">
                <img
                  src={activeEmployee.image}
                  alt={activeEmployee.firstName}
                  className="
                    w-9
                    h-9
                    rounded-full
                    object-cover
                    shrink-0
                  "
                />

                <div className="min-w-0">
                  <h2 className="font-semibold text-sm truncate">
                    {activeEmployee.firstName} {activeEmployee.lastName}
                  </h2>

                  <p className="text-xs text-gray-500 truncate">
                    {activeEmployee.email}
                  </p>
                </div>
              </div>

              <div
                ref={chatContainerRef}
                className="
                  flex-1
                  px-3
                  py-3
                  overflow-y-auto
                  bg-gray-50
                  space-y-2
                "
              >
                {currentMessages.length === 0 ? (
                  <p className="text-gray-400 text-center mt-16 text-sm">
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
                            max-w-[75%]
                            px-3
                            py-2
                            rounded-2xl
                            text-sm
                            leading-relaxed
                            break-words
                            ${
                              msg.sender === 'me'
                                ? 'bg-black text-white rounded-br-md'
                                : 'bg-white border rounded-bl-md'
                            }
                          `}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t p-2.5 flex gap-2 bg-white">
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
                    rounded-full
                    px-4
                    py-2.5
                    outline-none
                    text-sm
                    min-w-0
                  "
                />

                <button
                  type="button"
                  onClick={sendMessage}
                  className="
                    bg-black
                    text-white
                    px-4
                    py-2.5
                    rounded-full
                    text-sm
                    hover:opacity-90
                    transition
                    shrink-0
                  "
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-center px-4 text-sm">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </section>
    </>
  );
}
