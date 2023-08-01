import request from "supertest";
import { createYoga } from "graphql-yoga";
import { createServer } from "http";
import { schema } from "../Schema.js";
import { describe, it, expect } from "vitest";
import { Database, aql } from "arangojs";
import 'dotenv-safe/config.js'

const { DB_URL, DB_NAME, DB_USER, DB_PASS, PORT } = process.env;

// test db connection
const db = new Database({
  url: DB_URL,
  databaseName: DB_NAME,
  auth: { username: DB_USER, password: DB_PASS },
});


const query = async function query(strings, ...vars) {
  return db.query(aql(strings, ...vars), {
    count: true,
  });
};


// Create a GraphQL Yoga server
const yoga = createYoga({ schema, context: { query } });
const server = createServer(yoga);

const app = server.listen();

describe("server", () => {
  describe("Control Test", () => {
    it("Returns Control", async () => {
      const response = await request(app)
        .post("/graphql")
        .send({ query: ' {control(id: "AC-1"){title definition family id }}' });
      expect(response.body).toEqual({
        data: {
          control: {
            title: "Access Control Policy and Procedures",
            definition:
              "(A)The organization develops, documents, and disseminates to [Assignment: organization-defined personnel or roles]:\n(a)An access control policy that addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and\n(b)Procedures to facilitate the implementation of the access control policy and associated access controls.\n(B)The organization reviews and updates the current:\n(a)Access control policy [Assignment: organization-defined frequency]; and\n(b)Access control procedures [Assignment: organization-defined frequency].",
            family: "AC",
            id: "1",
          },
        },
      });
    });
  }),
    describe("Allocation Test", () => {
      it("Returns Control where department = true", async () => {
        const response = await request(app)
          .post("/graphql")
          .send({ query: ' {controlDrop(allocation: "department") {title}}' });
        expect(response.body).toEqual({
          data: {
            controlDrop: [
              {
                title: "Access Control Policy and Procedures",
              },
              {
                title: "Account Management",
              },
              {
                title: "Automated System Account Management",
              },
              {
                title: "Inactivity Logout",
              },
              {
                title: "Role-Based Schemes",
              },
              {
                title: "Restrictions on Use of Shared Groups / Accounts",
              },
              {
                title: "Shared / Group Account Credential Termination",
              },
              {
                title: "Usage Conditioning",
              },
              {
                title: "Account Monitoring / Atypical Usage",
              },
              {
                title: "Disable Accounts for High-Risk Individuals",
              },
              {
                title: "Authorize Access to Security Functions",
              },
              {
                title: "Non-Privileged Access for Non-Security Functions",
              },
              {
                title: "Network Access to Privileged Commands",
              },
              {
                title: "Privileged Accounts",
              },
              {
                title: "Privileged Access by Non-Organizational Users",
              },
              {
                title: "Review of User Privileges",
              },
              {
                title: "Maintenance of Attribute Association by Organization",
              },
              {
                title: "Remote Access",
              },
              {
                title: "Privileged Commands / Access",
              },
              {
                title: "Protection of Information",
              },
              {
                title:
                  "Remote Access to Privileged Accounts using Dedicated Management Console",
              },
              {
                title: "Wireless Access",
              },
              {
                title: "Restrict Configurations by Users",
              },
              {
                title: "Access Control for Mobile Devices",
              },
              {
                title: "Turn off Wireless Devices",
              },
              {
                title: "Use of External Information Systems",
              },
              {
                title: "Limits of Authorized Use",
              },
              {
                title: "Portable Storage Devices",
              },
              {
                title:
                  "Non-Organizationally Owned Systems / Components / Devices",
              },
              {
                title: "Network Accessible Storage Devices",
              },
              {
                title: "Information Sharing",
              },
              {
                title: "Safeguarding of Sensitive Information",
              },
              {
                title: "Publicly Accessible Content",
              },
              {
                title: "Security Awareness and Training Policy and Procedures",
              },
              {
                title: "Security Awareness Training",
              },
              {
                title: "Insider Threat",
              },
              {
                title: "Role-Based Security Training",
              },
              {
                title:
                  "Suspicious Communications and Anomalous System Behavior",
              },
              {
                title: "Security Training Records",
              },
              {
                title: "Audit and Accountability Policy and Procedures",
              },
              {
                title: "Reviews and Updates",
              },
              {
                title: "Audit Storage Capacity",
              },
              {
                title: "Audit Review, Analysis, and Reporting",
              },
              {
                title: "Process Integration",
              },
              {
                title: "Correlate Audit Repositories",
              },
              {
                title: "Permitted Actions",
              },
              {
                title: "Access by Subset of Privileged Users",
              },
              {
                title: "Read-Only Access",
              },
              {
                title: "Audit Record Retention",
              },
              {
                title:
                  "Security Assessment and Authorization Policies and Procedures",
              },
              {
                title: "System Interconnections",
              },
              {
                title: "UnClassified Non-National Security System Connections",
              },
              {
                title: "Continuous Monitoring",
              },
              {
                title: "Internal System Connections",
              },
              {
                title: "Configuration Management Policy and Procedures",
              },
              {
                title: "Baseline Configuration",
              },
              {
                title: "Reviews and Updates",
              },
              {
                title: "Automation Support for Accuracy / Currency",
              },
              {
                title: "Development and Test Environments",
              },
              {
                title: "Configuration Change Control",
              },
              {
                title: "Test / Validate / Document Changes",
              },
              {
                title: "Automated Change Implementation",
              },
              {
                title: "Security Representative",
              },
              {
                title: "Cryptography Management",
              },
              {
                title: "Access Restrictions for Change",
              },
              {
                title: "Review System Changes",
              },
              {
                title: "Limit Production / Operational Privileges",
              },
              {
                title: "Limit Library Privileges",
              },
              {
                title:
                  "Automated Central Management / Application / Verification",
              },
              {
                title: "Respond to Unauthorized Changes",
              },
              {
                title: "Periodic Review",
              },
              {
                title: "Registration Compliance",
              },
              {
                title: "Authorized Software / Whitelisting",
              },
              {
                title: "Automated Maintenance",
              },
              {
                title: "Automated Unauthorized Component Detection",
              },
              {
                title: "Accountability Information",
              },
              {
                title: "No Duplicate Accounting of Components",
              },
              {
                title: "Assessed Configurations / Approved Deviations",
              },
              {
                title: "Software Usage Restrictions",
              },
              {
                title: "Contingency Planning Policy and Procedures",
              },
              {
                title: "Contingency Training",
              },
              {
                title: "Simulated Events",
              },
              {
                title: "Contingency Plan Testing",
              },
              {
                title: "Coordinate with Related Plans",
              },
              {
                title: "Alternate Processing Site",
              },
              {
                title: "Alternate Storage Site",
              },
              {
                title: "Separation from Primary Site",
              },
              {
                title: "Recovery Times / Point Objectives",
              },
              {
                title: "Accessibility",
              },
              {
                title: "Alternative Processing Site",
              },
              {
                title: "Separation from Primary Site",
              },
              {
                title: "Accessibility",
              },
              {
                title: "Priority of Service",
              },
              {
                title: "Preparation for Use",
              },
              {
                title: "Inability to Return to Primary Site",
              },
              {
                title: "Telecommunications Services",
              },
              {
                title: "Priority of Service Provisions",
              },
              {
                title: "Single Points of Failure",
              },
              {
                title: "Separation of Primary / Alternate Providers",
              },
              {
                title: "Alternate Telecommunication Service Testing",
              },
              {
                title: "Information System Backup",
              },
              {
                title: "Testing for Reliability / Integrity",
              },
              {
                title: "Test Restoration using Sampling",
              },
              {
                title: "Separate Storage for Critical Information",
              },
              {
                title: "Transfer to Alternate Storage Site",
              },
              {
                title: "Dual Authorization",
              },
              {
                title: "Information System Recovery and Reconstitution",
              },
              {
                title: "Restore within Time Period",
              },
              {
                title: "Component Protection",
              },
              {
                title: "Alternative Security Mechanisms",
              },
              {
                title:
                  "Identification and Authentication Policy and Procedures",
              },
              {
                title: "Dynamic Address Allocation",
              },
              {
                title: "Identifier Management",
              },
              {
                title: "Prohibit Account Identifiers as Public Identifiers",
              },
              {
                title: "Supervisor Authorization",
              },
              {
                title: "Multiple Forms of Certification",
              },
              {
                title: "Identify User Status",
              },
              {
                title: "In Person Registration",
              },
              {
                title: "Authenticator Management",
              },
              {
                title: "In-Person or Trusted Third-Party Registration",
              },
              {
                title: "Protection of Authenticators",
              },
              {
                title: "Multiple Information System Accounts",
              },
              {
                title: "Cross-Organizational Credential Management",
              },
              {
                title: "Managing Content of PKI Trust Stores",
              },
              {
                title: "Incident Response Policy and Procedures",
              },
              {
                title: "Incident Response Training",
              },
              {
                title: "Simulated Events",
              },
              {
                title: "Incident Response Testing",
              },
              {
                title: "Coordination with Related Plans",
              },
              {
                title: "Incident Handling",
              },
              {
                title: "Continuity of Operations",
              },
              {
                title: "Information Correlation",
              },
              {
                title: "Correlation with External Organizations",
              },
              {
                title: "Dynamic Response Capability",
              },
              {
                title: "Incident Monitoring",
              },
              {
                title: "Incident Reporting",
              },
              {
                title: "Vulnerabilities Related to Incidents",
              },
              {
                title: "Incident Response Assistance",
              },
              {
                title: "Incident Response Plan",
              },
              {
                title: "Information Spillage Response",
              },
              {
                title: "Responsible Personnel",
              },
              {
                title: "Training",
              },
              {
                title: "Post-Spill Operations",
              },
              {
                title: "Exposure to Unauthorized Personnel",
              },
              {
                title: "Integrated Information Security Analysis Team",
              },
              {
                title: "System Maintenance Policy and Procedures",
              },
              {
                title: "Controlled Maintenance",
              },
              {
                title: "Maintenance Tools",
              },
              {
                title: "Inspect Media",
              },
              {
                title: "Nonlocal Maintenance",
              },
              {
                title: "Auditing and Review",
              },
              {
                title: "Comparable Security / Sanitization",
              },
              {
                title: "Authentication / Separation of Maintenance Sessions",
              },
              {
                title: "Approvals and Notifications",
              },
              {
                title: "Maintenance Personnel",
              },
              {
                title: "Individuals without Appropriate Access",
              },
              {
                title: "Non System-Related Maintenance",
              },
              {
                title: "Timely Maintenance",
              },
              {
                title: "Media Protection Policy and Procedures",
              },
              {
                title: "Media Access",
              },
              {
                title: "Media Marking",
              },
              {
                title: "Media Storage",
              },
              {
                title: "Media Transport",
              },
              {
                title: "Media Sanitization",
              },
              {
                title: "Review / Approve / Track / Document / Verify",
              },
              {
                title: "Equipment Testing",
              },
              {
                title: "Non-destructive Techniques",
              },
              {
                title: "Remote Purging / Wiping of Information",
              },
              {
                title: "Media Downgrading",
              },
              {
                title: "Documentation of Process",
              },
              {
                title: "Controlled Unclassified Information",
              },
              {
                title:
                  "Physical and Environmental Protection Policy and Procedures",
              },
              {
                title: "Physical Access Authorizations",
              },
              {
                title: "Access by Position / Role",
              },
              {
                title: "Two Forms of Identification",
              },
              {
                title: "Restrict Unescorted Access",
              },
              {
                title: "Identification Card",
              },
              {
                title: "Physical Access Control",
              },
              {
                title: "Information System Access",
              },
              {
                title: "Continuous Guards / Alarms / Monitoring",
              },
              {
                title: "Lockable Casings",
              },
              {
                title: "Access Control for Transmission Medium",
              },
              {
                title: "Access Control for Output Devices",
              },
              {
                title: "Monitoring Physical Access",
              },
              {
                title: "Intrusion Alarms / Surveillance Equipment",
              },
              {
                title: "Monitoring Physical Access to Information Systems",
              },
              {
                title: "Visitor Access Records",
              },
              {
                title: "Power Equipment and Cabling",
              },
              {
                title: "Emergency Shutoff",
              },
              {
                title: "Emergency Power",
              },
              {
                title: "Emergency Lighting",
              },
              {
                title: "Essential Missions / Business Functions",
              },
              {
                title: "Fire Protection",
              },
              {
                title: "Detection Devices / Systems",
              },
              {
                title: "Suppression Devices / Systems",
              },
              {
                title: "Automatic Fire Suppression",
              },
              {
                title: "Inspections",
              },
              {
                title: "Temperature and Humidity Controls",
              },
              {
                title: "Automatic Controls",
              },
              {
                title: "Monitoring with Alarms / Notifications",
              },
              {
                title: "Water Damage Protection",
              },
              {
                title: "Delivery and Removal",
              },
              {
                title: "Alternate Work Site",
              },
              {
                title: "Location of Information System Components",
              },
              {
                title: "Facility Site",
              },
              {
                title: "Security Planning Policy and Procedures",
              },
              {
                title: "Rules of Behavior",
              },
              {
                title: "Social Media and Networking Restrictions",
              },
              {
                title: "Personnel Security Policy and Procedures",
              },
              {
                title: "Position Risk Designation",
              },
              {
                title: "Personnel Screening",
              },
              {
                title: "Personnel Termination",
              },
              {
                title: "Personnel Transfer",
              },
              {
                title: "Access Agreements",
              },
              {
                title: "Third-Party Personnel Security",
              },
              {
                title: "Personnel Sanctions",
              },
              {
                title: "Risk Assessment Policy and Procedures",
              },
              {
                title: "System and Services Acquisition Policy and Procedures",
              },
              {
                title: "Tamper Resistance and Detection",
              },
              {
                title: "Unsupported System Components",
              },
              {
                title: "Alternative Sources for Continued Support",
              },
              {
                title:
                  "System and Communications Protection Policy and Procedures",
              },
              {
                title: "Detection / Monitoring",
              },
              {
                title: "Access Points",
              },
              {
                title: "External Telecommunications Services",
              },
              {
                title:
                  "Isolation of Security Tools / Mechanisms / Support Components",
              },
              {
                title: "Disabling / Removal in Secure Work Areas",
              },
              {
                title: "Mobile Code",
              },
              {
                title: "System and Information Integrity Policy and Procedures",
              },
              {
                title: "Flaw Remediation",
              },
              {
                title: "Malicious Code Protection",
              },
              {
                title: "Central Management",
              },
              {
                title: "Testing / Verification",
              },
              {
                title: "Information System Monitoring",
              },
              {
                title: "Automated Tools for Real-Time Analysis",
              },
              {
                title: "Testing of Monitoring Tools",
              },
              {
                title: "Visibility of Encrypted Communications",
              },
              {
                title: "Analyze Communications Traffic Anomalies",
              },
              {
                title: "Automated Alerts",
              },
              {
                title: "Analyze Traffic /E vent Patterns",
              },
              {
                title: "Wireless Intrusion Detection",
              },
              {
                title: "Wireless to Wireline Communications",
              },
              {
                title: "Security Alerts, Advisories, and Directives",
              },
              {
                title: "Software, Firmware, and Information Integrity",
              },
              {
                title: "Automated Notifications of Integrity Violations",
              },
              {
                title: "Centrally-Managed Integrity Tools",
              },
              {
                title: "Integration of Detection and Response",
              },
              {
                title: "Binary or Machine Executable Code",
              },
              {
                title: "Spam Protection",
              },
              {
                title: "Central Management of Protection Mechanisms",
              },
              {
                title: "Information Handling and Retention",
              },
            ],
          },
        });
      });
    });
});
