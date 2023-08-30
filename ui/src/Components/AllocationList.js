import React, { useState } from "react";

export default function AllocationList({ onSelect }) {
    const [allocation, setAllocation] = useState("");

    const handleAllocationChange = (event) => {
        const newAllocation = event.target.value;
        setAllocation(newAllocation);
        onSelect(newAllocation);

    }

    return (
        <select value={allocation} onChange={handleAllocationChange}>
            <option value="">All Allocations</option>
            <option value="department">
                Department
            </option>
            <option value="itSecurityFunction">
                IT Security Function
            </option>
            <option value="cioFunctionIncludingOps">
                CIO Function Including Ops
            </option>
            <option value="physicalSecurityGroup">
                Physical Security Group
            </option>
            <option value="personnelSecurityGroup">
                Personel Security Group
            </option>
            <option value="programAndServiceDeliveryManagers">
                Program and Service Delivery Managers
            </option>
            <option value="process">
                Process
            </option>
            <option value="project">
                Project
            </option>
            <option value="itProjects">
                IT Projects
            </option>
            <option value="facilityAndHardware">
                Facility and Hardware
            </option>
            <option value="resourceAbstractionAndControlLayer">
                Resource Abstraction and Control Layer
            </option>
            <option value="infrastructure">
                Infrastructure
            </option>
            <option value="platform">
                Platform
            </option>
            <option value="application">
                Application
            </option>
        </select>
    )
}