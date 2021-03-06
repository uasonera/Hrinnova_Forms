USE [master]
GO
/****** Object:  Database [hrinnova_db]    Script Date: 29-Mar-18 6:17:27 PM ******/
CREATE DATABASE [hrinnova_db]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'hrinnova_db', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\hrinnova_db.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'hrinnova_db_log', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\hrinnova_db_log.ldf' , SIZE = 1280KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [hrinnova_db] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [hrinnova_db].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [hrinnova_db] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [hrinnova_db] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [hrinnova_db] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [hrinnova_db] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [hrinnova_db] SET ARITHABORT OFF 
GO
ALTER DATABASE [hrinnova_db] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [hrinnova_db] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [hrinnova_db] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [hrinnova_db] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [hrinnova_db] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [hrinnova_db] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [hrinnova_db] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [hrinnova_db] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [hrinnova_db] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [hrinnova_db] SET  DISABLE_BROKER 
GO
ALTER DATABASE [hrinnova_db] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [hrinnova_db] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [hrinnova_db] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [hrinnova_db] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [hrinnova_db] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [hrinnova_db] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [hrinnova_db] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [hrinnova_db] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [hrinnova_db] SET  MULTI_USER 
GO
ALTER DATABASE [hrinnova_db] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [hrinnova_db] SET DB_CHAINING OFF 
GO
ALTER DATABASE [hrinnova_db] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [hrinnova_db] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [hrinnova_db]
GO
/****** Object:  Table [dbo].[additional_information]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[additional_information](
	[additionalinformation_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[known_to_presentemployee] [varchar](50) NULL,
	[name_of_knownemployee] [varchar](50) NULL,
	[relationship_with_knownemployee] [varchar](50) NULL,
 CONSTRAINT [PK_additional_information] PRIMARY KEY CLUSTERED 
(
	[additionalinformation_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[certifications]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[certifications](
	[certifications_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[cert_type] [varchar](10) NULL,
	[certification_name] [varchar](50) NULL,
 CONSTRAINT [PK_certifications] PRIMARY KEY CLUSTERED 
(
	[certifications_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[department]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[department](
	[DeptID] [int] IDENTITY(1,1) NOT NULL,
	[DeptName] [varchar](45) NOT NULL,
	[Description] [text] NULL,
	[IncrementPeriod] [int] NULL,
	[DeptCode] [varchar](5) NULL,
	[IsMultipleShift] [bit] NULL,
	[ProbationPeriod] [int] NULL,
	[LookedByEmp] [nvarchar](150) NULL,
	[NoticePeriod] [int] NULL,
 CONSTRAINT [PK_department] PRIMARY KEY CLUSTERED 
(
	[DeptID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[educational_qualifications]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[educational_qualifications](
	[eduqualifications_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[tenth_school] [varchar](50) NULL,
	[tenth_board] [varchar](50) NULL,
	[tenth_yearofpassing] [varchar](4) NULL,
	[tenth_grade] [varchar](50) NULL,
	[twelfth_school] [varchar](50) NULL,
	[twelfth_board] [varchar](50) NULL,
	[twelfth_yearofpassing] [varchar](4) NULL,
	[twelfth_grade] [varchar](50) NULL,
	[bachelors_college] [varchar](50) NULL,
	[bachelors_university] [varchar](50) NULL,
	[bachelors_yearofpassing] [varchar](4) NULL,
	[bachelors_grade] [varchar](50) NULL,
	[masters_college] [varchar](50) NULL,
	[masters_university] [varchar](50) NULL,
	[masters_yearofpassing] [varchar](4) NULL,
	[masters_grade] [varchar](50) NULL,
	[other_school] [varchar](50) NULL,
	[other_board] [varchar](50) NULL,
	[other_yearofpassing] [varchar](4) NULL,
	[other_grade] [varchar](50) NULL,
 CONSTRAINT [PK_educational_qualifications] PRIMARY KEY CLUSTERED 
(
	[eduqualifications_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[employee_details]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee_details](
	[employee_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_code] [varchar](10) NULL,
	[designation] [varchar](25) NOT NULL,
	[department] [varchar](25) NOT NULL,
	[firstname] [varchar](25) NOT NULL,
	[middlename] [varchar](25) NOT NULL,
	[surname] [varchar](25) NOT NULL,
	[gender] [varchar](10) NOT NULL,
	[date_of_birth] [date] NULL,
	[date_of_joining] [date] NOT NULL,
	[marital_status] [varchar](10) NOT NULL,
	[marriage_anniversary] [date] NULL,
	[blood_group] [varchar](10) NULL,
	[mobile_number] [varchar](10) NOT NULL,
	[home_number] [varchar](10) NOT NULL,
	[alternate_number] [varchar](10) NOT NULL,
	[emergency_number] [varchar](10) NOT NULL,
	[email_id] [varchar](50) NULL,
	[permanent_address] [varchar](200) NOT NULL,
	[temporary_address] [varchar](200) NOT NULL,
	[aadhar_card] [varchar](12) NULL,
	[pan_card] [varchar](10) NULL,
	[passport_number] [varchar](50) NULL,
	[passport_validity] [date] NULL,
	[election_card] [varchar](50) NULL,
	[vehicle_number] [varchar](50) NULL,
	[single_bank_account] [varchar](50) NULL,
	[ifs_code] [varchar](50) NULL,
	[allergies] [varchar](50) NULL,
	[known_ailments] [varchar](50) NULL,
 CONSTRAINT [PK_employee_details] PRIMARY KEY CLUSTERED 
(
	[employee_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[employee_refcheck]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee_refcheck](
	[refcheck_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[previous_company_name] [nvarchar](50) NULL,
	[previous_company_address] [nvarchar](200) NULL,
	[details_furnished_by] [varchar](50) NULL,
	[designation] [varchar](25) NULL,
	[department] [varchar](25) NULL,
	[reporting_to] [varchar](50) NULL,
	[reporting_designation] [varchar](25) NULL,
	[monthly_salary] [numeric](18, 0) NULL,
	[reason_for_leaving] [nchar](10) NULL,
	[attendence] [varchar](4) NULL,
	[re_hire_status] [nvarchar](50) NULL,
	[verified_by_name] [nvarchar](50) NULL,
	[verified_by_date] [datetime2](7) NULL,
 CONSTRAINT [PK_employee_refcheck] PRIMARY KEY CLUSTERED 
(
	[refcheck_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[epfo_details]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[epfo_details](
	[epfo_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[presentcompany_pfnumber] [varchar](50) NULL,
	[member_of_epfoscheme] [varchar](50) NULL,
	[member_of_epsscheme] [varchar](50) NULL,
	[universal_account_number] [varchar](50) NULL,
	[prev_pf_acc_number] [varchar](50) NULL,
	[scheme_certificate_number] [varchar](50) NULL,
	[ppo_number] [varchar](50) NULL,
	[international_worker] [varchar](50) NULL,
	[country_of_origin] [varchar](50) NULL,
 CONSTRAINT [PK_epfo_details] PRIMARY KEY CLUSTERED 
(
	[epfo_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[esic_details]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[esic_details](
	[esic_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[insurance_number] [varchar](50) NULL,
	[branch_office] [varchar](50) NULL,
	[dispensary] [varchar](50) NULL,
	[employers_code] [varchar](50) NULL,
	[date_of_appointment] [date] NULL,
	[employers_nameandaddress] [nvarchar](200) NULL,
	[previous_insurance_number] [varchar](50) NULL,
	[name_of_nominee] [varchar](50) NULL,
	[nominee_relationship] [varchar](10) NULL,
	[nominee_address] [varchar](200) NULL,
 CONSTRAINT [PK_esic_details] PRIMARY KEY CLUSTERED 
(
	[esic_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[family_details]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[family_details](
	[familydet_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[member] [varchar](50) NULL,
	[fname] [varchar](20) NULL,
	[fdateofbirth] [date] NULL,
	[faadhar] [varchar](12) NULL,
	[fcontact] [varchar](10) NULL,
	[foccupation] [varchar](50) NULL,
	[freside] [varchar](10) NULL,
	[ftown] [varchar](20) NULL,
	[fstate] [varchar](20) NULL,
 CONSTRAINT [PK_family_details] PRIMARY KEY CLUSTERED 
(
	[familydet_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[feedback]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[feedback](
	[feedback_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[hr_manual] [varchar](3) NULL,
	[cims_idpassword] [varchar](3) NULL,
	[books] [varchar](3) NULL,
	[library_card] [varchar](3) NULL,
	[hr_anyother] [varchar](3) NULL,
	[identitycard] [varchar](3) NULL,
	[bank_account] [varchar](3) NULL,
	[notepad] [varchar](3) NULL,
	[pen] [varchar](3) NULL,
	[employee_card] [varchar](3) NULL,
	[admin_anyother] [varchar](3) NULL,
	[computer_system] [varchar](3) NULL,
	[headphones] [varchar](3) NULL,
	[emailid_password] [varchar](3) NULL,
	[network_ip] [varchar](3) NULL,
	[firewall_id] [varchar](3) NULL,
	[domain_usernamepassword] [varchar](3) NULL,
	[messengers_access] [varchar](3) NULL,
	[systemadmin_anyother] [varchar](3) NULL,
	[hrmanual_and_responsibilities] [varchar](3) NULL,
 CONSTRAINT [PK_feedback] PRIMARY KEY CLUSTERED 
(
	[feedback_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[other_details]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[other_details](
	[otherdet_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[propertyowner_name] [varchar](50) NULL,
	[propertyowner_contact] [varchar](10) NULL,
	[propertyowner_address] [nvarchar](200) NULL,
	[propertyowner_occupation] [varchar](50) NULL,
	[neighbour1_name] [varchar](50) NULL,
	[neighbour1_contact] [varchar](10) NULL,
	[neighbour1_address] [nvarchar](200) NULL,
	[neighbour1_occupation] [varchar](50) NULL,
	[neighbour2_name] [varchar](50) NULL,
	[neighbour2_contact] [varchar](10) NULL,
	[neighbour2_address] [nvarchar](200) NULL,
	[neighbour2_occupation] [varchar](50) NULL,
 CONSTRAINT [PK_other_details] PRIMARY KEY CLUSTERED 
(
	[otherdet_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[prev_employ_1]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[prev_employ_1](
	[prevemploy_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[employment_ref] [varchar](2) NULL,
	[employers_name] [varchar](50) NULL,
	[designation] [varchar](50) NULL,
	[periodworked_from] [date] NULL,
	[periodworked_to] [date] NULL,
	[reason_of_leaving] [varchar](50) NULL,
 CONSTRAINT [PK_prev_employ_1] PRIMARY KEY CLUSTERED 
(
	[prevemploy_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[prev_employ_2]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[prev_employ_2](
	[prevemploy_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[employers_name] [varchar](50) NULL,
	[designation] [varchar](50) NULL,
	[periodworked_from] [date] NULL,
	[periodworked_to] [date] NULL,
	[reason_of_leaving] [varchar](50) NULL,
 CONSTRAINT [PK_prev_employ_2] PRIMARY KEY CLUSTERED 
(
	[prevemploy_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[prev_employ_3]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[prev_employ_3](
	[prevemploy_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[employers_name] [varchar](50) NULL,
	[designation] [varchar](50) NULL,
	[periodworked_from] [date] NULL,
	[periodworked_to] [date] NULL,
	[reason_of_leaving] [varchar](50) NULL,
 CONSTRAINT [PK_prev_employ_3] PRIMARY KEY CLUSTERED 
(
	[prevemploy_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[prev_employ_4]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[prev_employ_4](
	[prevemploy_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[employers_name] [varchar](50) NULL,
	[designation] [varchar](50) NULL,
	[periodworked_from] [date] NULL,
	[periodworked_to] [date] NULL,
	[reason_of_leaving] [varchar](50) NULL,
 CONSTRAINT [PK_prev_employ_4] PRIMARY KEY CLUSTERED 
(
	[prevemploy_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[prev_employ_5]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[prev_employ_5](
	[prevemploy_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[employers_name] [varchar](50) NULL,
	[designation] [varchar](50) NULL,
	[periodworked_from] [date] NULL,
	[periodworked_to] [date] NULL,
	[reason_of_leaving] [varchar](50) NULL,
 CONSTRAINT [PK_prev_employ_5] PRIMARY KEY CLUSTERED 
(
	[prevemploy_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[previous_company_details]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[previous_company_details](
	[prevcomp_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[pf_account_number] [varchar](20) NULL,
	[pf_employers_code_number] [varchar](20) NULL,
	[fps_account_number] [varchar](20) NULL,
	[life_insurance] [varchar](20) NULL,
	[mediclaim] [varchar](20) NULL,
	[esi_insurance_number] [varchar](20) NULL,
	[esi_employers_code_number] [varchar](20) NULL,
 CONSTRAINT [PK_previous_company_details] PRIMARY KEY CLUSTERED 
(
	[prevcomp_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[references]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[references](
	[reference_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [int] NOT NULL,
	[ref_type] [varchar](50) NULL,
	[name] [varchar](50) NULL,
	[address] [nvarchar](200) NULL,
	[designation] [varchar](50) NULL,
 CONSTRAINT [PK_references] PRIMARY KEY CLUSTERED 
(
	[reference_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role]    Script Date: 29-Mar-18 6:17:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role](
	[roleID] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[description] [varchar](200) NULL,
	[InfrastructureCost] [decimal](18, 2) NULL,
	[Abbreviation] [varchar](50) NULL,
	[PerDeskCost] [numeric](18, 2) NULL,
 CONSTRAINT [PK_role] PRIMARY KEY CLUSTERED 
(
	[roleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[additional_information] ON 

INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (7, 17, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (8, 18, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (9, 19, N'yes', N'fsdfsdfsdf', N'fdsfsfsfd')
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (10, 20, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (15, 25, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (16, 26, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (17, 27, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (18, 28, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (19, 29, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (20, 30, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (21, 31, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (22, 32, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (23, 33, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (24, 34, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (25, 35, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (26, 36, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (27, 37, N'yes', N'asda', N'asda')
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (28, 38, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (29, 39, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (30, 40, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (1028, 1038, N'yes', NULL, NULL)
INSERT [dbo].[additional_information] ([additionalinformation_id], [employee_id], [known_to_presentemployee], [name_of_knownemployee], [relationship_with_knownemployee]) VALUES (1029, 1039, N'yes', NULL, NULL)
SET IDENTITY_INSERT [dbo].[additional_information] OFF
SET IDENTITY_INSERT [dbo].[certifications] ON 

INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (5, 17, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (6, 17, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (7, 17, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (8, 17, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (9, 18, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (10, 18, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (11, 18, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (12, 18, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (13, 19, N'1', N'fsdf')
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (14, 19, N'2', N'sdfs')
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (15, 19, N'3', N'sdfs')
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (16, 19, N'4', N'sdfs')
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (17, 20, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (18, 20, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (19, 20, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (20, 20, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (37, 25, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (38, 25, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (39, 25, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (40, 25, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (41, 26, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (42, 26, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (43, 26, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (44, 26, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (45, 27, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (46, 27, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (47, 27, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (48, 27, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (49, 28, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (50, 28, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (51, 28, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (52, 28, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (53, 29, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (54, 29, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (55, 29, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (56, 29, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (57, 30, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (58, 30, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (59, 30, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (60, 30, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (61, 31, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (62, 31, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (63, 31, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (64, 31, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (65, 32, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (66, 32, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (67, 32, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (68, 32, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (69, 33, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (70, 33, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (71, 33, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (72, 33, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (73, 34, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (74, 34, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (75, 34, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (76, 34, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (77, 35, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (78, 35, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (79, 35, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (80, 35, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (81, 36, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (82, 36, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (83, 36, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (84, 36, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (85, 37, N'1', N'asda')
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (86, 37, N'2', N'asda')
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (87, 37, N'3', N'asda')
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (88, 37, N'4', N'asda')
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (89, 38, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (90, 38, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (91, 38, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (92, 38, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (93, 39, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (94, 39, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (95, 39, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (96, 39, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (97, 40, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (98, 40, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (99, 40, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (100, 40, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (1089, 1038, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (1090, 1038, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (1091, 1038, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (1092, 1038, N'4', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (1093, 1039, N'1', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (1094, 1039, N'2', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (1095, 1039, N'3', NULL)
INSERT [dbo].[certifications] ([certifications_id], [employee_id], [cert_type], [certification_name]) VALUES (1096, 1039, N'4', NULL)
SET IDENTITY_INSERT [dbo].[certifications] OFF
SET IDENTITY_INSERT [dbo].[department] ON 

INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (4, N'Human Resource', N'', 12, N'HR', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (5, N'Admin', N'', 12, N'ADM', 0, 2, NULL, 1)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (7, N'Microsoft', N'.Net', 12, N'MS', 0, 3, N'4', 2)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (12, N'Borland - Embarcadero', N'Delphi', 12, N'BRD', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (13, N'Accounting', N'', 12, N'ACC', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (14, N'Business Process Outsourcing', N'', 12, N'BPO', 0, 3, N'38', 2)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (15, N'Training', N'', 12, N'TRN', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (16, N'Testing', N'', 12, N'TST', 0, 6, N'504,1142,849', 2)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (17, N'Graphics', N'', 12, N'GRP', 0, 6, NULL, 2)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (18, N'Sales & Marketing', N'', 12, N'MKT', NULL, NULL, N'859', NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (21, N'Analysis', N'Analysis', 12, N'ANA', 0, 3, N'1', 2)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (22, N'Search Engine Optimization', N'', 12, N'SEO', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (25, N'Sun', N'Java', 12, N'SUN', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (26, N'PHP', N'', 12, N'PHP', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (27, N'Mobile', N'', 12, N'MOB', 0, 5, NULL, 3)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (28, N'IT Support', N'', 12, N'ITS', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (29, N'Embedded Technologies', N'', 12, N'EMB', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (31, N'QISMS', N'Quality Information Security Management System', 12, N'QMS', 0, 6, N'1', 6)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (32, N'SharePoint', N'', 12, N'SP', 0, 3, NULL, 2)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (33, N'CRM', N'', 12, N'CRM', 0, 3, N'379', 2)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (34, N'VC++', N'', 12, N'VC', 0, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (36, N'Print Media', N'', 12, N'PRT', 0, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (37, N'Legal Compliance', N'Looking after all statutory, legal, secretarial & compliance issues', 12, N'LC', 0, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (38, N'Jpoxy Tech Support', N'Jpoxy Tech Support', 12, N'JPX', 0, 3, N'5', 2)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (40, N'SAP', N'SAP', 12, N'SAP', 0, 3, N'833', 2)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (41, N'Operations', N'', 12, N'M1O', 0, 6, N'5', 2)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (62, N'Accounting', N'', 12, N'ACT', 0, 5, NULL, 3)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (154, N'Testing', NULL, 12, N'QA', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (156, N'My department', N'', 12, N'MD12', 0, 3, NULL, 2)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (157, N'@qweqwe_%%$$%T$2343', N'sdfdsf', 12, N'2qwe', 0, 2, NULL, 2)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (158, N'Test@123', N'BDF', 12, N'Test', 0, 6, NULL, 2)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (160, N'Department', N'', 12, N'01', 0, 1, NULL, 1)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (161, N'Teacher', NULL, 12, N'TCH', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (162, N'Trainee', NULL, 12, N'TRAIN', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (163, N'Test', N'Test', 12, N'T1', 0, 1, NULL, 1)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (164, N'MBO (Fund Services)', NULL, 12, N'MBO', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (165, N'Research', NULL, 12, N'RES', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (166, N'Administration', NULL, 12, N'ADMIN', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (167, N'IT', NULL, 12, N'IT', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (168, N'Xmanagment', NULL, 12, N'MGMT', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (169, N'IB Operation', NULL, 12, N'IBOps', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (170, N'Pre-Sales', NULL, 12, N'Sales', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (171, N'BUSINESS DEVELOPMENT', NULL, NULL, N'BD', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (172, N'CLINICAL RESEARCH', NULL, NULL, N'CLRS', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (173, N'ERP', NULL, NULL, N'ERP', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (174, N'EXPORT', NULL, NULL, N'EXPT', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (175, N'FRONT OFFICE', NULL, NULL, N'FROF', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (176, N'GREEN LASER', NULL, NULL, N'GL', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (177, N'IMAGING SYSTEMS', NULL, NULL, N'IMSY', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (178, N'INTRA OCULAR LENS', NULL, NULL, N'IOL', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (179, N'KERTOMETER', NULL, NULL, N'KERT', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (180, N'LENSOMETER', NULL, NULL, N'LENSO', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (181, N'MICROSCOPR', NULL, NULL, N'MCSP', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (182, N'MICROBIOLOGIST', NULL, NULL, N'MICR', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (183, N'MILLING', NULL, NULL, N'MILL', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (184, N'MARKETING', NULL, NULL, N'MKTG', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (185, N'MULTIMEDIA', NULL, NULL, N'MLMD', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (186, N'OPTOMETRY TABLE', NULL, NULL, N'OPTB', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (187, N'OPTOMETRY REFRACTOR', NULL, NULL, N'OREF', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (188, N'PHARMA', NULL, NULL, N'PHRM', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (189, N'PURCHASE', NULL, NULL, N'PRCH', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (190, N'PRODUCTION', NULL, NULL, N'PROD', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (191, N'RESEARCH AND DEVELOPMENT', NULL, NULL, N'R&D', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (192, N'REGULATORY', NULL, NULL, N'REGL', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (193, N'SLIT LAMP', NULL, NULL, N'SLLP', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (194, N'STORES', NULL, NULL, N'STRS', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (195, N'SYSTEMS ADMIN', NULL, NULL, N'SYAD', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (196, N'TICKETING', NULL, NULL, N'TKTG', NULL, NULL, NULL, NULL)
INSERT [dbo].[department] ([DeptID], [DeptName], [Description], [IncrementPeriod], [DeptCode], [IsMultipleShift], [ProbationPeriod], [LookedByEmp], [NoticePeriod]) VALUES (197, N'TENDER', NULL, NULL, N'TNDR', NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[department] OFF
SET IDENTITY_INSERT [dbo].[educational_qualifications] ON 

INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (1, 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (6, 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (7, 26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (8, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (9, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (10, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (11, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (12, 31, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (13, 32, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (14, 33, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (15, 34, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (16, 35, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (17, 36, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (18, 37, N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda')
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (19, 38, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (20, 39, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (21, 40, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (1019, 1038, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[educational_qualifications] ([eduqualifications_id], [employee_id], [tenth_school], [tenth_board], [tenth_yearofpassing], [tenth_grade], [twelfth_school], [twelfth_board], [twelfth_yearofpassing], [twelfth_grade], [bachelors_college], [bachelors_university], [bachelors_yearofpassing], [bachelors_grade], [masters_college], [masters_university], [masters_yearofpassing], [masters_grade], [other_school], [other_board], [other_yearofpassing], [other_grade]) VALUES (1020, 1039, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[educational_qualifications] OFF
SET IDENTITY_INSERT [dbo].[employee_details] ON 

INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (11, NULL, N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'dvssdvsdv', N'male', CAST(N'2017-11-30' AS Date), CAST(N'2017-11-30' AS Date), N'widow', CAST(N'2017-11-30' AS Date), N'b+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'asfafc', N'adscd', N'456123456233', N'1234564651', N'5454561461', CAST(N'2017-11-30' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (12, NULL, N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'dvssdvsdv', N'other', CAST(N'2017-11-30' AS Date), CAST(N'2017-11-30' AS Date), N'widow', CAST(N'2017-11-30' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'csacsa', N'sacassc', N'456123456233', N'1234564651', N'5454561461', CAST(N'2017-11-30' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (13, NULL, N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'dvssdvsdv', N'other', CAST(N'2017-09-29' AS Date), CAST(N'2017-11-30' AS Date), N'widow', CAST(N'2017-11-30' AS Date), NULL, N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'dscsdc', N'scasc', N'456123456233', N'4561234562', N'5454561461', CAST(N'2017-11-30' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (14, NULL, N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'dvssdvsdv', N'other', CAST(N'2017-12-30' AS Date), CAST(N'2017-11-30' AS Date), N'unmarried', CAST(N'2018-11-30' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N' acsaas', N'sacasa', N'456123456233', N'1234564651', N'5454561461', CAST(N'2017-11-30' AS Date), N'scaascsacc', N'scasasc', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (15, NULL, N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'dvssdvsdv', N'other', CAST(N'2017-12-30' AS Date), CAST(N'2017-09-28' AS Date), N'widow', CAST(N'2018-11-30' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'cads', N'ascac', N'123456465132', N'1234564651', N'5454561461', CAST(N'2017-11-30' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (16, NULL, N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'sonera', N'other', CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), N'widow', CAST(N'0001-01-01' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'casc', N'sacasc', N'456123456233', N'1234564651', N'5454561461', CAST(N'0001-01-01' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (17, N'2053', N'developer', N'microsoft', N'Ujjaval', N'A', N'Sonera', N'male', CAST(N'1995-04-03' AS Date), CAST(N'2017-11-02' AS Date), N'unmarried', CAST(N'0001-01-01' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'ujjavalsonera@gmail.com', N'satyam society subhanpura vadodara', N'satyam society subhanpura vadodara', N'456123456233', N'1234564651', N'5454561461', CAST(N'2018-03-21' AS Date), N'112sadasd', N'GJ-06-4335', N'35132965985', N'sbin001010', N'No', N'No')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (18, N'2053', N'developer', N'microsoft', N'ujjaval', N'a', N'Sonera', N'male', CAST(N'1995-04-03' AS Date), CAST(N'2017-11-02' AS Date), N'unmarried', CAST(N'0001-01-01' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'ujjavalsonera@gmail.com', N'satyam society subhanpura vadodara', N'satyam society subhanpura vadodara', N'456123456233', N'1234564651', N'5454561461', CAST(N'2018-03-14' AS Date), N'scaascsacc', N'scasasc', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (19, N'2053', N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'dvssdvsdv', N'other', CAST(N'2018-04-18' AS Date), CAST(N'2018-03-13' AS Date), N'married', CAST(N'2018-03-21' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'fsasa', N'saasds', N'456123456233', N'1234564651', N'5454561461', CAST(N'2018-03-07' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (20, N'2055', N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'dvssdvsdv', N'other', CAST(N'2018-04-04' AS Date), CAST(N'2018-03-15' AS Date), N'married', CAST(N'2018-03-21' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'sadad', N'adsad', N'456123456233', N'1234564651', N'5454561461', CAST(N'2018-03-15' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (25, N'2087', N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'dvssdvsdv', N'male', CAST(N'2018-03-13' AS Date), CAST(N'2018-03-13' AS Date), N'married', CAST(N'2018-03-13' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'ujjavalsonera@gmail.com', N'dsadsad', N'ddsasad', N'456123456233', N'1234564651', N'5454561461', CAST(N'2018-03-13' AS Date), N'scaascsacc', N'scasasc', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (26, N'2099', N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'dvssdvsdv', N'male', CAST(N'2018-03-15' AS Date), CAST(N'2018-03-14' AS Date), N'married', CAST(N'2018-03-15' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'asascac', N'dsacac', N'456123456233', N'1234564651', N'5454561461', CAST(N'2018-03-19' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (27, N'2069', N'developer', N'microsoft', N'dad', N'daasd', N'sadadsd', N'male', CAST(N'2018-03-07' AS Date), CAST(N'2018-03-14' AS Date), N'married', CAST(N'2018-03-14' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'adssd', N'asdasdasdasd', N'456123456233', N'1234564651', N'dasdsa', CAST(N'2018-03-13' AS Date), N'dsasdasd', N'sdasd', N'asdasda', N'adasd', N'dasdasd', N'dasd')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (28, N'54654', N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'dvssdvsdv', N'male', CAST(N'2018-03-05' AS Date), CAST(N'2018-03-20' AS Date), N'married', CAST(N'2018-03-14' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'dsasasad', N'asfcas', N'456123456233', N'1234564651', N'cscsac', CAST(N'2018-03-21' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'csaascsac', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (29, N'212', N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'dvssdvsdv', N'male', CAST(N'2018-03-13' AS Date), CAST(N'2018-03-07' AS Date), N'married', CAST(N'2018-03-20' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'asdasdas', N'asdd', N'456123456233', N'1234564651', N'5454561461', CAST(N'2018-03-13' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (30, N'23423', N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'dvssdvsdv', N'male', CAST(N'2018-03-20' AS Date), CAST(N'2018-03-05' AS Date), N'married', CAST(N'2018-03-14' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'ujjavalsonera@gmail.com', N'fdfsfdf', N'sdfsdffd', N'456123456233', N'1234564651', N'5454561461', CAST(N'2018-03-19' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (31, N'dasdas', N'developer', N'microsoft', N'dsadsdas', N'dasdasd', N'dsadasd', N'male', CAST(N'2018-03-14' AS Date), CAST(N'2018-03-21' AS Date), N'married', CAST(N'2018-03-14' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'saasd', N'asdasd', N'456123456233', N'1234564651', N'5454561461', CAST(N'2018-03-19' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (32, N'234234', N'developer', N'microsoft', N'asd', N'Anil', N'dvssdvsdv', N'male', CAST(N'2018-03-20' AS Date), CAST(N'2018-03-13' AS Date), N'married', CAST(N'2018-03-20' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'ffsfsdfds', N'dsefwf', N'456123456233', N'1234564651', N'sadadasc', CAST(N'2018-03-07' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (33, N'23432', N'developer', N'microsoft', N'asd', N'Anil', N'cascascascasc', N'male', CAST(N'2018-03-06' AS Date), CAST(N'2018-03-06' AS Date), N'married', CAST(N'2018-03-14' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'dfsdfds', N'sdfsdfs', N'456123456233', N'1234564651', N'5454561461', CAST(N'2018-03-13' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (34, N'123', N'developer', N'microsoft', N'asd', N'dsvsdvsdv', N'dvssdvsdv', N'female', CAST(N'2018-03-27' AS Date), CAST(N'2018-03-22' AS Date), N'married', CAST(N'2018-03-14' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'sadsadas', N'dadasda', N'456123456233', N'1234564651', N'5454561461', CAST(N'2018-03-13' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (35, N'2033', N'developer', N'microsoft', N'Ujjaval', N'a', N'Sonera', N'male', CAST(N'2018-03-08' AS Date), CAST(N'2018-03-14' AS Date), N'married', CAST(N'2018-03-14' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'ujjavalsonera@gmail', N'asdkjasdkjn', N'asjdnasdknj', N'123456789456', N'1235643256', N'123456', CAST(N'2018-03-21' AS Date), N'a1d4s561ds', N'a1sd3as1d', N'1313213213211', N'asdas1213', N'dsaddsa', N'asdasddas')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (36, N'8866', N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'dvssdvsdv', N'male', CAST(N'2018-03-07' AS Date), CAST(N'2018-03-13' AS Date), N'married', CAST(N'2018-03-13' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'ujjavalsonera@gmail.com', N'asdad', N'dsadasdsa', N'456123456233', N'1234564651', N'5454561461', CAST(N'2018-03-20' AS Date), N'scaascsacc', N'sacascsa', N'cacasc', N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (37, N'12312', N'developer', N'microsoft', N'asd', N'dsvsdvsdv', N'dvssdvsdv', N'male', CAST(N'2018-03-21' AS Date), CAST(N'2018-03-14' AS Date), N'married', CAST(N'0001-01-01' AS Date), NULL, N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'ujjavalsonera@gmail.com', N'asdasd', N'dasd', N'456123456233', NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, N'asda', N'asda')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (38, N'12345', N'developer', N'microsoft', N'ujjaval', N'Anil', N'cascascascasc', N'male', CAST(N'2018-03-13' AS Date), CAST(N'2018-03-20' AS Date), N'married', CAST(N'0001-01-01' AS Date), NULL, N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'ujjavalsonera@gmail.com', N'adasdsad', N'sadasd', N'456123456233', NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, N'cascascsa', N'dvsvsdvdv', N'vsdvsdvds')
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (39, N'886656', N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'dvssdvsdv', N'male', CAST(N'2018-03-21' AS Date), CAST(N'2018-03-21' AS Date), N'married', CAST(N'2018-03-21' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'ujjavalsonera@gmail.com', N'dfsasadas', N'ddsasdasdas', N'456123456233', NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (40, N'9000', N'developer', N'microsoft', N'sdsad', N'asdasd', N'adsasd', N'male', CAST(N'2018-03-21' AS Date), CAST(N'2018-03-07' AS Date), N'married', CAST(N'2018-03-21' AS Date), N'B+', N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'ujjavalsonera@gmail.com', N'asdasdsa', N'asdasdsa', N'456123456233', NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (1038, N'333', N'developer', N'microsoft', N'Dweep', N'dsvsdvsdv', N'dvssdvsdv', N'male', CAST(N'2018-03-20' AS Date), CAST(N'2018-03-21' AS Date), N'married', CAST(N'2018-03-28' AS Date), NULL, N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'eqqeeqw', N'eqqeeqw', N'456123456233', NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[employee_details] ([employee_id], [employee_code], [designation], [department], [firstname], [middlename], [surname], [gender], [date_of_birth], [date_of_joining], [marital_status], [marriage_anniversary], [blood_group], [mobile_number], [home_number], [alternate_number], [emergency_number], [email_id], [permanent_address], [temporary_address], [aadhar_card], [pan_card], [passport_number], [passport_validity], [election_card], [vehicle_number], [single_bank_account], [ifs_code], [allergies], [known_ailments]) VALUES (1039, N'999', N'developer', N'microsoft', N'ujjaval', N'dsvsdvsdv', N'cascascascasc', N'male', CAST(N'2018-03-06' AS Date), CAST(N'2018-03-21' AS Date), N'married', CAST(N'0001-01-01' AS Date), NULL, N'8866412279', N'8866412279', N'8866412279', N'8866412279', N'sadadasdd@sadnsad.com', N'fhfghgf', N'fhfghgf', N'456123456233', NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[employee_details] OFF
SET IDENTITY_INSERT [dbo].[epfo_details] ON 

INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (7, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (8, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (9, 19, N'dsadasdsa', NULL, NULL, N'asdadssda', N'sdaasdsaddsa', N'asdsadsadas', N'dsadasdsad', N'yes', N'csdcdsc')
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (10, 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (15, 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (16, 26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (17, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (18, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (19, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (20, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (21, 31, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (22, 32, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (23, 33, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (24, 34, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (25, 35, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (26, 36, N'dsadasdsa', N'yes', N'yes', N'asdadssda', N'sdaasdsaddsa', N'asdsadsadas', N'dsadasdsad', N'yes', N'csdcdsc')
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (27, 37, N'dasdasd', N'yes', N'yes', N'adsa', N'dsadasd', N'dasda', NULL, N'yes', N'sadsad')
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (28, 38, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (29, 39, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (30, 40, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (1028, 1038, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[epfo_details] ([epfo_id], [employee_id], [presentcompany_pfnumber], [member_of_epfoscheme], [member_of_epsscheme], [universal_account_number], [prev_pf_acc_number], [scheme_certificate_number], [ppo_number], [international_worker], [country_of_origin]) VALUES (1029, 1039, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[epfo_details] OFF
SET IDENTITY_INSERT [dbo].[esic_details] ON 

INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (7, 17, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (8, 18, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (9, 19, N'asdasda', N'dsadasdsa', N'sadasd', N'sadasds', CAST(N'2018-03-08' AS Date), N'sadsacsadc', N'sdadadsa', N'dsadasd', N'asdasdas', NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (10, 20, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (15, 25, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (16, 26, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (17, 27, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (18, 28, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (19, 29, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (20, 30, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (21, 31, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (22, 32, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (23, 33, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (24, 34, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (25, 35, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (26, 36, N'sdfdsfsdf', N'dsadasdsa', N'sadasd', N'sadasds', CAST(N'2018-03-21' AS Date), N'sadsdas', N'sdadadsa', N'dsadasd', N'asdasdas', N'saasds')
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (27, 37, N'dads', N'asdsad', N'asdasd', N'dsadas', CAST(N'2018-03-14' AS Date), N'sadasd', N'sdadadsa', N'dsadasd', N'dsa', N'dsasdasd')
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (28, 38, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (29, 39, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (30, 40, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (1028, 1038, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[esic_details] ([esic_id], [employee_id], [insurance_number], [branch_office], [dispensary], [employers_code], [date_of_appointment], [employers_nameandaddress], [previous_insurance_number], [name_of_nominee], [nominee_relationship], [nominee_address]) VALUES (1029, 1039, NULL, NULL, NULL, NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[esic_details] OFF
SET IDENTITY_INSERT [dbo].[family_details] ON 

INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (37, 17, N'father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (38, 17, N'mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (39, 17, N'brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (40, 17, N'sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (41, 17, N'spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (42, 17, N'children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (43, 18, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (44, 18, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (45, 18, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (46, 18, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (47, 18, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (48, 18, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (49, 19, N'father', N'asdfkjb', CAST(N'2018-04-17' AS Date), N'sf', N'sdf', N'df', N'asf', N'asf', N'asdf')
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (50, 19, N'mother', N'sdfsdfs', CAST(N'2018-03-13' AS Date), N'fsfsd', N'fsdfsdf', N'sdfsdf', N'sdfsdf', N'sdfsdf', N'sdfs')
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (51, 19, N'brother', N'sdfsdf', CAST(N'2018-03-21' AS Date), N'sdfsdf', N'fsdfsd', N'dffsd', N'sdfsdf', N'sdfsdf', N'dfsdfs')
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (52, 19, N'sister', N'sdfsdf', CAST(N'2018-03-08' AS Date), N'sfsdf', N'fsdfsd', N'ffs', N'sdfsd', N'sdfsdf', N'dfdsf')
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (53, 19, N'spouse', N'sdf', CAST(N'2018-03-14' AS Date), N'fsdf', N'fsdfsd', N'sdfsd', N'fsdf', N'sdfsd', N'fdfsfsdf')
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (54, 19, N'children', N'dsfsdf', CAST(N'2018-03-20' AS Date), N'dsfsd', N'fdsfs', N'dfsdf', N'fsdsdfsd', N'fsdfsd', N'fsdf')
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (55, 20, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (56, 20, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (57, 20, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (58, 20, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (59, 20, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (60, 20, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (85, 25, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (86, 25, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (87, 25, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (88, 25, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (89, 25, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (90, 25, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (91, 26, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (92, 26, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (93, 26, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (94, 26, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (95, 26, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (96, 26, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (97, 27, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (98, 27, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (99, 27, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (100, 27, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (101, 27, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (102, 27, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (103, 28, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (104, 28, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (105, 28, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (106, 28, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (107, 28, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (108, 28, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (109, 29, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (110, 29, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (111, 29, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (112, 29, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (113, 29, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (114, 29, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (115, 30, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (116, 30, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (117, 30, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (118, 30, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (119, 30, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (120, 30, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (121, 31, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (122, 31, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (123, 31, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (124, 31, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (125, 31, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (126, 31, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (127, 32, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (128, 32, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (129, 32, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (130, 32, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (131, 32, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (132, 32, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (133, 33, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (134, 33, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (135, 33, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (136, 33, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (137, 33, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (138, 33, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (139, 34, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (140, 34, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (141, 34, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (142, 34, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (143, 34, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (144, 34, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (145, 35, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (146, 35, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (147, 35, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (148, 35, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (149, 35, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (150, 35, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (151, 36, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (152, 36, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (153, 36, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (154, 36, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (155, 36, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (156, 36, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (157, 37, N'Father', N'dasd', CAST(N'2018-03-21' AS Date), N'123123', N'123123', N'asda', N'asda', N'asda', N'asda')
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (158, 37, N'Mother', N'asdas', CAST(N'2018-03-20' AS Date), N'123123', N'123123', N'asda', N'asda', N'asda', N'asda')
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (159, 37, N'Brother', N'dsad', CAST(N'2018-03-26' AS Date), N'123123', N'123123', N'asda', N'asda', N'asda', N'asda')
GO
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (160, 37, N'Sister', N'sadas', CAST(N'2018-03-26' AS Date), N'123123', N'123123', N'asda', N'asda', N'asda', N'asda')
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (161, 37, N'Spouse', N'dasdas', CAST(N'2018-03-26' AS Date), N'123123', N'123123', N'asda', N'asda', N'asda', N'asda')
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (162, 37, N'Children', N'dds', CAST(N'2018-03-19' AS Date), N'123123', N'123123', N'asda', N'asda', N'asda', N'asda')
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (163, 38, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (164, 38, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (165, 38, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (166, 38, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (167, 38, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (168, 38, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (169, 39, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (170, 39, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (171, 39, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (172, 39, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (173, 39, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (174, 39, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (175, 40, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (176, 40, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (177, 40, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (178, 40, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (179, 40, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (180, 40, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (1163, 1038, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (1164, 1038, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (1165, 1038, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (1166, 1038, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (1167, 1038, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (1168, 1038, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (1169, 1039, N'Father', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (1170, 1039, N'Mother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (1171, 1039, N'Brother', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (1172, 1039, N'Sister', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (1173, 1039, N'Spouse', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[family_details] ([familydet_id], [employee_id], [member], [fname], [fdateofbirth], [faadhar], [fcontact], [foccupation], [freside], [ftown], [fstate]) VALUES (1174, 1039, N'Children', NULL, CAST(N'0001-01-01' AS Date), NULL, NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[family_details] OFF
SET IDENTITY_INSERT [dbo].[feedback] ON 

INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (1, 20, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (6, 25, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (7, 26, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (8, 27, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (9, 28, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (10, 29, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (11, 30, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (12, 31, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (13, 32, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (14, 33, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (15, 34, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (16, 35, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (17, 36, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (18, 37, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (19, 38, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (20, 39, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (21, 40, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (1019, 1038, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
INSERT [dbo].[feedback] ([feedback_id], [employee_id], [hr_manual], [cims_idpassword], [books], [library_card], [hr_anyother], [identitycard], [bank_account], [notepad], [pen], [employee_card], [admin_anyother], [computer_system], [headphones], [emailid_password], [network_ip], [firewall_id], [domain_usernamepassword], [messengers_access], [systemadmin_anyother], [hrmanual_and_responsibilities]) VALUES (1020, 1039, N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes', N'yes')
SET IDENTITY_INSERT [dbo].[feedback] OFF
SET IDENTITY_INSERT [dbo].[other_details] ON 

INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (0, 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (1, 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (2, 26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (3, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (4, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (5, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (6, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (7, 31, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (8, 32, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (9, 33, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (10, 34, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (11, 35, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (12, 36, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (13, 37, N'sa', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda', N'asda')
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (14, 38, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (15, 39, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (16, 40, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (1014, 1038, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[other_details] ([otherdet_id], [employee_id], [propertyowner_name], [propertyowner_contact], [propertyowner_address], [propertyowner_occupation], [neighbour1_name], [neighbour1_contact], [neighbour1_address], [neighbour1_occupation], [neighbour2_name], [neighbour2_contact], [neighbour2_address], [neighbour2_occupation]) VALUES (1015, 1039, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[other_details] OFF
SET IDENTITY_INSERT [dbo].[prev_employ_1] ON 

INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (1, 38, N'1', N'111', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (2, 38, N'5', N'222', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (3, 38, N'0', N'333', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (4, 38, N'0', N'444', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (5, 38, N'0', N'555', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (6, 39, N'1', N'11', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (7, 39, N'5', N'22', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (8, 39, N'0', N'33', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (9, 39, N'0', N'44', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (10, 39, N'0', N'55', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (11, 40, N'1', N'1', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (12, 40, N'5', N'2', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (13, 40, N'0', N'3', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (14, 40, N'0', N'4', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (15, 40, N'0', N'5', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (16, 1038, N'1', N'303', N'dasdas', CAST(N'2018-03-20' AS Date), CAST(N'2018-03-27' AS Date), N'wqe')
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (17, 1038, N'5', N'404', N'ada', CAST(N'2018-03-28' AS Date), CAST(N'2018-03-13' AS Date), N'qeqwe')
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (18, 1038, NULL, N'505', N'addds', CAST(N'2018-03-28' AS Date), CAST(N'2018-03-14' AS Date), N'ewqe')
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (19, 1038, NULL, N'606', N'dasdas', CAST(N'2018-03-21' AS Date), CAST(N'2018-03-14' AS Date), N'qwe')
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (20, 1038, NULL, N'707', N'dsadasd', CAST(N'2018-03-22' AS Date), CAST(N'2018-03-07' AS Date), N'ewqe')
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (21, 1039, N'1', N'121', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (22, 1039, N'2', N'222', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (23, 1039, N'3', N'323', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (24, 1039, N'4', N'424', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
INSERT [dbo].[prev_employ_1] ([prevemploy_id], [employee_id], [employment_ref], [employers_name], [designation], [periodworked_from], [periodworked_to], [reason_of_leaving]) VALUES (25, 1039, N'5', N'525', NULL, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), NULL)
SET IDENTITY_INSERT [dbo].[prev_employ_1] OFF
SET IDENTITY_INSERT [dbo].[previous_company_details] ON 

INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (1, 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (2, 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (3, 26, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (4, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (5, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (6, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (7, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (8, 31, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (9, 32, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (10, 33, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (11, 34, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (12, 35, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (13, 36, NULL, NULL, NULL, NULL, NULL, N'sdfdsfsdf', NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (14, 37, N'asda', N'asda', N'asda', N'asda', N'asda', N'dads', N'asda')
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (15, 38, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (16, 39, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (17, 40, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (1015, 1038, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[previous_company_details] ([prevcomp_id], [employee_id], [pf_account_number], [pf_employers_code_number], [fps_account_number], [life_insurance], [mediclaim], [esi_insurance_number], [esi_employers_code_number]) VALUES (1016, 1039, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[previous_company_details] OFF
SET IDENTITY_INSERT [dbo].[references] ON 

INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (13, 17, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (14, 17, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (15, 18, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (16, 18, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (17, 19, N'1', N'fsfsd', N'fsdfsdf', N'dfssd')
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (18, 19, N'2', N'fdsfsd', N'fsdfsd', N'fsdfsd')
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (19, 20, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (20, 20, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (21, 25, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (22, 25, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (23, 26, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (24, 26, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (25, 27, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (26, 27, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (27, 28, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (28, 28, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (29, 29, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (30, 29, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (31, 30, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (32, 30, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (33, 31, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (34, 31, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (35, 32, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (36, 32, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (37, 33, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (38, 33, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (39, 34, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (40, 34, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (41, 35, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (42, 35, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (43, 36, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (44, 36, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (45, 37, N'1', N'asda', N'asda', N'asda')
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (46, 37, N'2', N'asda', N'asda', N'asda')
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (47, 38, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (48, 38, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (49, 39, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (50, 39, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (51, 40, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (52, 40, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (1047, 1038, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (1048, 1038, N'2', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (1049, 1039, N'1', NULL, NULL, NULL)
INSERT [dbo].[references] ([reference_id], [employee_id], [ref_type], [name], [address], [designation]) VALUES (1050, 1039, N'2', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[references] OFF
SET IDENTITY_INSERT [dbo].[role] ON 

INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (1, N'Project Manager', N'', NULL, N'PM', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (2, N'Project Lead', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (3, N'HR + Admin', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (4, N'Center Head', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (5, N'Software Tester', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (6, N'Software Engineer', N'', NULL, N'SE', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (7, N'Sr. Software Engineer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (8, N'Testing Team Lead', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (9, N'Test Manager', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (10, N'Sr. Graphic Designer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (11, N'Graphic Designer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (12, N'Project Analyst', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (13, N'Accountant', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (14, N'Marketing Officer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (15, N'Team Lead', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (16, N'3D Animator', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (17, N'Sr. Project Analyst', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (18, N'Managing Director', N'Owner of Company', NULL, N'MD', CAST(5000000.00 AS Numeric(18, 2)))
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (19, N'Admin Assistant', N'', NULL, N'AdAsst', CAST(25000.00 AS Numeric(18, 2)))
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (20, N'BPO Executive', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (22, N'Technical Lead', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (23, N'System Administrator', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (24, N'BPO Team Lead', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (25, N'Team Lead Analyst', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (26, N'SEO Lead', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (27, N'SEO ', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (28, N'Sr.SEO', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (29, N'SEO Manager', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (30, N'Sr. HR', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (31, N'Sr. System Administrator', N'Sr. System Administrator', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (32, N'Sr. Project Manager', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (33, N'Test Lead', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (34, N'Vice President of Technology', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (35, N'Front Office Assistant', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (36, N'Sr. 3D Animator', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (37, N'Sr. Project Lead', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (38, N'Sr. Technical Lead', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (39, N'Sr. Team Lead', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (40, N'Sr. Software Tester', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (41, N'Dotnet Architect', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (42, N'Assistant Test Manager', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (43, N'Wireman', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (45, N'Business Development Executive', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (46, N'Peon', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (47, N'Trainee Project Analyst + Relationship Officer', N'', CAST(1.00 AS Decimal(18, 2)), NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (69, N'Consultant', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (70, N'Trainer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (71, N'HR Executive', N'HR Executive', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (72, N'Management Trainee', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (73, N'SEO Executive', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (74, N'Web Designer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (75, N'Lead Web Designer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (76, N'Sr. Web Designer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (77, N'Sr. Project Leader', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (78, N'Business Development Manager', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (79, N'Counselor', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (80, N'Trainee Software Engineer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (81, N'Trainee Software Developer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (82, N'Account Assistant', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (83, N'Content Writer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (84, N'Tech Architect', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (85, N'SEPG Head', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (86, N'Sr. BDM', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (87, N'Executive Director', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (88, N'Asst HR Manager', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (89, N'Sr. HR Executive', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (90, N'Sr. Accountant', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (91, N'Sr. Trainer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (92, N'Sr. Admin Assistant', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (93, N'Module Lead', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (94, N'Senior Manager - Marketing', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (95, N'Sr.Net Architect', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (96, N'Asst. BDM', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (97, N'Executive Assistant', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (98, N'Graduate Engineer Trainee', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (99, N'Asst. Manager – Business Development', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (100, N'Asst. Manager – Data Services', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (101, N'Asst. Manager – Client Service', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (102, N'Trainee CRM', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (103, N'Trainee Sharepoint', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (104, N'Sr. BDE', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (105, N'Chartered Accountant', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (106, N'Customer Support Executive', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (107, N'Sales Manager', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (108, N'Office Assistant', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (109, N'Sales Incharge', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (110, N'Godown Keeper', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (111, N'Asst. Sales Manager', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (112, N'Site Officer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (113, N'SharePoint Consultant', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (114, N'CRM Consultant', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (115, N'Marketing Executive', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (116, N'Driver', N'Driver for office cabs', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (117, N'Senior Manager', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (118, N'Manager', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (119, N'DTP Operator Trainee', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (120, N'Project Coordinator', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (121, N'Purchase Executive', N'For purchase related activities of Godown and new factory- CEPL', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (122, N'Executive Warehouse', N'Warehouse-godown management at Piplaj for Araldite & jpoxy polymers- CEPL', NULL, NULL, NULL)
GO
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (123, N'Creative Designer', N'Creative designer who designs creative templates, layouts on web,desktop and mobile platform', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (124, N'Sales Head', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (125, N'Application Developer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (126, N'Technical Manager', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (127, N'Trainee software tester', N'Fresher with 6 months of probation period', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (128, N'HR Recruiter', N'for Reshma shetty: SAP Staffing', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (129, N'HR Counselor', N'Neha Sharma', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (130, N'Sr. QA Engineer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (131, N'Sr. Content Writer', N'content writing, content development with respect to marketing activities of CIPL', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (132, N'Trainee Business Analyst', N'Project analyst', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (133, N'QA Engineer', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (134, N'HR Trainee', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (135, N'Database Architect', N'Database Architect', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (136, N'Trainee Web Designer', N'Trainee Web Designer', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (137, N'Senior SQA', N'Software Quality Assurance', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (138, N'Database Administrator', N'Database Administrator - MYSQL', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (139, N'Senior Customer Support Executive', N'Sales support, product support, lead generation and data research', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (140, N'Sr. Team Lead QA', N'Sr. Team Lead QA', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (141, N'Asst. Manager QA', N'Asst. Manager QA', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (142, N'Asst. Financial Controller', N'Asst. Financial Controller', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (143, N'Accounts Manager', N'Accounts Manager', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (144, N'Regional Sales Head', N'Regional Sales Head', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (145, N'Data services Executive', N'Executive - Data services', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (146, N'Executive', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (147, N'Data entry operator', N'accounts dept. for sagar bhai''s junior', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (148, N'Pre Sales Manager', N'Pre Sales Manager', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (149, N'Pre Sales Executive', N'Pre Sales Executive', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (150, N'Senior UI Designer', N'Senior UI Designer', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (151, N'SEPG Executive', N'SEPG Executive', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (152, N'SQL Developer', N'SQL Developer', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (153, N'Visualizer', N'Visualizer', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (154, N'Executive logistics', N'Executive  Logistics', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (155, N'Jr. Database Administrator', N'Jr. Database Administrator', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (156, N'Electrician', N'Electrician', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (157, N'QA Lead', N'QA Lead', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (158, N'Plumber', N'Plumber', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (159, N'Digital marketing executive', N'Digital marketing executive', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (160, N'Travel desk executive', N'Travel desk executive', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (161, N'Trainee SEPG Executive', N'Trainee SEPG Executive', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (162, N'Trainee Sales Executive', N'Trainee Sales Executive', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (163, N'Senior web analyst', N'Senior web analyst - Noida', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (164, N'QA Manager', N'QA Manager', NULL, N'QA', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (165, N'Team Lead SEPG', N'Team Lead SEPG', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (166, N'Senior Business Analyst', N'Senior Business Analyst', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (167, N'Lab assistant Jpoxy', N'Lab assistant poxy', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (168, N'Asst. Engineer', N'Asst. Engineer', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (169, N'Asst. Marketing Manager', N'Asst. Marketing Manager', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (170, N'Asst. Team Lead', N'Asst. Team Lead', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (171, N'Sales Executive', N'Sales Executive - Non IT Role', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (172, N'SAP Consultant Banking', N'SAP Consultant Banking', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (173, N'SAP Consultant Basis', N'SAP Consultant Basis', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (174, N'SAP Consultant CRM Technical', N'SAP Consultant CRM Technical', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (175, N'SAP Consultant ABAP BI', N'SAP Consultant ABAP BI', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (176, N'SAP Consultant FICO', N'SAP Consultant FICO', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (177, N'SAP BI Consultant', N'SAP BI Consultant', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (178, N'SAP Consultant ABAP', N'', NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (180, N'Manager - Accounts', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (181, N'Assistant Manager - Finance', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (182, N'Manager - Finance', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (183, N'Executive - Accounts', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (184, N'Executive - Finance', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (185, N'Senior Executive - Warehouse', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (186, N'Assistant Manager - Infrastructure', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (187, N'Manager - Facilities', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (188, N'Manager - Purchase', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (189, N'Executive  - Warehouse', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (190, N'Executive  - Front Office', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (191, N'Lead Analyst', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (192, N'Senior Analyst', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (193, N'Product Analyst', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (194, N'Senior Executive - Data Services', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (195, N'Executive - Data Services', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (197, N'Principal Technical Architect', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (198, N'Tech Lead', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (199, N'Senior Software Engineer', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (200, N'Analyst', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (201, N'Technical Architect', N'', NULL, N'TechA', CAST(45000.00 AS Numeric(18, 2)))
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (202, N'Senior Web Designer', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (203, N'Lead Designer', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (204, N'General Manager- Marketing', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (205, N'Assistant Manager - HR', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (206, N'Senior Executive - HR', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (207, N'Trainee - HR', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (208, N'Manager - HR', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (210, N'Manager - IT Support', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (211, N'Deputy Manager - IT Support', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (212, N'Senior Executive  - IT Support', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (213, N'Assistant Manager - IT Support', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (214, N'Trainee - epoxy', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (215, N'Sr Manager - Legal & Compliance', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (216, N'Executive - Legal & Compliance', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (217, N'Designer', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (218, N'Trainee - DTP', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (219, N'AVP - Operations', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (220, N'Lead - SEPG', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (221, N'AVP - Sales', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (222, N'Manager - Sales', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (223, N'Senior Executive - Marketing', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (224, N'Assistant Manager- Sales', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (225, N'AVP - Sales & Strategy', N'', NULL, N'', NULL)
GO
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (226, N'Assistant Manager  - Sales', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (227, N'Executive - Warehouse', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (229, N'Assistant Manager - Marketing', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (230, N'GM - Sales', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (231, N'Sr Manager - Sales', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (232, N'Executive - Sales', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (233, N'Assistant Manager -Pre Sales', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (234, N'Sr. Manager - Sales', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (235, N'Executive - Marketing', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (236, N'Trainee - m1', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (237, N'Manager Sales', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (238, N'Manager SAP', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (239, N'Executive - SEO', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (240, N'Executive -  SEO', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (241, N'Manager  - Marketing', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (242, N'GM - Technology & Solutions', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (243, N'Senior QA Engineer', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (244, N'Executive - Purchase', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (246, N'National Sales - Head', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (247, N'SAP - Consultant', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (248, N'Trainee QA', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (249, N'Executive HR', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (250, N'Trainee - QA', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (251, N'Assistant Manager - Travel Desk', NULL, NULL, NULL, NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (253, N'Principal Consultant', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (254, N'Consultant - CRM', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (255, N'Lead Consultant', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (256, N'Executive SEO', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (257, N'Manager Marketing', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (258, N'Trainee', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (259, N'AVP - Technology & Solutions', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (260, N'Executive - Admin', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (261, N'Senior Executive - Admin', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (262, N'Helper', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (263, N'Labour', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (264, N'SAP PI Consultant', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (265, N'Executive - Operations', N'', NULL, N'Executive - Oprations', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (266, N'Executive - Merchant Support', N'M1 Team', NULL, N'Executive - Merchant Support', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (267, N'Associate QA Engineer', N'', NULL, N'AQAE', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (268, N'DTP Operator', N'', NULL, N'DTPO', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (269, N'Manager - Admin', N'', NULL, N'Admin', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (270, N'UI Designer', N'', NULL, N'Designer', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (271, N'Senior Designer', N'', NULL, N'Sr. Designer', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (272, N'Manager - Delivery', N'', NULL, N'Del. Manager', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (273, N'Assistant Electrician', N'', NULL, N'Electrician', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (274, N'Principal Database Architect', N'', NULL, N'Principal Database Architect', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (275, N'Trainee - QA Engineer', N'', NULL, N'Trainee', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (372, N'QC engineer', N'', NULL, N'QC engineer', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (383, N'Assistant Properitor', NULL, NULL, N'AP', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (384, N'Consultant Analyst', NULL, NULL, N'CA', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (391, N'TEST', N'', NULL, N'', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (392, N'Vice President', NULL, NULL, N'VP', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (393, N'333!qwe', N'', NULL, N'3q', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (396, N'QA Analyst', NULL, NULL, N'QA', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (397, N'Lead Quality Analyst', NULL, NULL, N'LEADQA', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (399, N'Drivers', NULL, NULL, N'DVR', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (401, N'Trainee Teacher', NULL, NULL, N'TT', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (402, N'Senior Vice President', NULL, NULL, N'SVP', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (403, N'Asst. Vice President', NULL, NULL, N'AVP', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (404, N'Sr. Practice Director', NULL, NULL, N'SPD', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (405, N'Practice Director', NULL, NULL, N'PD', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (406, N'Assistant Manager', NULL, NULL, N'AM', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (407, N'Senior Associate', NULL, NULL, N'SA', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (408, N'Associate', NULL, NULL, N'A', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (409, N'ACCOUNTS', NULL, NULL, N'ACCT', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (410, N'ASSEMBLY', NULL, NULL, N'ASBL', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (411, N'ASSISTANT', NULL, NULL, N'ASST', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (412, N'BUSINESS DEVELOPMENT', NULL, NULL, N'BD', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (413, N'BOX PACKING', NULL, NULL, N'BOPK', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (414, N'CHIEF MANAGER', NULL, NULL, N'CHMG', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (415, N'CUSTOMER RELATIONSHIP MANAGEMENT', NULL, NULL, N'CRM', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (416, N'CO-ORDINATOR', NULL, NULL, N'CORD', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (417, N'DELIVERY', NULL, NULL, N'DLVY', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (418, N'DOCUMENTATION', NULL, NULL, N'DOCT', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (419, N'DESIGN ENGINEER', NULL, NULL, N'DSGE', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (420, N'DEVELOPMENT', NULL, NULL, N'DVLP', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (421, N'ENGINEER', NULL, NULL, N'ENG', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (422, N'ERP', NULL, NULL, N'ERP', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (423, N'EXPENSE', NULL, NULL, N'EXPN', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (424, N'EXPORT', NULL, NULL, N'EXPT', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (425, N'FRONT OFFICE', NULL, NULL, N'FROF', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (426, N'GENERAL', NULL, NULL, N'GNRL', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (427, N'HEAD FINAL ASSEMLBY', NULL, NULL, N'HFAS', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (428, N'HOD OF DEPARTMENT', NULL, NULL, N'HOD', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (429, N'INCHARGE', NULL, NULL, N'INCH', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (430, N'INSPECTION', NULL, NULL, N'INSP', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (431, N'IT HELP DESK', NULL, NULL, N'ITHD', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (432, N'JUNIOR ENGINEER', NULL, NULL, N'JE', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (433, N'LATHE', NULL, NULL, N'LATH', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (434, N'MACHINE OPERATOR', NULL, NULL, N'MHOP', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (435, N'MICROBIOLOGIST', NULL, NULL, N'MICR', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (436, N'MILLING', NULL, NULL, N'MILL', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (437, N'MANAGEMENT INFORMATION SYSTEMS', NULL, NULL, N'MIS', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (438, N'MARKETING', NULL, NULL, N'MKTG', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (439, N'ONLINE NETWORK', NULL, NULL, N'ONNT', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (440, N'PACKING', NULL, NULL, N'PCK', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (441, N'PHARMA', NULL, NULL, N'PHAR', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (442, N'POUCH PACKING', NULL, NULL, N'POPK', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (443, N'PURCHASE', NULL, NULL, N'PRCH', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (444, N'PRODUCTION', NULL, NULL, N'PROD', NULL)
GO
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (445, N'QUALITY DOCUMENTATION', NULL, NULL, N'QDOC', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (446, N'RESEARCH AND DEVELOPMENT', NULL, NULL, N'R&D', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (447, N'REGULATORY', NULL, NULL, N'REGL', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (448, N'REPRESENTATIVE', NULL, NULL, N'REP', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (449, N'SALES AND SERVICE', NULL, NULL, N'SASR', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (450, N'SERVICE ENGINEER', NULL, NULL, N'SERVE', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (451, N'SUPERVISOR', NULL, NULL, N'SPVR', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (452, N'SENIOR ENGINEER', NULL, NULL, N'SRENG', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (453, N'SENIOR EXECUTIVE', NULL, NULL, N'SREX', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (454, N'SURFACE GRINDER', NULL, NULL, N'SRGR', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (455, N'STORE KEEPER', NULL, NULL, N'STKP', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (456, N'STORES', NULL, NULL, N'STRS', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (457, N'SURGICAL', NULL, NULL, N'SURG', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (458, N'SWEEPER', NULL, NULL, N'SWEP', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (459, N'SYSTEM ADMIN', NULL, NULL, N'SYAD', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (460, N'TECHNICIAN', NULL, NULL, N'TECH', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (461, N'TICKETING', NULL, NULL, N'TKTG', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (462, N'TUMBLING', NULL, NULL, N'TUMB', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (463, N'TURNING', NULL, NULL, N'TURN', NULL)
INSERT [dbo].[role] ([roleID], [name], [description], [InfrastructureCost], [Abbreviation], [PerDeskCost]) VALUES (464, N'VIDEO EDITOR', NULL, NULL, N'VDED', NULL)
SET IDENTITY_INSERT [dbo].[role] OFF
ALTER TABLE [dbo].[additional_information]  WITH CHECK ADD  CONSTRAINT [FK_additional_information_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[additional_information] CHECK CONSTRAINT [FK_additional_information_employee_details]
GO
ALTER TABLE [dbo].[certifications]  WITH CHECK ADD  CONSTRAINT [FK_certifications_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[certifications] CHECK CONSTRAINT [FK_certifications_employee_details]
GO
ALTER TABLE [dbo].[educational_qualifications]  WITH CHECK ADD  CONSTRAINT [FK_educational_qualifications_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[educational_qualifications] CHECK CONSTRAINT [FK_educational_qualifications_employee_details]
GO
ALTER TABLE [dbo].[employee_refcheck]  WITH CHECK ADD  CONSTRAINT [FK_employee_refcheck_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[employee_refcheck] CHECK CONSTRAINT [FK_employee_refcheck_employee_details]
GO
ALTER TABLE [dbo].[epfo_details]  WITH CHECK ADD  CONSTRAINT [FK_epfo_details_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[epfo_details] CHECK CONSTRAINT [FK_epfo_details_employee_details]
GO
ALTER TABLE [dbo].[esic_details]  WITH CHECK ADD  CONSTRAINT [FK_esic_details_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[esic_details] CHECK CONSTRAINT [FK_esic_details_employee_details]
GO
ALTER TABLE [dbo].[family_details]  WITH CHECK ADD  CONSTRAINT [FK_family_details_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[family_details] CHECK CONSTRAINT [FK_family_details_employee_details]
GO
ALTER TABLE [dbo].[feedback]  WITH CHECK ADD  CONSTRAINT [FK_feedback_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[feedback] CHECK CONSTRAINT [FK_feedback_employee_details]
GO
ALTER TABLE [dbo].[other_details]  WITH CHECK ADD  CONSTRAINT [FK_employee_references_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[other_details] CHECK CONSTRAINT [FK_employee_references_employee_details]
GO
ALTER TABLE [dbo].[prev_employ_1]  WITH CHECK ADD  CONSTRAINT [FK_prev_employ_1_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[prev_employ_1] CHECK CONSTRAINT [FK_prev_employ_1_employee_details]
GO
ALTER TABLE [dbo].[prev_employ_2]  WITH CHECK ADD  CONSTRAINT [FK_prev_employ_2_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[prev_employ_2] CHECK CONSTRAINT [FK_prev_employ_2_employee_details]
GO
ALTER TABLE [dbo].[prev_employ_3]  WITH CHECK ADD  CONSTRAINT [FK_prev_employ_3_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[prev_employ_3] CHECK CONSTRAINT [FK_prev_employ_3_employee_details]
GO
ALTER TABLE [dbo].[prev_employ_4]  WITH CHECK ADD  CONSTRAINT [FK_prev_employ_4_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[prev_employ_4] CHECK CONSTRAINT [FK_prev_employ_4_employee_details]
GO
ALTER TABLE [dbo].[prev_employ_5]  WITH CHECK ADD  CONSTRAINT [FK_prev_employ_5_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[prev_employ_5] CHECK CONSTRAINT [FK_prev_employ_5_employee_details]
GO
ALTER TABLE [dbo].[previous_company_details]  WITH CHECK ADD  CONSTRAINT [FK_previous_company_details_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[previous_company_details] CHECK CONSTRAINT [FK_previous_company_details_employee_details]
GO
ALTER TABLE [dbo].[references]  WITH CHECK ADD  CONSTRAINT [FK_references_employee_details] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employee_details] ([employee_id])
GO
ALTER TABLE [dbo].[references] CHECK CONSTRAINT [FK_references_employee_details]
GO
USE [master]
GO
ALTER DATABASE [hrinnova_db] SET  READ_WRITE 
GO
