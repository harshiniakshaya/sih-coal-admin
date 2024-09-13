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
import EditDialog from "@/components/custom/Dialog/EditDialog"; // Renamed component if needed
import AddOperator from "@/components/custom/Dialog/AddOperator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Operators = () => {
  const [operators, setOperators] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/all"
        );
        const data = response.data;
        const operatorsData = data.filter((user) => user.role_id === 3);
        console.log(operatorsData);
        setOperators(operatorsData);
      } catch (error) {
        console.error("Error fetching operators data:", error.message);
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

  const filteredOperators = operators
    .filter((operator) =>
      Object.values(operator).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter(
      (operator) => filterStatus === "All" || operator.status === filterStatus
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
          <AddOperator />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">User ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOperators.map((operator) => (
            <TableRow key={operator.user_id}>
              <TableCell className="font-medium">{operator.user_id}</TableCell>
              <TableCell>{operator.username}</TableCell>
              <TableCell>{operator.contact_number}</TableCell>
              <TableCell>{operator.email}</TableCell>
              <TableCell>{operator.status}</TableCell>
              <TableCell>
                <EditDialog
                  id={operator.user_id}
                  username={operator.username}
                  pwd={operator.password_hash}
                  email={operator.email}
                  contact={operator.contact_number}
                  status={operator.status}
                  role_id={3}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Operators;
