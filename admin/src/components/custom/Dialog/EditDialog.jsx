import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Modal = ({ id, username, pwd, email, contact, status, role_id }) => {
  const [formValues, setFormValues] = useState({
    id,
    username,
    pwd,
    email,
    contact,
    status,
    role_id,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleStatusChange = (newStatus) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      status: newStatus,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: formValues.username,
      password: formValues.pwd,
      email: formValues.email,
      contact_number: formValues.contact,
      status: formValues.status,
      role_id: formValues.role_id,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/create", data);
      console.log(response.data);
      alert("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
      alert(error.response?.data?.message || "An error occurred while creating the user.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">
            Edit {formValues.role_id === 2 ? "Supervisor" : "Operator"} Details
          </DialogTitle>
          <DialogDescription>
            <div className="grid w-full px-2 items-center gap-1.5 max-h-[500px] overflow-scroll">
              <Label htmlFor="username" className="text-black">
                Username
              </Label>
              <Input
                className="text-black mb-2"
                type="text"
                id="username"
                name="username"
                value={formValues.username}
                onChange={handleChange}
              />

              <Label htmlFor="pwd" className="text-black">
                Password
              </Label>
              <Input
                className="text-black mb-2"
                type="password"
                id="pwd"
                name="pwd"
                value={formValues.pwd}
                onChange={handleChange}
              />

              <Label htmlFor="email" className="text-black">
                Email
              </Label>
              <Input
                className="text-black mb-2"
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />

              <Label htmlFor="contact" className="text-black">
                Contact Number
              </Label>
              <Input
                className="text-black mb-2"
                type="text"
                id="contact"
                name="contact"
                value={formValues.contact}
                onChange={handleChange}
              />

              <Label htmlFor="status" className="text-black">
                Status
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-black mb-2 border py-2 rounded">
                  {formValues.status}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleStatusChange('Active')}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange('Inactive')}>
                    Inactive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button onClick={handleSubmit}>Save</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
