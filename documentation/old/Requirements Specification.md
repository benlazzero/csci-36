# Project Requirements

## 1. Introduction

SLOScraper 1.1: This project aims to crawl the Butte-Glenn Community College website for the Program Learning Outcomes **(PLOs)**, store them in a database and track PLO metadata. The project should track when assessments of PLOs are planned, if the PLOs have been met in the semester, any discussions around the PLOs and be able to report out any PLOs to be planned in the current semester.

### 1.1 Purpose

The purpose of this project is to implement a web scraper project that meets the Student Learning
Outcomes (SLOs). The SLOs for this project are as follows:
- Work with a team to develop and deliver a software system that satisfies a specific set of requirements.
- Analyze and determine requirements for a software system to solve a specific problem.
- Produce a detailed design for a software system that meets a specific set of requirements.
- Measure and track progress of a software development project.
- Use a version control tool to manage a software project with multiple team members and multiple revisions.
- Write software documentation that is clear, concise, and consistent with industry standards.


### 1.2 Document Conventions

This document will use conventional formatting. This section will be revised as needed.

Acronyms are defined inline with the first occurrence of their meaning using parenthesis, in **bold**:
>  Student Learning Outcomes **(SLOs)**
>  Program Learning Outcomes **(PLOs)** 

### 1.3 Intended Audience & Reading Suggestions

The intended audience for this document is anyone curious about the SLOScraper project. This document should be used primarily as reference for the members of the group working on the project throughout the semester.

### 1.4 Product Scope

The scope of this project should be to fix the existing SLOScraper project, provide a way for faculty and staff to track SLOs and Program Learning Outcomes (PLOs). This project will be used only against the Butte College website and should not be used, or expected to function outside of it.

### 1.5 References

This section will be revised as needed.

## 2. Overall Description

### 2.1 Product Perspective

The product is intended to help faculty implement change management and tracking of SLOs and PLOs using a database.

### 2.2 Product Functions

The product will perform the following functions:
- Tracks deptartment discussions around PLOs
- Tracks when assessments of PLOs are planned
- Tracks if they've been completed in that semester
- Generate reports of PLOs that are to be planned this semester


### 2.3 User Classes and Characteristics

The intended user class are faculty and staff comfortable with using a web browser and accessing a website.

### 2.4 Operating Environment

The operating environment details will be revised as needed. Currently, SLOScraper and its database will be designed to run as a standalone piece of software in an environment with a valid network connection.

### 2.5 Design and implementation constraints

The most notable constraints for this project are that the existing codebase is dated and does not function against the newer layout of the Butte College website currently. Additionally, environmental circumstances around this time are notable and may inhibit the abilities of some students.

### 2.6 User Documentation

A README markdown document will be provided in the root of the project along with several documents for installation and usage of the product.

### 2.7 Assumptions and dependencies

The assumptions for the project are that:
- The Academic Programs site structure isn’t modified
- This section will be revised as needed.
Dependencies for this project will be listed in the README


## 3. External Interface Requirements

### 3.1 User Interfaces

The user interface will consist of a website that allows users to view and update SLOs and PLOs.

The website will be built using Bootstrap and NodeJS.

The application will also output PLO and SLO data to a spreadsheet.

### 3.2 Hardware Interfaces

The database will need persistent storage. Standard input devices are supported.

### 3.3 Software Interfaces
The application will use standard HTML, CSS and Javascript to render a web interface accessible from and compatible with modern browsers.

### 3.4 Communications Interfaces

The project will scrape data from areas of the Butte College website. Thus, an internet or intranet connection to the butte.edu domain is required.

## 4. System Features

### Project Meets Student Learning Objectives (Priority: 5)

- The project is functional and work is tracked and proven at the end of the semester. The project will use NodeJS and scraping libraries to retrieve data from butte.edu.

### New Functionality Implementation (Priority: 4)

The project implements the following new functionality:
- The project tracks department discussions around PLOs
- The project tracks when assessments of PLOs are planned
- The project tracks if they've been completed in that semester
- The project is able to generate reports of PLOs that are to be planned this semester

### Database Implementation (Priority: 3)

- The project implements a database to store scraped objects in. The project should also use the database to track the state of each PLO and SLO.

### Implement CI/CD (Priority: 2) _Optional_

- Software can be set up for continuous integration using GitLab.
- The project can also be deployed to a server but a significant amount of additional work is required to accomplish this.


## 5. Other Nonfunctional Requirements:

### 5.1 Performance Requirements

The application will perform according to standard NodeJS. It will not contain logic errors or other issues that might impact performance.

### 5.2 Safety Requirements

This project is only intended for use against the Butte College website.


### 5.3 Security Requirements

This section will be revised as needed.

### 5.4 Software Quality Attributes

The code will meet SLO requirements for syntax, errors and formatting. Code will be linted using a ESLint.

### 5.5 Business Rules

This section will be revised as needed.

## 6. Other Requirements

This section will be revised as needed.

### Appendix A: Glossary

SLO: Student Learning Outcome
PLO: Program Learning Outcome

### Appendix B: Analysis Models

This section will be revised as needed. Specifically, when design documents are finalized.

### Appendix C: To Be Determined List

This section will be revised as needed.



