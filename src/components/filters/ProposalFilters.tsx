
import { useState } from "react";
import { Calendar, DollarSign, Clock, Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const ProposalFilters = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    dateRange: "",
    budgetRange: "",
    jobType: "",
    skills: [] as string[],
    clientRating: ""
  });

  const dateRanges = [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 3 months", value: "3m" },
    { label: "All time", value: "all" }
  ];

  const budgetRanges = [
    { label: "Under $500", value: "0-500" },
    { label: "$500 - $1,000", value: "500-1000" },
    { label: "$1,000 - $5,000", value: "1000-5000" },
    { label: "$5,000+", value: "5000+" }
  ];

  const jobTypes = [
    { label: "Fixed Price", value: "fixed" },
    { label: "Hourly", value: "hourly" }
  ];

  const popularSkills = [
    "React", "Node.js", "Python", "JavaScript", "UI/UX Design", 
    "WordPress", "PHP", "Angular", "Vue.js", "Mobile Development"
  ];

  const clientRatings = [
    { label: "4.8+ stars", value: "4.8" },
    { label: "4.5+ stars", value: "4.5" },
    { label: "4.0+ stars", value: "4.0" },
    { label: "Any rating", value: "any" }
  ];

  const handleSkillToggle = (skill: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      dateRange: "",
      budgetRange: "",
      jobType: "",
      skills: [],
      clientRating: ""
    });
  };

  const hasActiveFilters = Object.values(selectedFilters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ""
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Proposals
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Range */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </h4>
          <div className="flex flex-wrap gap-2">
            {dateRanges.map((range) => (
              <Button
                key={range.value}
                variant={selectedFilters.dateRange === range.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilters(prev => ({ ...prev, dateRange: range.value }))}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Budget Range */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Budget Range
          </h4>
          <div className="flex flex-wrap gap-2">
            {budgetRanges.map((range) => (
              <Button
                key={range.value}
                variant={selectedFilters.budgetRange === range.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilters(prev => ({ ...prev, budgetRange: range.value }))}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Job Type */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Job Type
          </h4>
          <div className="flex flex-wrap gap-2">
            {jobTypes.map((type) => (
              <Button
                key={type.value}
                variant={selectedFilters.jobType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilters(prev => ({ ...prev, jobType: type.value }))}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Skills */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {popularSkills.map((skill) => (
              <Badge
                key={skill}
                variant={selectedFilters.skills.includes(skill) ? "default" : "outline"}
                className="cursor-pointer hover:bg-teal-100"
                onClick={() => handleSkillToggle(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Client Rating */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Client Rating</h4>
          <div className="flex flex-wrap gap-2">
            {clientRatings.map((rating) => (
              <Button
                key={rating.value}
                variant={selectedFilters.clientRating === rating.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilters(prev => ({ ...prev, clientRating: rating.value }))}
              >
                {rating.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <>
            <Separator />
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Active Filters</h4>
              <div className="flex flex-wrap gap-2">
                {selectedFilters.dateRange && (
                  <Badge variant="secondary">
                    Date: {dateRanges.find(r => r.value === selectedFilters.dateRange)?.label}
                  </Badge>
                )}
                {selectedFilters.budgetRange && (
                  <Badge variant="secondary">
                    Budget: {budgetRanges.find(r => r.value === selectedFilters.budget Range)?.label}
                  </Badge>
                )}
                {selectedFilters.jobType && (
                  <Badge variant="secondary">
                    Type: {jobTypes.find(t => t.value === selectedFilters.jobType)?.label}
                  </Badge>
                )}
                {selectedFilters.skills.map(skill => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
                {selectedFilters.clientRating && (
                  <Badge variant="secondary">
                    Rating: {clientRatings.find(r => r.value === selectedFilters.clientRating)?.label}
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProposalFilters;
