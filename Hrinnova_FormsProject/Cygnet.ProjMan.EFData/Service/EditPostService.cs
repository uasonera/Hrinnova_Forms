using Cygnet.ProjMan.EFData.DataSource;
using Cygnet.ProjMan.EFData.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cygnet.ProjMan.EFData.Service
{
    public class EditPostService
    {
        public void EditPostforEmployeeDetails(employee_detailsModel Employee_detailsModel, employee_details entity)
        {
            entity.employee_code = Employee_detailsModel.employee_code;
            entity.designation = Employee_detailsModel.designation;
            entity.department = Employee_detailsModel.department;
            entity.firstname = Employee_detailsModel.firstname;
            entity.middlename = Employee_detailsModel.middlename;
            entity.surname = Employee_detailsModel.surname;
            entity.gender = Employee_detailsModel.gender;
            entity.date_of_birth = Employee_detailsModel.date_of_birth;
            entity.date_of_joining = Employee_detailsModel.date_of_joining;
            entity.marital_status = Employee_detailsModel.marital_status;
            entity.marriage_anniversary = Employee_detailsModel.marriage_anniversary;
            entity.blood_group = Employee_detailsModel.blood_group;
            entity.mobile_number = Employee_detailsModel.mobile_number;
            entity.home_number = Employee_detailsModel.home_number;
            entity.alternate_number = Employee_detailsModel.alternate_number;
            entity.emergency_number = Employee_detailsModel.emergency_number;
            entity.email_id = Employee_detailsModel.email_id;
            entity.permanent_address = Employee_detailsModel.permanent_address;
            entity.temporary_address = Employee_detailsModel.temporary_address;
            entity.aadhar_card = Employee_detailsModel.aadhar_card;
            entity.pan_card = Employee_detailsModel.pan_card;
            entity.passport_number = Employee_detailsModel.passport_number;
            entity.passport_validity = Employee_detailsModel.passport_validity;
            entity.election_card = Employee_detailsModel.election_card;
            entity.vehicle_number = Employee_detailsModel.vehicle_number;
            entity.single_bank_account = Employee_detailsModel.single_bank_account;
            entity.ifs_code = Employee_detailsModel.ifs_code;
            entity.allergies = Employee_detailsModel.allergies;
            entity.known_ailments = Employee_detailsModel.known_ailments;
            entity.roleID = Employee_detailsModel.roleID;
            entity.DeptID = Employee_detailsModel.DeptID;
        }
        public void EditPostforAdditionalInformation(additional_informationModel Additional_informationModel, additional_information entity)
        {
            entity.known_to_presentemployee = Additional_informationModel.known_to_presentemployee;
            entity.name_of_knownemployee = Additional_informationModel.name_of_knownemployee;
            entity.relationship_with_knownemployee = Additional_informationModel.relationship_with_knownemployee;
            entity.periodworked_from = Additional_informationModel.periodworked_from;
            entity.periodworked_to = Additional_informationModel.periodworked_to;
            entity.roleID = Additional_informationModel.roleID;
            entity.DeptID = Additional_informationModel.DeptID;
        }
        public void EditPostforCertifications(certificationsModel CertificationsModel, certifications entity)
        {

            entity.certification_name = CertificationsModel.certification_name;
        }
        public void EditPostforEducationalQualifications(educational_qualificationsModel Educational_qualificationsModel, educational_qualifications entity)
        {
            entity.tenth_school = Educational_qualificationsModel.tenth_school;
            entity.tenth_board = Educational_qualificationsModel.tenth_board;
            entity.tenth_grade = Educational_qualificationsModel.tenth_grade;
            entity.tenth_yearofpassing = Educational_qualificationsModel.tenth_yearofpassing;

            entity.twelfth_school = Educational_qualificationsModel.twelfth_school;
            entity.twelfth_board = Educational_qualificationsModel.twelfth_board;
            entity.twelfth_grade = Educational_qualificationsModel.twelfth_grade;
            entity.twelfth_yearofpassing = Educational_qualificationsModel.twelfth_yearofpassing;

            entity.bachelors_college = Educational_qualificationsModel.bachelors_college;
            entity.bachelors_university = Educational_qualificationsModel.bachelors_university;
            entity.bachelors_grade = Educational_qualificationsModel.bachelors_grade;
            entity.bachelors_yearofpassing = Educational_qualificationsModel.bachelors_yearofpassing;

            entity.masters_college = Educational_qualificationsModel.masters_college;
            entity.masters_university = Educational_qualificationsModel.masters_university;
            entity.masters_grade = Educational_qualificationsModel.masters_grade;
            entity.masters_yearofpassing = Educational_qualificationsModel.masters_yearofpassing;

            entity.other_school = Educational_qualificationsModel.other_school;
            entity.other_board = Educational_qualificationsModel.other_board;
            entity.other_grade = Educational_qualificationsModel.other_grade;
            entity.other_yearofpassing = Educational_qualificationsModel.other_yearofpassing;
        }
        public void EditPostforEpfoDetails(epfo_detailsModel Epfo_detailsModel, epfo_details entity)
        {
            entity.presentcompany_pfnumber = Epfo_detailsModel.presentcompany_pfnumber;
            entity.member_of_epfoscheme = Epfo_detailsModel.member_of_epfoscheme;
            entity.member_of_epsscheme = Epfo_detailsModel.member_of_epsscheme;
            entity.universal_account_number = Epfo_detailsModel.universal_account_number;
            entity.prev_pf_acc_number = Epfo_detailsModel.prev_pf_acc_number;
            entity.scheme_certificate_number = Epfo_detailsModel.scheme_certificate_number;
            entity.ppo_number = Epfo_detailsModel.ppo_number;
            entity.international_worker = Epfo_detailsModel.international_worker;
            entity.country_of_origin = Epfo_detailsModel.country_of_origin;
        }
        public void EditPostforEsicDetails(esic_detailsModel Esic_detailsModel, esic_details entity)
        {
            entity.insurance_number = Esic_detailsModel.insurance_number;
            entity.branch_office = Esic_detailsModel.branch_office;
            entity.dispensary = Esic_detailsModel.dispensary;
            entity.employers_code = Esic_detailsModel.employers_code;
            entity.date_of_appointment = Esic_detailsModel.date_of_appointment;
            entity.employers_nameandaddress = Esic_detailsModel.employers_nameandaddress;
            entity.previous_insurance_number = Esic_detailsModel.previous_insurance_number;
            entity.name_of_nominee = Esic_detailsModel.name_of_nominee;
            entity.nominee_relationship = Esic_detailsModel.nominee_relationship;
            entity.nominee_address = Esic_detailsModel.nominee_address;
        }
        public void EditPostforFamilyDetails(family_detailsModel Family_detailsModel, family_details entity)
        {
            entity.fname = Family_detailsModel.fname;
            entity.fdateofbirth = Family_detailsModel.fdateofbirth;
            entity.faadhar = Family_detailsModel.faadhar;
            entity.fcontact = Family_detailsModel.fcontact;
            entity.foccupation = Family_detailsModel.foccupation;
            entity.freside = Family_detailsModel.freside;
            entity.ftown = Family_detailsModel.ftown;
            entity.fstate = Family_detailsModel.fstate;
        }
        public void EditPostforFeedback(feedbackModel FeedbackModel, feedback entity)
        {
            entity.hr_manual = FeedbackModel.hr_manual;
            entity.cims_idpassword = FeedbackModel.cims_idpassword;
            entity.books = FeedbackModel.books;
            entity.library_card = FeedbackModel.library_card;
            entity.hr_anyother = FeedbackModel.hr_anyother;
            entity.identitycard = FeedbackModel.identitycard;
            entity.bank_account = FeedbackModel.bank_account;
            entity.notepad = FeedbackModel.notepad;
            entity.pen = FeedbackModel.pen;
            entity.employee_card = FeedbackModel.employee_card;
            entity.admin_anyother = FeedbackModel.admin_anyother;
            entity.computer_system = FeedbackModel.computer_system;
            entity.headphones = FeedbackModel.headphones;
            entity.emailid_password = FeedbackModel.emailid_password;
            entity.network_ip = FeedbackModel.network_ip;
            entity.firewall_id = FeedbackModel.firewall_id;
            entity.domain_usernamepassword = FeedbackModel.domain_usernamepassword;
            entity.messengers_access = FeedbackModel.messengers_access;
            entity.systemadmin_anyother = FeedbackModel.systemadmin_anyother;
            entity.hrmanual_and_responsibilities = FeedbackModel.hrmanual_and_responsibilities;
        }
        public void EditPostforOtherDetails(other_detailsModel Other_detailsModel, other_details entity)
        {
            entity.propertyowner_name = Other_detailsModel.propertyowner_name;
            entity.propertyowner_contact = Other_detailsModel.propertyowner_contact;
            entity.propertyowner_address = Other_detailsModel.propertyowner_address;
            entity.propertyowner_occupation = Other_detailsModel.propertyowner_occupation;
            entity.neighbour1_name = Other_detailsModel.neighbour1_name;
            entity.neighbour1_contact = Other_detailsModel.neighbour1_contact;
            entity.neighbour1_address = Other_detailsModel.neighbour1_address;
            entity.neighbour1_occupation = Other_detailsModel.neighbour1_occupation;
            entity.neighbour2_name = Other_detailsModel.neighbour2_name;
            entity.neighbour2_contact = Other_detailsModel.neighbour2_contact;
            entity.neighbour2_address = Other_detailsModel.neighbour2_address;
            entity.neighbour2_occupation = Other_detailsModel.neighbour2_occupation;
        }
        public void EditPostforPreviousCompanyDetails(previous_company_detailsModel Previous_company_detailsModel, previous_company_details entity)
        {
            entity.pf_account_number = Previous_company_detailsModel.pf_account_number;
            entity.fps_account_number = Previous_company_detailsModel.fps_account_number;
            entity.pf_employers_code_number = Previous_company_detailsModel.pf_employers_code_number;
            entity.life_insurance = Previous_company_detailsModel.life_insurance;
            entity.esi_employers_code_number = Previous_company_detailsModel.esi_employers_code_number;
            entity.esi_insurance_number = Previous_company_detailsModel.esi_insurance_number;
            entity.mediclaim = Previous_company_detailsModel.mediclaim;
        }
        public void EditPostforPreviousEmployment(prev_employ_1Model Prev_employ_1Model, prev_employ_1 entity)
        {
            entity.employers_name = Prev_employ_1Model.employers_name;
            entity.designation = Prev_employ_1Model.designation;
            entity.periodworked_from = Prev_employ_1Model.periodworked_from;
            entity.periodworked_to = Prev_employ_1Model.periodworked_to;
            entity.reason_of_leaving = Prev_employ_1Model.reason_of_leaving;
            entity.reporting_manager = Prev_employ_1Model.reporting_manager;
            entity.rm_designation = Prev_employ_1Model.rm_designation;
            entity.rm_contact = Prev_employ_1Model.rm_contact;
            entity.ctc = Prev_employ_1Model.ctc;
            entity.monthly_gross_salary = Prev_employ_1Model.monthly_gross_salary;
            entity.attendence = Prev_employ_1Model.attendence;
            entity.re_hire_status = Prev_employ_1Model.re_hire_status;
        }
        public void EditPostforReferences(referencesModel ReferencesModel, references entity)
        {
            entity.name = ReferencesModel.name;
            entity.address = ReferencesModel.address;
            entity.designation = ReferencesModel.designation;
        }
    }
}
