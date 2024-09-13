"use client";
import { useState } from "react";
import axios from "axios";
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
import { BiSolidUserPlus } from "react-icons/bi";

const AddOperator = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    pwd: "",
    email: "",
    contact: "",
    status: "Active",
    role_id: 3,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDropdownChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
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
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/create",
        data
      );
      console.log(response.data);
      alert("Operator created successfully");
      setIsOpen(false);
      setFormValues({
        username: "",
        pwd: "",
        email: "",
        contact: "",
        status: "Active",
        role_id: 3,
      });
    } catch (error) {
      console.error(
        "Error creating operator:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "An error occurred while creating the operator."
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-5">
        <div className="flex items-center text-1xl gap-1">
            <h1>Add Operators</h1>
            <span><BiSolidUserPlus className=" text-[25px]"/></span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Operator Details</DialogTitle>
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
                <DropdownMenuTrigger asChild>
                  <Button className="w-full bg-transparent text-black border hover:bg-transparent font-normal">
                    {formValues.status}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleDropdownChange("status", "Active")}
                  >
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDropdownChange("status", "Inactive")}
                  >
                    Inactive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button onClick={handleSubmit} className="m-2">
                Add Operator
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddOperator;
