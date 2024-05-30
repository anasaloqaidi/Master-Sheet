
# Master Sheet Management System (MSMS)

<iframe src="https://player.vimeo.com/video/951472398?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="1920" height="1080" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" title="Master Sheet System"></iframe>

## Overview

The Master Sheet Management System (MSMS) is designed to streamline and automate the management of student grades within examination committees. This system addresses the inefficiencies and inaccuracies of traditional manual methods, providing a user-friendly interface for efficient grade management.

## Features

-   **Centralized Data Management**: A unified system to manage student grades, ensuring data consistency and security.
-   **User-Friendly Interface**: Simplified and intuitive interface for all authorized users.
-   **Automation**: Reduces manual effort and minimizes errors in grade entry and calculation.
-   **Security**: Ensures the protection of sensitive data through robust security measures.
-   **Analytics and Reporting**: Facilitates the analysis of grade data and generation of comprehensive reports.

## Technologies Used

-   **Frontend**: React.js, Mantine, Reduxtookit
-   **Backend**: TypeScript, NestJS, SQL
-   **Development Tools**: Visual Studio Code, Orm Drizzle

## Installation

1.  **Clone the repository**:
    

    
    `git clone https://github.com/yourusername/MSMS.git
    cd MSMS` 
    
2.  **Install dependencies**:
    
    `npm install` 
    
3.  **Set up the database**:
    
    -   Configure your PostgreSQL database.
    -   Run migrations to set up the database schema.
4.  **Run the application**:
    

    `npm run dev` **for frontend**
        `npm run start:dev` **for backend**

    

## Usage

1.  **Login**:
    
    -   Access the login page and enter your credentials.
    -   Depending on your role (Dean, Head of Department, or Committee Member), you will be redirected to the appropriate dashboard.
2.  **Dashboard Features**:
    
    -   **Dean**: Manage departments, academic years, courses, and administrative users.
    -   **Head of Department**: Oversee department-specific tasks, manage students, and monitor academic progress.
    -   **Committee Member**: Add student grades, prepare reports, and handle examination-related tasks.

## System Design

### Data Flow Diagrams (DFD)

-   **Dean of College**:
    
-   **Head of Department**:
    
-   **Examination Committee Member**:
    

### Database Tables

-   **Administrator Registration**
-   **College Configuration**
-   **Department Details**
-   **Academic Year**
-   **Educational Program Stages**
-   **Student Information**
-   **Grade Tables**

### Future Work

-   Regular updates and technical support.
-   New features such as appointment alerts and additional interfaces.
-   Enhancements to improve user experience and system functionality.



## Contact

For any inquiries or feedback, please contact:

-   Anas Mohammed Khdair: anasaloqaidi@outlook.com

