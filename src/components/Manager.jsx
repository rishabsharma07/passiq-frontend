import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { FaCopy } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("https://passiq.onrender.com/");
    let passwords = await req.json();
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      await fetch("https://passiq.onrender.com/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      const newEntry = { ...form, id: uuidv4() };
      setPasswordArray([...passwordArray, newEntry]);
      await fetch("https://passiq.onrender.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      setform({ site: "", username: "", password: "" });
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: Password not saved!");
    }
  };

  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      await fetch("https://passiq.onrender.com/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    setform({ ...passwordArray.find((i) => i.id === id), id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-gray-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-3 md:mycontainer min-h-[79.3vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-indigo-600">&lt;</span>
          <span>Pass</span>
          <span className="text-indigo-600">IQ/&gt;</span>
        </h1>
        <p className="text-gray-700 text-lg text-center">
          The only Password Manager you need
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-indigo-300 w-full p-4 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-indigo-300 w-full p-4 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-indigo-300 w-full p-4 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full px-8 py-2 w-fit border border-indigo-800"
          >
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-indigo-700 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <div
                          className="flex p-2 items-center size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <FaCopy />
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center">
                        <span>{item.username}</span>
                        <div
                          className="flex p-2 items-center size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <FaCopy />
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center">
                        <span>{"*".repeat(item.password.length)}</span>
                        <div
                          className="flex p-2 size-7 cursor-pointer items-center"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <FaCopy />
                        </div>
                      </div>
                    </td>
                    <td className="flex justify-center py-2 border border-white text-center">
                      <span
                        className="cursor-pointer mx-1 size-7"
                        onClick={() => {
                          editPassword(item.id);
                        }}
                      >
                        <CiEdit />
                      </span>
                      <span
                        className="cursor-pointer mx-1 size-7"
                        onClick={() => {
                          deletePassword(item.id);
                        }}
                      >
                        <MdDelete />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
