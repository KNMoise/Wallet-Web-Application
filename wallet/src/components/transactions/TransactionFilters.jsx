import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "../../components/ui/select";
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger,} from "../../components/ui/accordion";
import { Calendar } from "../../components/ui/calendar";
import {Popover,PopoverContent,PopoverTrigger,} from "../../components/ui/popover";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";

const TransactionFilters = ({ onFilter, accounts = [] }) => {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    type: "",
    category: "",
    account: "",
    minAmount: "",
    maxAmount: "",
    searchTerm: "",
  });

  const [isOpen, setIsOpen] = useState(true);

  const handleDateSelect = (field) => (date) => {
    setFilters((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name) => (value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    // Remove empty filters
    const activeFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value !== "" && value !== null) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    onFilter(activeFilters);
  };

  const handleReset = () => {
    setFilters({
      startDate: null,
      endDate: null,
      type: "",
      category: "",
      account: "",
      minAmount: "",
      maxAmount: "",
      searchTerm: "",
    });
    onFilter({});
  };

  const categories = [
    "Food & Dining",
    "Shopping",
    "Transportation",
    "Bills & Utilities",
    "Entertainment",
    "Healthcare",
    "Travel",
    "Other",
  ];

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="filters"
      className="w-full"
    >
      <AccordionItem value="filters">
        <AccordionTrigger className="text-lg font-semibold">
          Filters
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="searchTerm">Search</Label>
              <Input
                id="searchTerm"
                name="searchTerm"
                placeholder="Search transactions..."
                value={filters.searchTerm}
                onChange={handleInputChange}
              />
            </div>

            {/* Date Range */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.startDate ? (
                        format(filters.startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.startDate}
                      onSelect={handleDateSelect("startDate")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.endDate ? (
                        format(filters.endDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.endDate}
                      onSelect={handleDateSelect("endDate")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Type and Category */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Transaction Type</Label>
                <Select
                  value={filters.type}
                  onValueChange={handleSelectChange("type")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={filters.category}
                  onValueChange={handleSelectChange("category")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Amount Range */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="minAmount">Minimum Amount</Label>
                <Input
                  id="minAmount"
                  name="minAmount"
                  type="number"
                  step="0.01"
                  placeholder="Min amount"
                  value={filters.minAmount}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAmount">Maximum Amount</Label>
                <Input
                  id="maxAmount"
                  name="maxAmount"
                  type="number"
                  step="0.01"
                  placeholder="Max amount"
                  value={filters.maxAmount}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Account Selection */}
            <div className="space-y-2">
              <Label>Account</Label>
              <Select
                value={filters.account}
                onValueChange={handleSelectChange("account")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Accounts</SelectItem>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button onClick={handleFilter} className="flex-1">
                Apply Filters
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex items-center"
              >
                <X className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TransactionFilters;
