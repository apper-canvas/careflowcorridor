import React, { useState, useEffect } from "react";
import DoctorCard from "@/components/molecules/DoctorCard";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import doctorService from "@/services/api/doctorService";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const doctorsData = await doctorService.getAll();
      setDoctors(doctorsData);
      setFilteredDoctors(doctorsData);
    } catch (err) {
      setError(err.message || "Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let filtered = doctors;

    if (searchQuery) {
filtered = filtered.filter(d =>
        `${d.first_name_c} ${d.last_name_c}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.specialization_c?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(d => d.availability_c === filterStatus);
    }

    setFilteredDoctors(filtered);
  }, [searchQuery, filterStatus, doctors]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
        <p className="text-gray-600 mt-1">View doctor profiles and availability</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search doctors by name or specialization..."
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filterStatus === "all"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("available")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filterStatus === "available"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Available
          </button>
          <button
            onClick={() => setFilterStatus("on-duty")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filterStatus === "on-duty"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            On Duty
          </button>
        </div>
      </div>

      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.Id} doctor={doctor} />
          ))}
        </div>
      ) : searchQuery || filterStatus !== "all" ? (
        <Empty
          title="No doctors found"
          description="Try adjusting your search or filter criteria"
          icon="Search"
        />
      ) : (
        <Empty
          title="No doctors available"
          description="No doctors are currently in the system"
          icon="Stethoscope"
        />
      )}
    </div>
  );
};

export default Doctors;