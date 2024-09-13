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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdAddTask } from "react-icons/md";

const AddTask = () => {
  const [formValues, setFormValues] = useState({
    task: "",
    isdone: false,
    allottedtime: new Date().toISOString(),
    completedtime: null, 
    description: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      task: formValues.task,
      isdone: formValues.isdone,
      allottedtime: formValues.allottedtime,
      completedtime: formValues.completedtime,
      description: formValues.description,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/tasks",
        data
      );
      console.log(response.data);
      alert("Task created successfully");
      setIsOpen(false);
      setFormValues({
        task: "",
        isdone: false,
        allottedtime: new Date().toISOString(),
        completedtime: null,
        description: "",
      });
    } catch (error) {
      console.error(
        "Error creating task:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "An error occurred while creating the task."
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-5">
          <div className="flex items-center text-1xl gap-1">
            <h1>Add Task</h1>
            <span><MdAddTask /></span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Task Details</DialogTitle>
          <DialogDescription>
            <div className="grid w-full px-2 items-center gap-1.5 max-h-[500px] overflow-scroll">
              <Label htmlFor="task" className="text-black">
                Task
              </Label>
              <Input
                className="text-black mb-2"
                type="text"
                id="task"
                name="task"
                value={formValues.task}
                onChange={handleChange}
              />

              <Label htmlFor="description" className="text-black">
                Description
              </Label>
              <Input
                className="text-black mb-2"
                type="text"
                id="description"
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />

              <Button onClick={handleSubmit} className="m-2">
                Add Task
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
