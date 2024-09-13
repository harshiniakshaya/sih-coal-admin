"use client";

import { useState } from "react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import payrollData from "../Payroll/payroll.json";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Payroll = () => {
  const [payrolls, setPayrolls] = useState(payrollData.payrolls);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("hours_worked");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (newSortKey) => {
    setSortKey(newSortKey);
  };

  const handleFilterStatusChange = (status) => {
    setFilterStatus(status);
  };

  const handleStatusChange = (payrollId, status) => {
    setPayrolls((prevPayrolls) =>
      prevPayrolls.map((payroll) =>
        payroll.payrollId === payrollId ? { ...payroll, status } : payroll
      )
    );
  };

  const filteredPayrolls = payrolls
    .filter((payroll) =>
      Object.values(payroll).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter(
      (payroll) => filterStatus === "All" || payroll.status === filterStatus
    )
    // .sort((a, b) => {
    //   if (typeof a[sortKey] === "number" && typeof b[sortKey] === "number") {
    //     return b[sortKey] - a[sortKey];
    //   }
    //   return a[sortKey].localeCompare(b[sortKey]);
    // });

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
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleFilterStatusChange("All")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleFilterStatusChange("Paid")}
              >
                Paid
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleFilterStatusChange("Unpaid")}
              >
                Unpaid
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-transparent text-black border hover:bg-transparent font-normal">
                Sort by {sortKey.replace("_", " ").toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleSortChange("hours_worked")}
              >
                Hours Worked
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("salary")}>
                Salary
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange("overtime_hours")}
              >
                Overtime Hours
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Payroll ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Shift ID</TableHead>
            <TableHead>Hours Worked</TableHead>
            <TableHead>Overtime Hours</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayrolls.map((payroll) => (
            <TableRow key={payroll.payrollId}>
              <TableCell className="font-medium">{payroll.payrollId}</TableCell>
              <TableCell>{payroll.userId}</TableCell>
              <TableCell>{payroll.shiftId}</TableCell>
              <TableCell>{payroll.hoursWorked}</TableCell>
              <TableCell>{payroll.overtimeHours}</TableCell>
              <TableCell>{payroll.salary}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className={`${
                        payroll.status === "Paid"
                          ? "bg-green-600 text-white w-[100px]"
                          : payroll.status === "Unpaid"
                          ? "bg-red-600 text-white w-[100px]"
                          : "bg-yellow-400 text-black w-[100px] hover:text-white"
                      }`}
                    >
                      {payroll.status || "In Progress"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() =>
                        handleStatusChange(payroll.payrollId, "Paid")
                      }
                    >
                      Paid
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleStatusChange(payroll.payrollId, "Unpaid")
                      }
                    >
                      Unpaid
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Payroll;
