using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Cygnet.ProjMan.EFData.DataSource;

namespace Cygnet.ProjMan.EFData.ViewModels
{
    /// <summary>
    /// Class Mapper.
    /// </summary>
    public class Mapper
    {
        /// <summary>
        /// Converts to.
        /// </summary>
        /// <param name="employee_detailsModel">The employee details model.</param>
        /// <returns>employee_details.</returns>
        /// 

        public static  employee_details ConvertTo(employee_detailsModel employee_detailsModel)
        {

            return new employee_details()
            {
                employee_id = employee_detailsModel.employee_id,
                employee_code = employee_detailsModel.employee_code,
                roleID = employee_detailsModel.roleID,
                DeptID = employee_detailsModel.DeptID,
                firstname = employee_detailsModel.firstname,
                middlename = employee_detailsModel.middlename,
                surname = employee_detailsModel.surname,
                gender = employee_detailsModel.gender,
                date_of_birth = employee_detailsModel.date_of_birth,
                date_of_joining = employee_detailsModel.date_of_joining,
                marital_status = employee_detailsModel.marital_status,
                marriage_anniversary = employee_detailsModel.marriage_anniversary,
                blood_group = employee_detailsModel.blood_group,
                mobile_number = employee_detailsModel.mobile_number,
                alternate_number=employee_detailsModel.alternate_number,
                emergency_number = employee_detailsModel.emergency_number,
                home_number=employee_detailsModel.home_number,
                email_id=employee_detailsModel.email_id,
                permanent_address=employee_detailsModel.permanent_address,
                temporary_address=employee_detailsModel.temporary_address,
                aadhar_card=employee_detailsModel.aadhar_card,
                passport_number=employee_detailsModel.passport_number,
                passport_validity=employee_detailsModel.passport_validity,
                pan_card=employee_detailsModel.pan_card,
                election_card = employee_detailsModel.election_card,
                single_bank_account=employee_detailsModel.single_bank_account,
                ifs_code=employee_detailsModel.ifs_code,
                vehicle_number =employee_detailsModel.vehicle_number,
                allergies=employee_detailsModel.allergies,
                known_ailments=employee_detailsModel.known_ailments
            };
        }
        /// <summary>
        /// Converts from.
        /// </summary>
        /// <param name="employee_details">The employee details.</param>
        /// <returns>employee_detailsModel.</returns>
        public static employee_detailsModel ConvertFrom(employee_details employee_details)
        {

            return new employee_detailsModel()
            {
                employee_code = employee_details.employee_code,
                roleID = employee_details.roleID,
                DeptID = employee_details.DeptID,
                firstname = employee_details.firstname,
                middlename = employee_details.middlename,
                surname = employee_details.surname,
                gender = employee_details.gender,
                date_of_birth = employee_details.date_of_birth,
                date_of_joining = employee_details.date_of_joining,
                marital_status = employee_details.marital_status,
                marriage_anniversary = employee_details.marriage_anniversary,
                blood_group = employee_details.blood_group,
                mobile_number = employee_details.mobile_number,
                alternate_number = employee_details.alternate_number,
                emergency_number = employee_details.emergency_number,
                home_number = employee_details.home_number,
                email_id = employee_details.email_id,
                permanent_address = employee_details.permanent_address,
                temporary_address = employee_details.temporary_address,
                aadhar_card = employee_details.aadhar_card,
                passport_number = employee_details.passport_number,
                passport_validity = employee_details.passport_validity,
                pan_card = employee_details.pan_card,
                election_card = employee_details.election_card,
                single_bank_account = employee_details.single_bank_account,
                ifs_code = employee_details.ifs_code,
                vehicle_number = employee_details.vehicle_number,
                allergies = employee_details.allergies,
                known_ailments = employee_details.known_ailments
            };
        }
        /// <summary>
        /// Converts to.
        /// </summary>
        /// <param name="additional_informationModel">The additional information model.</param>
        /// <returns>additional_information.</returns>
        public static additional_information ConvertTo(additional_informationModel additional_informationModel)
        {
            
            return new additional_information()
            {
                
                known_to_presentemployee = additional_informationModel.known_to_presentemployee,
                name_of_knownemployee = additional_informationModel.name_of_knownemployee,
                relationship_with_knownemployee = additional_informationModel.relationship_with_knownemployee,
                periodworked_from = additional_informationModel.periodworked_from,
                periodworked_to = additional_informationModel.periodworked_to,
                roleID = additional_informationModel.roleID,
                DeptID = additional_informationModel.DeptID
            };
        }
        /// <summary>
        /// Converts from.
        /// </summary>
        /// <param name="additional_information">The additional information.</param>
        /// <returns>additional_informationModel.</returns>
        public static additional_informationModel ConvertFrom(additional_information additional_information)
        {
            if (additional_information == null)
            {
                additional_information = new additional_information();
            }
            return new additional_informationModel()
            {
                known_to_presentemployee = additional_information.known_to_presentemployee,
                name_of_knownemployee = additional_information.name_of_knownemployee,
                relationship_with_knownemployee = additional_information.relationship_with_knownemployee,
                periodworked_from = additional_information.periodworked_from,
                periodworked_to = additional_information.periodworked_to,
                roleID = additional_information.roleID,
                DeptID = additional_information.DeptID
            };
        }
        /// <summary>
        /// Converts to.
        /// </summary>
        /// <param name="certificationsModel">The certifications model.</param>
        /// <returns>certifications.</returns>
        public static certifications ConvertTo(certificationsModel certificationsModel)
        {
            return new certifications()
            {
                cert_type = certificationsModel.cert_type,
                certification_name = certificationsModel.certification_name
            };
        }
        /// <summary>
        /// Converts from.
        /// </summary>
        /// <param name="certifications">The certifications.</param>
        /// <returns>certificationsModel.</returns>
        public static certificationsModel ConvertFrom(certifications certifications)
        {
            if (certifications == null) {
                certifications = new certifications();
            }

            return new certificationsModel()
            {
                cert_type = certifications.cert_type,
                certification_name = certifications.certification_name
            };
        }

        /// <summary>
        /// Converts to.
        /// </summary>
        /// <param name="educational_qualificationsModel">The educational qualifications model.</param>
        /// <returns>educational_qualifications.</returns>
        public static educational_qualifications ConvertTo(educational_qualificationsModel educational_qualificationsModel)
        {
            return new educational_qualifications()
            {
                tenth_school = educational_qualificationsModel.tenth_school,
                tenth_board = educational_qualificationsModel.tenth_board,
                tenth_grade = educational_qualificationsModel.tenth_grade,
                tenth_yearofpassing = educational_qualificationsModel.tenth_yearofpassing,
                twelfth_school = educational_qualificationsModel.twelfth_school,
                twelfth_board = educational_qualificationsModel.twelfth_board,
                twelfth_grade = educational_qualificationsModel.twelfth_grade,
                twelfth_yearofpassing = educational_qualificationsModel.twelfth_yearofpassing,
                bachelors_college = educational_qualificationsModel.bachelors_college,
                bachelors_university = educational_qualificationsModel.bachelors_university,
                bachelors_grade = educational_qualificationsModel.bachelors_grade,
                bachelors_yearofpassing = educational_qualificationsModel.bachelors_yearofpassing,
                masters_college = educational_qualificationsModel.masters_college,
                masters_university = educational_qualificationsModel.masters_university,
                masters_grade = educational_qualificationsModel.masters_grade,
                masters_yearofpassing = educational_qualificationsModel.masters_yearofpassing,

            };
        }
        /// <summary>
        /// Converts from.
        /// </summary>
        /// <param name="educational_qualifications">The educational qualifications.</param>
        /// <returns>educational_qualificationsModel.</returns>
        public static educational_qualificationsModel ConvertFrom(educational_qualifications educational_qualifications)
        {
            if (educational_qualifications == null)
            {
                educational_qualifications = new educational_qualifications();
            }
            return new educational_qualificationsModel()
            {
                tenth_school = educational_qualifications.tenth_school,
                tenth_board = educational_qualifications.tenth_board,
                tenth_grade = educational_qualifications.tenth_grade,
                tenth_yearofpassing = educational_qualifications.tenth_yearofpassing,
                twelfth_school = educational_qualifications.twelfth_school,
                twelfth_board = educational_qualifications.twelfth_board,
                twelfth_grade = educational_qualifications.twelfth_grade,
                twelfth_yearofpassing = educational_qualifications.twelfth_yearofpassing,
                bachelors_college = educational_qualifications.bachelors_college,
                bachelors_university = educational_qualifications.bachelors_university,
                bachelors_grade = educational_qualifications.bachelors_grade,
                bachelors_yearofpassing = educational_qualifications.bachelors_yearofpassing,
                masters_college = educational_qualifications.masters_college,
                masters_university = educational_qualifications.masters_university,
                masters_grade = educational_qualifications.masters_grade,
                masters_yearofpassing = educational_qualifications.masters_yearofpassing,

            };
        }
        /// <summary>
        /// Converts to.
        /// </summary>
        /// <param name="employee_refcheckModel">The employee refcheck model.</param>
        /// <returns>employee_refcheck.</returns>
        public static employee_refcheck ConvertTo(employee_refcheckModel employee_refcheckModel)
        {
            return new employee_refcheck()
            {
                attendence = employee_refcheckModel.attendence,
                details_furnished_by = employee_refcheckModel.details_furnished_by,
                monthly_salary = employee_refcheckModel.monthly_salary,
                previous_company_address = employee_refcheckModel.previous_company_address,
                previous_company_name = employee_refcheckModel.previous_company_name,
                reason_for_leaving = employee_refcheckModel.reason_for_leaving,
                refcheck_id = employee_refcheckModel.refcheck_id,
                reporting_to = employee_refcheckModel.reporting_to,
                reporting_designation = employee_refcheckModel.reporting_designation,
                re_hire_status = employee_refcheckModel.re_hire_status,
                verified_by_date = employee_refcheckModel.verified_by_date,
                verified_by_name = employee_refcheckModel.verified_by_name
            };
        }
        /// <summary>
        /// Converts from.
        /// </summary>
        /// <param name="employee_refcheck">The employee refcheck.</param>
        /// <returns>employee_refcheckModel.</returns>
        public static employee_refcheckModel ConvertFrom(employee_refcheck employee_refcheck)
        {
            if (employee_refcheck == null)
            {
                employee_refcheck = new employee_refcheck();
            }
            return new employee_refcheckModel()
            {
                attendence = employee_refcheck.attendence,
                details_furnished_by = employee_refcheck.details_furnished_by,
                monthly_salary = employee_refcheck.monthly_salary,
                previous_company_address = employee_refcheck.previous_company_address,
                previous_company_name = employee_refcheck.previous_company_name,
                reason_for_leaving = employee_refcheck.reason_for_leaving,
                refcheck_id = employee_refcheck.refcheck_id,
                reporting_to = employee_refcheck.reporting_to,
                reporting_designation = employee_refcheck.reporting_designation,
                re_hire_status = employee_refcheck.re_hire_status,
                verified_by_date = employee_refcheck.verified_by_date,
                verified_by_name = employee_refcheck.verified_by_name
            };
        }
        /// <summary>
        /// Converts to.
        /// </summary>
        /// <param name="epfo_detailsModel">The epfo details model.</param>
        /// <returns>epfo_details.</returns>
        public static epfo_details ConvertTo(epfo_detailsModel epfo_detailsModel)
        {
            return new epfo_details()
            {
                universal_account_number = epfo_detailsModel.universal_account_number,
                scheme_certificate_number = epfo_detailsModel.scheme_certificate_number,
                presentcompany_pfnumber = epfo_detailsModel.presentcompany_pfnumber,
                prev_pf_acc_number = epfo_detailsModel.prev_pf_acc_number,
                ppo_number = epfo_detailsModel.ppo_number,
                member_of_epfoscheme = epfo_detailsModel.member_of_epfoscheme,
                member_of_epsscheme = epfo_detailsModel.member_of_epsscheme,
                international_worker = epfo_detailsModel.international_worker,
                country_of_origin = epfo_detailsModel.country_of_origin
            };
        }
        /// <summary>
        /// Converts from.
        /// </summary>
        /// <param name="epfo_details">The epfo details.</param>
        /// <returns>epfo_detailsModel.</returns>
        public static epfo_detailsModel ConvertFrom(epfo_details epfo_details)
        {
            if (epfo_details == null)
            {
                epfo_details = new epfo_details();
            }
            return new epfo_detailsModel()
            {
                universal_account_number = epfo_details.universal_account_number,
                scheme_certificate_number = epfo_details.scheme_certificate_number,
                presentcompany_pfnumber = epfo_details.presentcompany_pfnumber,
                prev_pf_acc_number = epfo_details.prev_pf_acc_number,
                ppo_number = epfo_details.ppo_number,
                member_of_epfoscheme = epfo_details.member_of_epfoscheme,
                member_of_epsscheme = epfo_details.member_of_epsscheme,
                international_worker = epfo_details.international_worker,
                country_of_origin = epfo_details.country_of_origin
            };
        }
        /// <summary>
        /// Converts to.
        /// </summary>
        /// <param name="esic_detailsModel">The esic details model.</param>
        /// <returns>esic_details.</returns>
        public static esic_details ConvertTo(esic_detailsModel esic_detailsModel)
        {
            return new esic_details()
            {
                insurance_number = esic_detailsModel.insurance_number,
                branch_office = esic_detailsModel.branch_office,
                date_of_appointment = esic_detailsModel.date_of_appointment,
                dispensary = esic_detailsModel.dispensary,
                employers_code = esic_detailsModel.employers_code,
                employers_nameandaddress = esic_detailsModel.employers_nameandaddress,
                name_of_nominee = esic_detailsModel.name_of_nominee,
                nominee_address = esic_detailsModel.nominee_address,
                nominee_relationship = esic_detailsModel.nominee_relationship,
                previous_insurance_number = esic_detailsModel.previous_insurance_number,
            };
        }
        /// <summary>
        /// Converts from.
        /// </summary>
        /// <param name="esic_details">The esic details.</param>
        /// <returns>esic_detailsModel.</returns>
        public static esic_detailsModel ConvertFrom(esic_details esic_details)
        {
            if (esic_details == null)
            {
                esic_details = new esic_details();
            }
            return new esic_detailsModel()
            {
                insurance_number = esic_details.insurance_number,
                branch_office = esic_details.branch_office,
                date_of_appointment = esic_details.date_of_appointment,
                dispensary = esic_details.dispensary,
                employers_code = esic_details.employers_code,
                employers_nameandaddress = esic_details.employers_nameandaddress,
                name_of_nominee = esic_details.name_of_nominee,
                nominee_address = esic_details.nominee_address,
                nominee_relationship = esic_details.nominee_relationship,
                previous_insurance_number = esic_details.previous_insurance_number,
            };
        }

        /// <summary>
        /// Converts to.
        /// </summary>
        /// <param name="family_detailsModel">The family details model.</param>
        /// <returns>family_details.</returns>
        public static family_details ConvertTo(family_detailsModel family_detailsModel)
        {
            return new family_details()
            {
                familydet_id = family_detailsModel.familydet_id,
                fstate = family_detailsModel.fstate,
                ftown = family_detailsModel.ftown,
                member = family_detailsModel.member,
                fname = family_detailsModel.fname,
                faadhar = family_detailsModel.faadhar,
                fcontact = family_detailsModel.fcontact,
                fdateofbirth = family_detailsModel.fdateofbirth,
                foccupation = family_detailsModel.foccupation,
                freside = family_detailsModel.freside,
            };
        }
        /// <summary>
        /// Converts from.
        /// </summary>
        /// <param name="family_details">The family details.</param>
        /// <returns>family_detailsModel.</returns>
        public static family_detailsModel ConvertFrom(family_details family_details)
        {
            if (family_details == null)
            {
                family_details = new family_details();
            }
            return new family_detailsModel()
            {
                familydet_id = family_details.familydet_id,
                fstate = family_details.fstate,
                ftown = family_details.ftown,
                member = family_details.member,
                fname = family_details.fname,
                faadhar = family_details.faadhar,
                fcontact = family_details.fcontact,
                fdateofbirth = family_details.fdateofbirth,
                foccupation = family_details.foccupation,
                freside = family_details.freside,
            };
        }

        /// <summary>
        /// Converts to.
        /// </summary>
        /// <param name="feedbackModel">The feedback model.</param>
        /// <returns>feedback.</returns>
        public static feedback ConvertTo(feedbackModel feedbackModel)
        {
            feedbackModel = new feedbackModel();
                return new feedback()
                {
                    hr_manual = feedbackModel.hr_manual,
                    cims_idpassword = feedbackModel.cims_idpassword,
                    books = feedbackModel.books,
                    identitycard = feedbackModel.identitycard,
                    library_card = feedbackModel.library_card,
                    hr_anyother = feedbackModel.hr_anyother,
                    bank_account = feedbackModel.bank_account,
                    notepad = feedbackModel.notepad,
                    pen = feedbackModel.pen,
                    employee_card = feedbackModel.employee_card,
                    admin_anyother = feedbackModel.admin_anyother,
                    computer_system = feedbackModel.computer_system,
                    headphones = feedbackModel.headphones,
                    emailid_password = feedbackModel.emailid_password,
                    network_ip = feedbackModel.network_ip,
                    firewall_id = feedbackModel.firewall_id,
                    domain_usernamepassword = feedbackModel.domain_usernamepassword,
                    messengers_access = feedbackModel.messengers_access,
                    systemadmin_anyother = feedbackModel.systemadmin_anyother,
                    hrmanual_and_responsibilities = feedbackModel.hrmanual_and_responsibilities
                };
            
        }
        /// <summary>
        /// Converts from.
        /// </summary>
        /// <param name="feedback">The feedback.</param>
        /// <returns>feedbackModel.</returns>
        public static feedbackModel ConvertFrom(feedback feedback)
        {
            if (feedback == null)
            {
                feedback = new feedback();
            }
            return new feedbackModel()
            {
                hr_manual = feedback.hr_manual,
                cims_idpassword = feedback.cims_idpassword,
                books = feedback.books,
                identitycard = feedback.identitycard,
                library_card = feedback.library_card,
                hr_anyother = feedback.hr_anyother,
                bank_account = feedback.bank_account,
                notepad = feedback.notepad,
                pen = feedback.pen,
                employee_card = feedback.employee_card,
                admin_anyother = feedback.admin_anyother,
                computer_system = feedback.computer_system,
                headphones = feedback.headphones,
                emailid_password = feedback.emailid_password,
                network_ip = feedback.network_ip,
                firewall_id = feedback.firewall_id,
                domain_usernamepassword = feedback.domain_usernamepassword,
                messengers_access = feedback.messengers_access,
                systemadmin_anyother = feedback.systemadmin_anyother,
                hrmanual_and_responsibilities = feedback.hrmanual_and_responsibilities
            };
        }
        /// <summary>
        /// Converts to.
        /// </summary>
        /// <param name="other_detailsModel">The other details model.</param>
        /// <returns>other_details.</returns>
        public static other_details ConvertTo(other_detailsModel other_detailsModel)
        {
            return new other_details()
            {
                propertyowner_name = other_detailsModel.propertyowner_name,
                propertyowner_contact = other_detailsModel.propertyowner_contact,
                propertyowner_address = other_detailsModel.propertyowner_address,
                propertyowner_occupation = other_detailsModel.propertyowner_occupation,
                neighbour1_name = other_detailsModel.neighbour1_name,
                neighbour1_contact = other_detailsModel.neighbour1_contact,
                neighbour1_address = other_detailsModel.neighbour1_address,
                neighbour1_occupation = other_detailsModel.neighbour1_occupation,
                neighbour2_name = other_detailsModel.neighbour2_name,
                neighbour2_contact = other_detailsModel.neighbour2_contact,
                neighbour2_address = other_detailsModel.neighbour2_address,
                neighbour2_occupation = other_detailsModel.neighbour2_occupation,
            };
        }
        /// <summary>
        /// Converts from.
        /// </summary>
        /// <param name="other_details">The other details.</param>
        /// <returns>other_detailsModel.</returns>
        public static other_detailsModel ConvertFrom(other_details other_details)
        {
            if (other_details == null)
            {
                other_details = new other_details();
            }
            return new other_detailsModel()
            {
                propertyowner_name = other_details.propertyowner_name,
                propertyowner_contact = other_details.propertyowner_contact,
                propertyowner_address = other_details.propertyowner_address,
                propertyowner_occupation = other_details.propertyowner_occupation,
                neighbour1_name = other_details.neighbour1_name,
                neighbour1_contact = other_details.neighbour1_contact,
                neighbour1_address = other_details.neighbour1_address,
                neighbour1_occupation = other_details.neighbour1_occupation,
                neighbour2_name = other_details.neighbour2_name,
                neighbour2_contact = other_details.neighbour2_contact,
                neighbour2_address = other_details.neighbour2_address,
                neighbour2_occupation = other_details.neighbour2_occupation,
            };
        }
        /// <summary>
        /// Converts to.
        /// </summary>
        /// <param name="prev_employ_1Model">The previous employ 1 model.</param>
        /// <returns>prev_employ_1.</returns>
        public static prev_employ_1 ConvertTo(prev_employ_1Model prev_employ_1Model)
        {
            return new prev_employ_1()
            {
                employers_name = prev_employ_1Model.employers_name,
                designation = prev_employ_1Model.designation,
                periodworked_from = prev_employ_1Model.periodworked_from,
                periodworked_to = prev_employ_1Model.periodworked_to,
                reason_of_leaving = prev_employ_1Model.reason_of_leaving,
                reporting_manager = prev_employ_1Model.reporting_manager,
                rm_designation = prev_employ_1Model.rm_designation,
                rm_contact = prev_employ_1Model.rm_contact,
                ctc = prev_employ_1Model.ctc,
                monthly_gross_salary = prev_employ_1Model.monthly_gross_salary,
                pr_employee_id = prev_employ_1Model.pr_employee_id,
                attendence = prev_employ_1Model.attendence,
                re_hire_status = prev_employ_1Model.re_hire_status,
                employment_ref=prev_employ_1Model.employment_ref
                
            };
        }
        /// <summary>
        /// Converts from.
        /// </summary>
        /// <param name="prev_employ_1">The previous employ 1.</param>
        /// <returns>prev_employ_1Model.</returns>
        public static prev_employ_1Model ConvertFrom(prev_employ_1 prev_employ_1)
        {
            if (prev_employ_1 == null)
            {
                prev_employ_1 = new prev_employ_1();
            }
            return new prev_employ_1Model()
            {
                employers_name = prev_employ_1.employers_name,
                designation = prev_employ_1.designation,
                periodworked_from = prev_employ_1.periodworked_from,
                periodworked_to = prev_employ_1.periodworked_to,
                reason_of_leaving = prev_employ_1.reason_of_leaving,
                reporting_manager = prev_employ_1.reporting_manager,
                rm_designation = prev_employ_1.rm_designation,
                rm_contact = prev_employ_1.rm_contact,
                ctc = prev_employ_1.ctc,
                monthly_gross_salary = prev_employ_1.monthly_gross_salary,
                pr_employee_id = prev_employ_1.pr_employee_id,
                attendence = prev_employ_1.attendence,
                re_hire_status = prev_employ_1.re_hire_status,
                employment_ref=prev_employ_1.employment_ref
                
            };
        }
        /// <summary>
        /// Converts to.
        /// </summary>
        /// <param name="previous_company_detailsModel">The previous company details model.</param>
        /// <returns>previous_company_details.</returns>
        public static previous_company_details ConvertTo(previous_company_detailsModel previous_company_detailsModel)
        {
            return new previous_company_details()
            {
                pf_account_number = previous_company_detailsModel.pf_account_number,
                pf_employers_code_number = previous_company_detailsModel.pf_employers_code_number,
                fps_account_number = previous_company_detailsModel.fps_account_number,
                life_insurance = previous_company_detailsModel.life_insurance,
                mediclaim = previous_company_detailsModel.mediclaim,
                esi_insurance_number = previous_company_detailsModel.esi_insurance_number,
                esi_employers_code_number = previous_company_detailsModel.esi_employers_code_number
            };
        }
        /// <summary>
        /// Converts from.
        /// </summary>
        /// <param name="previous_company_details">The previous company details.</param>
        /// <returns>previous_company_detailsModel.</returns>
        public static previous_company_detailsModel ConvertFrom(previous_company_details previous_company_details)
        {
            if (previous_company_details == null)
            {
                previous_company_details = new previous_company_details();
            }
            return new previous_company_detailsModel()
            {
                pf_account_number = previous_company_details.pf_account_number,
                pf_employers_code_number = previous_company_details.pf_employers_code_number,
                fps_account_number = previous_company_details.fps_account_number,
                life_insurance = previous_company_details.life_insurance,
                mediclaim = previous_company_details.mediclaim,
                esi_insurance_number = previous_company_details.esi_insurance_number,
                esi_employers_code_number = previous_company_details.esi_employers_code_number
            };
        }
        /// <summary>
        /// Converts to.
        /// </summary>
        /// <param name="referencesModel">The references model.</param>
        /// <returns>references.</returns>
        public static references ConvertTo(referencesModel referencesModel)
        {
            return new references()
            {
                name = referencesModel.name,
                address = referencesModel.address,
                designation = referencesModel.designation,
                ref_type = referencesModel.ref_type
            };
        }
        /// <summary>
        /// Converts from.
        /// </summary>
        /// <param name="references">The references.</param>
        /// <returns>referencesModel.</returns>
        public static referencesModel ConvertFrom(references references)
        {
            if (references == null)
            {
                references = new references();
            }
            return new referencesModel()
            {
                name = references.name,
                address = references.address,
                designation = references.designation,
                ref_type = references.ref_type
            };
        }
    }
         
    } 