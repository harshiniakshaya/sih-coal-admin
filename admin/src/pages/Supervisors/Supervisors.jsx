"use client";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/custom/Dialog/EditDialog";
import AddSupervisor from "@/components/custom/Dialog/AddSupervisor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Supervisors = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/all"
        );
        const data = response.data;
        const supervisorsData = data.filter((user) => user.role_id === 2);
        console.log(supervisorsData);
        setSupervisors(supervisorsData);
      } catch (error) {
        console.error("Error fetching supervisors data:", error.message);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterStatusChange = (status) => {
    setFilterStatus(status);
  };

  const filteredSupervisors = supervisors
    .filter((supervisor) =>
      Object.values(supervisor).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter(
      (supervisor) =>
        filterStatus === "All" || supervisor.status === filterStatus
    );

  return (
    <div className="ml-16 mt-16 text-black">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="text-black"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-transparent text-black border hover:bg-transparent font-normal">
                {filterStatus || "Filter by Status"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleFilterStatusChange("All")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleFilterStatusChange("Active")}
              >
                Active
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleFilterStatusChange("Inactive")}
              >
                Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="items-center mr-2 mt-5">
          <AddSupervisor />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">User ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone No. </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSupervisors.map((supervisor) => (
            <TableRow key={supervisor.id}>
              <TableCell className="font-medium">
                {supervisor.user_id}
              </TableCell>
              <TableCell>{supervisor.username}</TableCell>
              <TableCell>{supervisor.contact_number}</TableCell>
              <TableCell>{supervisor.email}</TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>{supervisor.status}</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() =>
                        handleFilterStatusChange(supervisor.id, "Active")
                      }
                    >
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleFilterStatusChange(supervisor.id, "Inactive")
                      }
                    >
                      Inactive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>
                <Modal
                  id={supervisor.user_id}
                  username={supervisor.username}
                  pwd={supervisor.password_hash}
                  email={supervisor.email}
                  contact={supervisor.contact_number}
                  status={supervisor.status}
                  role_id={2}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Supervisors;
