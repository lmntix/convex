import { pgEnum } from "drizzle-orm/pg-core";

export const accountPrimaryGroupEnum = pgEnum("account_primary_group", [
  "INCOME",
  "EXPENSE",
  "ASSET",
  "LIABILITY",
]);

export const accountStatusEnum = pgEnum("account_status", [
  "OPEN",
  "CLOSE",
  "SUSPENDED",
]);

export const memberStatusEnum = pgEnum("member_status", [
  "ACTIVE",
  "INACTIVE",
  "SUSPENDED",
]);

export const voucherMasterEnum = pgEnum("voucher_master", [
  "OPENING_BALANCE",
  "CREDIT",
  "DEBIT",
  "JOURNAL_VOUCHER",
  "CONTRA",
]);

export const brokenPeriodEnum = pgEnum("broken_period", [
  "360_BASIS",
  "365_BASIS",
]);

export const identityProofEnum = pgEnum("identity_proof", [
  "AADHAR_CARD",
  "DRIVING_LICENSE",
  "EMPLOYMENT_ID",
  "PAN_CARD",
  "PASSPORT",
  "VOTER_ID",
]);

export const interestTypeEnum = pgEnum("interest_type", ["SIMPLE", "COMPOUND"]);

export const addressProofEnum = pgEnum("address_proof", [
  "AADHAR_CARD",
  "BANK_STATEMENT_PASS_BOOK",
  "DOMESTIC_CERTIFICATE",
  "DRIVING_LICENSE",
  "ELECTRICITY_BILL",
  "HOUSE_RENT_AGREEMENT",
  "INCOME_TAX_CHALLAN",
  "PASSPORT",
  "RATION_CARD",
  "RESIDENCY_PROOF_ANY_GOVT_OFFICE",
  "TELEPHONE_BILL",
  "VOTER_ID",
]);

export const interestCalculationFrequencyEnum = pgEnum(
  "interest_calculation_frequency",
  ["DAILY", "WEEKLY", "MONTHLY", "QUARTERLY", "HALF_YEARLY", "YEARLY"],
);

export const monthEnum = pgEnum("month", [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
]);

export const compoundingFrequencyEnum = pgEnum("compounding_frequency", [
  "MONTHLY",
  "QUARTERLY",
  "HALF_YEARLY",
  "YEARLY",
]);

export const calendarDayTypeEnum = pgEnum("calendar_day_type", [
  "WEEKLY_OFF",
  "HOLIDAY",
]);

export const prefixEnum = pgEnum("prefix", [
  "Mr",
  "Mrs",
  "Ms",
  "Dr",
  "Prof",
  "Shrimati",
  "Shri",
]);

export const relationEnum = pgEnum("relation", [
  "Wife",
  "Husband",
  "Daughter",
  "Son",
  "Mother",
  "Father",
  "Brother",
  "Sister",
  "Self",
  "Uncle",
  "Other",
]);

export const balanceTypeEnum = pgEnum("account_balance_type", [
  "DEBIT",
  "CREDIT",
  "BOTH",
]);

export const accountTypeEnum = pgEnum("account_type", [
  "TRAVEL",
  "OFFICE_SUPPLIES",
  "SOFTWARE",
  "RENT",
  "INCOME",
  "EQUIPMENT",
  "INTERNET_AND_TELEPHONE",
  "FACILITIES_EXPENSES",
  "TAXES",
  "CASH",
  "SHARES",
  "FEES",
  "SAVINGS_DEPOSIT",
  "RECURRING_DEPOSIT",
  "RECURRING_DEPOSIT_INTEREST",
  "FIXED_DEPOSIT",
  "FIXED_DEPOSIT_INTEREST",
  "LOAN",
  "INVESTMENT",
  "DIVIDEND_PAYABLE",
  "SALARY",
  "OTHER",
]);

export const transactionModeEnum = pgEnum("transaction_mode", [
  "CASH",
  "UPI",
  "CHEQUE",
  "BANK_TRANSFER",
  "OTHER",
]);

export const genderEnum = pgEnum("gender", ["MALE", "FEMALE", "OTHER"]);

export const occupationEnum = pgEnum("occupation", [
  "SERVICE_PROFESSIONAL",
  "GENERAL_JOB",
  "OTHER",
  "HOMEMAKER",
  "BUSINESS_OWNER",
  "EX_SERVICEPERSON",
  "ADVOCATE",
  "STUDENT",
  "DOCTOR",
  "TEACHER",
  "UNEMPLOYED",
]);

export const fdAccountTypeEnum = pgEnum("fd_account_type", [
  "REGULAR",
  "SENIOR_CITIZEN",
  "FEMALE",
  "WIDOW",
  "HANDICAPPED",
  "EMPLOYEE",
  "FREEDOM_FIGHTER",
]);

export const fdPlanTypeEnum = pgEnum("fd_plan_type", [
  "FIXED_DEPOSIT",
  "DOUBLE_MONEY",
  "CASH_CERTIFICATE",
  "PENSION",
  "CALL_DEPOSIT",
]);

export const tenureTypeEnum = pgEnum("tenure_type", [
  "DAYS",
  "MONTHS",
  "YEARS",
]);

export const accTypeEnum = pgEnum("acc_type", [
  "SAVINGS",
  "CURRENT",
  "FIXED",
  "RECURRING",
]);

export const loanPlanTypeEnum = pgEnum("loan_plan_type", [
  "SECURED_LOAN",
  "UNSECURED_LOAN",
  "MEMBER_LOAN",
  "DEPOSIT_LOAN",
  "RECURRING_LOAN",
  "NON_REFUNDABLE_LOAN",
  "CASH_CREDIT_LOAN",
  "DAILY_LOAN",
  "IN_DAYS",
]);
