import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// Enum definitions converted from Drizzle pgEnum to Convex v.union
export const accountPrimaryGroupEnum = v.union(
  v.literal("INCOME"),
  v.literal("EXPENSE"),
  v.literal("ASSET"),
  v.literal("LIABILITY"),
);

export const accountStatusEnum = v.union(
  v.literal("OPEN"),
  v.literal("CLOSE"),
  v.literal("SUSPENDED"),
);

export const memberStatusEnum = v.union(
  v.literal("ACTIVE"),
  v.literal("INACTIVE"),
  v.literal("SUSPENDED"),
);

export const voucherMasterEnum = v.union(
  v.literal("OPENING_BALANCE"),
  v.literal("CREDIT"),
  v.literal("DEBIT"),
  v.literal("JOURNAL_VOUCHER"),
  v.literal("CONTRA"),
);

export const brokenPeriodEnum = v.union(
  v.literal("360_BASIS"),
  v.literal("365_BASIS"),
);

export const identityProofEnum = v.union(
  v.literal("AADHAR_CARD"),
  v.literal("DRIVING_LICENSE"),
  v.literal("EMPLOYMENT_ID"),
  v.literal("PAN_CARD"),
  v.literal("PASSPORT"),
  v.literal("VOTER_ID"),
);

export const interestTypeEnum = v.union(
  v.literal("SIMPLE"),
  v.literal("COMPOUND"),
);

export const addressProofEnum = v.union(
  v.literal("AADHAR_CARD"),
  v.literal("BANK_STATEMENT_PASS_BOOK"),
  v.literal("DOMESTIC_CERTIFICATE"),
  v.literal("DRIVING_LICENSE"),
  v.literal("ELECTRICITY_BILL"),
  v.literal("HOUSE_RENT_AGREEMENT"),
  v.literal("INCOME_TAX_CHALLAN"),
  v.literal("PASSPORT"),
  v.literal("RATION_CARD"),
  v.literal("RESIDENCY_PROOF_ANY_GOVT_OFFICE"),
  v.literal("TELEPHONE_BILL"),
  v.literal("VOTER_ID"),
);

export const interestCalculationFrequencyEnum = v.union(
  v.literal("DAILY"),
  v.literal("WEEKLY"),
  v.literal("MONTHLY"),
  v.literal("QUARTERLY"),
  v.literal("HALF_YEARLY"),
  v.literal("YEARLY"),
);

export const monthEnum = v.union(
  v.literal("JANUARY"),
  v.literal("FEBRUARY"),
  v.literal("MARCH"),
  v.literal("APRIL"),
  v.literal("MAY"),
  v.literal("JUNE"),
  v.literal("JULY"),
  v.literal("AUGUST"),
  v.literal("SEPTEMBER"),
  v.literal("OCTOBER"),
  v.literal("NOVEMBER"),
  v.literal("DECEMBER"),
);

export const compoundingFrequencyEnum = v.union(
  v.literal("MONTHLY"),
  v.literal("QUARTERLY"),
  v.literal("HALF_YEARLY"),
  v.literal("YEARLY"),
);

export const calendarDayTypeEnum = v.union(
  v.literal("WEEKLY_OFF"),
  v.literal("HOLIDAY"),
);

export const prefixEnum = v.union(
  v.literal("Mr"),
  v.literal("Mrs"),
  v.literal("Ms"),
  v.literal("Dr"),
  v.literal("Prof"),
  v.literal("Shrimati"),
  v.literal("Shri"),
);

export const relationEnum = v.union(
  v.literal("Wife"),
  v.literal("Husband"),
  v.literal("Daughter"),
  v.literal("Son"),
  v.literal("Mother"),
  v.literal("Father"),
  v.literal("Brother"),
  v.literal("Sister"),
  v.literal("Self"),
  v.literal("Uncle"),
  v.literal("Other"),
);

export const balanceTypeEnum = v.union(
  v.literal("DEBIT"),
  v.literal("CREDIT"),
  v.literal("BOTH"),
);

export const accountTypeEnum = v.union(
  v.literal("TRAVEL"),
  v.literal("OFFICE_SUPPLIES"),
  v.literal("SOFTWARE"),
  v.literal("RENT"),
  v.literal("INCOME"),
  v.literal("EQUIPMENT"),
  v.literal("INTERNET_AND_TELEPHONE"),
  v.literal("FACILITIES_EXPENSES"),
  v.literal("TAXES"),
  v.literal("CASH"),
  v.literal("SHARES"),
  v.literal("FEES"),
  v.literal("SAVINGS_DEPOSIT"),
  v.literal("RECURRING_DEPOSIT"),
  v.literal("RECURRING_DEPOSIT_INTEREST"),
  v.literal("FIXED_DEPOSIT"),
  v.literal("FIXED_DEPOSIT_INTEREST"),
  v.literal("LOAN"),
  v.literal("INVESTMENT"),
  v.literal("DIVIDEND_PAYABLE"),
  v.literal("SALARY"),
  v.literal("OTHER"),
);

export const transactionModeEnum = v.union(
  v.literal("CASH"),
  v.literal("UPI"),
  v.literal("CHEQUE"),
  v.literal("BANK_TRANSFER"),
  v.literal("OTHER"),
);

export const genderEnum = v.union(
  v.literal("MALE"),
  v.literal("FEMALE"),
  v.literal("OTHER"),
);

export const occupationEnum = v.union(
  v.literal("SERVICE_PROFESSIONAL"),
  v.literal("GENERAL_JOB"),
  v.literal("OTHER"),
  v.literal("HOMEMAKER"),
  v.literal("BUSINESS_OWNER"),
  v.literal("EX_SERVICEPERSON"),
  v.literal("ADVOCATE"),
  v.literal("STUDENT"),
  v.literal("DOCTOR"),
  v.literal("TEACHER"),
  v.literal("UNEMPLOYED"),
);

export const fdAccountTypeEnum = v.union(
  v.literal("REGULAR"),
  v.literal("SENIOR_CITIZEN"),
  v.literal("FEMALE"),
  v.literal("WIDOW"),
  v.literal("HANDICAPPED"),
  v.literal("EMPLOYEE"),
  v.literal("FREEDOM_FIGHTER"),
);

export const fdPlanTypeEnum = v.union(
  v.literal("FIXED_DEPOSIT"),
  v.literal("DOUBLE_MONEY"),
  v.literal("CASH_CERTIFICATE"),
  v.literal("PENSION"),
  v.literal("CALL_DEPOSIT"),
);

export const tenureTypeEnum = v.union(
  v.literal("DAYS"),
  v.literal("MONTHS"),
  v.literal("YEARS"),
);

export const accTypeEnum = v.union(
  v.literal("SAVINGS"),
  v.literal("CURRENT"),
  v.literal("FIXED"),
  v.literal("RECURRING"),
);

export const loanPlanTypeEnum = v.union(
  v.literal("SECURED_LOAN"),
  v.literal("UNSECURED_LOAN"),
  v.literal("MEMBER_LOAN"),
  v.literal("DEPOSIT_LOAN"),
  v.literal("RECURRING_LOAN"),
  v.literal("NON_REFUNDABLE_LOAN"),
  v.literal("CASH_CREDIT_LOAN"),
  v.literal("DAILY_LOAN"),
  v.literal("IN_DAYS"),
);

/**
 * IMPORTANT: This is a backdated application schema
 * 
 * Each organization runs on a particular date in the calendar table.
 * This date is used in all date columns throughout the application
 * (except for Convex's native system fields like _id and _creationTime).
 * 
 * All custom application dates are controlled by the organization's
 * current calendar day setting.
 */

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  // Include Convex Auth tables
  ...authTables,

  // Organizations - Root table for multi-tenancy
  organizations: defineTable({
    name: v.string(),
    slug: v.optional(v.string()),
    logo: v.optional(v.string()),
    metadata: v.optional(v.string()),
  }).index("by_slug", ["slug"]),

  orgBranches: defineTable({
    address: v.optional(v.string()),
    regNo: v.optional(v.string()),
    name: v.optional(v.string()),
  }),

  // FK: organizationId -> organizations._id, inviterId -> users._id, teamId -> teams._id
  invitations: defineTable({
    email: v.string(),
    role: v.optional(v.string()),
    teamId: v.optional(v.id("teams")), // FK to teams
    status: v.string(),
    expiresAt: v.number(),
    organizationId: v.id("organizations"), // FK to organizations
    inviterId: v.id("users"), // FK to users
  }),

  // FK: organizationId -> organizations._id, userId -> users._id, teamId -> teams._id
  orgMembers: defineTable({
    organizationId: v.id("organizations"), // FK to organizations
    userId: v.id("users"), // FK to users
    role: v.string(),
    teamId: v.optional(v.id("teams")), // FK to teams
  }),

  // Bank Accounts Schema
  // FK: subAccountId -> subAccounts._id, organizationId -> organizations._id
  bankAccounts: defineTable({
    subAccountId: v.optional(v.id("subAccounts")), // optional FK to subAccounts
    name: v.optional(v.string()),
    accNo: v.optional(v.string()),
    branch: v.optional(v.string()),
    address: v.optional(v.string()),
    accType: accTypeEnum,
    isActive: v.boolean(),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // Deposit Savings Schema
  // FK: subAccountsId -> subAccounts._id, savingPlanId -> savingPlans._id, membersId -> members._id, organizationId -> organizations._id
  // NOTE: openDate and closeDate use the organization's run date from the calendar table
  savingAccounts: defineTable({
    subAccountsId: v.id("subAccounts"), // FK to subAccounts
    savingPlanId: v.id("savingPlans"), // FK to savingPlans
    membersId: v.id("members"), // FK to members
    openDate: v.string(), // org run date (YYYY-MM-DD)
    interestRate: v.number(),
    status: accountStatusEnum,
    closeDate: v.optional(v.string()), // org run date
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // FK: subAccountsId -> subAccounts._id, transactionHeadId -> transactionHead._id, organizationId -> organizations._id
  // NOTE: intDate uses the organization's run date
  savingInterestPost: defineTable({
    subAccountsId: v.id("subAccounts"), // FK to subAccounts
    transactionHeadId: v.optional(v.id("transactionHead")), // FK to transactionHead
    amount: v.number(),
    intDate: v.string(), // org run date
    rate: v.number(),
    posted: v.boolean(),
    changedManually: v.boolean(),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // FK: savingPlanId -> savingPlans._id, organizationId -> organizations._id
  // NOTE: endDate uses the organization's run date
  savingInterestRate: defineTable({
    savingPlanId: v.id("savingPlans"), // FK to savingPlans
    intRate: v.number(),
    endDate: v.string(), // org run date
    isActive: v.boolean(),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // FK: savingAccountsId -> savingAccounts._id, membersId -> members._id, organizationId -> organizations._id
  savingJointAccounts: defineTable({
    savingAccountsId: v.id("savingAccounts"), // FK to savingAccounts
    membersId: v.id("members"), // FK to members
    minor: v.boolean(),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // FK: accountsId -> accounts._id, organizationId -> organizations._id
  savingPlans: defineTable({
    accountsId: v.id("accounts"), // FK to accounts
    name: v.string(),
    minBalance: v.number(),
    maxWithdrawal: v.number(),
    minWithdrawal: v.number(),
    maxDeposit: v.number(),
    minDeposit: v.number(),
    interestCalcFrequency: interestCalculationFrequencyEnum,
    isActive: v.boolean(),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // Deposit Fixed Schema
  // FK: subAccountsId -> subAccounts._id, fdPlansId -> fdPlans._id, membersId -> members._id, organizationId -> organizations._id
  // NOTE: openDate, interestStartDate, maturityDate, receiptDate use the organization's run date
  fdAccounts: defineTable({
    subAccountsId: v.id("subAccounts"), // FK to subAccounts
    fdPlansId: v.id("fdPlans"), // FK to fdPlans
    membersId: v.id("members"), // FK to members
    tenureMonths: v.number(),
    tenureDays: v.number(),
    fdAmount: v.number(),
    openDate: v.string(), // org run date
    interestStartDate: v.string(), // org run date
    interestRate: v.number(),
    maturityDate: v.string(), // org run date
    maturityAmount: v.number(),
    receiptNo: v.string(),
    receiptDate: v.string(), // org run date
    isActive: v.boolean(),
    discountedInterestRate: v.optional(v.number()),
    accountType: fdAccountTypeEnum,
    organizationId: v.id("organizations"), // FK to organizations
  }).index("by_receipt_and_organization", ["receiptNo", "organizationId"]),

  // FK: subAccountsId -> subAccounts._id, transactionHeadId -> transactionHead._id, organizationId -> organizations._id
  // NOTE: intDate uses the organization's run date
  fdInterestPost: defineTable({
    subAccountsId: v.id("subAccounts"), // FK to subAccounts
    transactionHeadId: v.optional(v.id("transactionHead")), // FK to transactionHead
    amount: v.number(),
    intDate: v.string(), // org run date
    rate: v.number(),
    posted: v.boolean(),
    changedManually: v.boolean(),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // FK: fdPlanId -> fdPlans._id, organizationId -> organizations._id
  // NOTE: endDate uses the organization's run date
  fdInterestRate: defineTable({
    fdPlanId: v.id("fdPlans"), // FK to fdPlans
    tenure: v.number(),
    tenureType: tenureTypeEnum,
    intRate: v.number(),
    endDate: v.string(), // org run date
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // FK: accountsId -> accounts._id, organizationId -> organizations._id
  fdPlans: defineTable({
    accountsId: v.id("accounts"), // FK to accounts
    type: fdPlanTypeEnum,
    name: v.string(),
    multiplier: v.number(),
    interestType: interestTypeEnum,
    compoundingFrequency: compoundingFrequencyEnum,
    returnAmtBy: v.number(),
    autoRenewal: v.boolean(),
    openEnded: v.boolean(),
    status: accountStatusEnum,
    brokenPeriod: brokenPeriodEnum,
    intRateSnrCitizen: v.optional(v.number()),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // Deposit Recurring Schema
  // FK: subAccountsId -> subAccounts._id, recurringPlansId -> recurringPlans._id, membersId -> members._id, organizationId -> organizations._id
  // NOTE: openDate, maturityDate use the organization's run date
  recurringAccounts: defineTable({
    subAccountsId: v.id("subAccounts"), // FK to subAccounts
    recurringPlansId: v.id("recurringPlans"), // FK to recurringPlans
    membersId: v.id("members"), // FK to members
    openDate: v.string(), // org run date
    monthlyAmount: v.number(),
    period: v.number(),
    interestRate: v.number(),
    maturityDate: v.string(), // org run date
    maturityAmount: v.number(),
    status: accountStatusEnum,
    closeDate: v.optional(v.string()),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // FK: subAccountsId -> subAccounts._id, transactionHeadId -> transactionHead._id, organizationId -> organizations._id
  // NOTE: intDate uses the organization's run date
  recurringInterestPost: defineTable({
    subAccountsId: v.id("subAccounts"), // FK to subAccounts
    transactionHeadId: v.optional(v.id("transactionHead")), // FK to transactionHead
    amount: v.number(),
    intDate: v.string(), // org run date
    rate: v.number(),
    posted: v.boolean(),
    changedManually: v.boolean(),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // FK: recurringPlansId -> recurringPlans._id, organizationId -> organizations._id
  // NOTE: endDate uses the organization's run date
  recurringInterestRate: defineTable({
    recurringPlansId: v.id("recurringPlans"), // FK to recurringPlans
    tenure: v.number(),
    intRate: v.number(),
    endDate: v.string(), // org run date
    isActive: v.optional(v.boolean()),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // FK: accountsId -> accounts._id, organizationId -> organizations._id
  recurringPlans: defineTable({
    accountsId: v.id("accounts"), // FK to accounts
    name: v.string(),
    openEnded: v.boolean(),
    interestType: interestTypeEnum,
    compoundingFrequency: v.optional(compoundingFrequencyEnum),
    isActive: v.optional(v.boolean()),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // Member Schema
  // FK: organizationId -> organizations._id
  // NOTE: memberNo is a string generated using nanoid (not auto-increment)
  // NOTE: applicationDate and birthDate use the organization's run date
  members: defineTable({
    memberNo: v.string(), // nanoid-based identifier
    occupation: v.optional(occupationEnum),
    applicationDate: v.optional(v.string()), // org run date
    prefix: v.optional(prefixEnum),
    fullName: v.string(),
    gender: v.optional(genderEnum),
    birthDate: v.optional(v.string()), // org run date
    panNo: v.optional(v.string()),
    adhaarId: v.optional(v.string()),
    photo: v.optional(v.string()),
    sign: v.optional(v.string()),
    email: v.optional(v.string()),
    mobile: v.optional(v.string()),
    status: memberStatusEnum,
    organizationId: v.id("organizations"), // FK to organizations
  }).index("by_memberNo_and_organization", ["memberNo", "organizationId"]),

  // FK: organizationId -> organizations._id
  memberAddress: defineTable({
    presentAddress: v.optional(v.string()),
    presentPin: v.optional(v.number()),
    presentTelephone: v.optional(v.string()),
    presentMobile: v.optional(v.number()),
    permanentAddress: v.optional(v.string()),
    permanentPin: v.optional(v.number()),
    permanentTelephone: v.optional(v.string()),
    permanentMobile: v.optional(v.number()),
    isSameAddress: v.boolean(),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // FK: membersId -> members._id, organizationId -> organizations._id
  memberKycDocument: defineTable({
    membersId: v.id("members"), // FK to members
    identityProof: v.optional(identityProofEnum),
    addressProof: v.optional(addressProofEnum),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // Transaction Schema
  // FK: transactionHeadId -> transactionHead._id, accountsId -> accounts._id, subAccountsId -> subAccounts._id, organizationId -> organizations._id
  transactionDetails: defineTable({
    transactionHeadId: v.id("transactionHead"), // FK to transactionHead
    accountsId: v.id("accounts"), // FK to accounts
    subAccountsId: v.id("subAccounts"), // FK to subAccounts
    amount: v.number(),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // FK: financialYearId -> financialYears._id, branchId -> orgBranches._id, organizationId -> organizations._id
  // NOTE: date uses the organization's run date
  transactionHead: defineTable({
    financialYearId: v.id("financialYears"), // FK to financialYears
    branchId: v.optional(v.id("orgBranches")), // FK to orgBranches
    voucherMaster: voucherMasterEnum,
    voucherNo: v.string(),
    date: v.string(), // org run date
    amount: v.number(),
    narration: v.optional(v.string()),
    mode: v.optional(transactionModeEnum),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // Ledger Accounts Schema
  // FK: organizationId -> organizations._id
  accounts: defineTable({
    accountType: accountTypeEnum,
    balanceType: balanceTypeEnum,
    name: v.string(),
    status: accountStatusEnum,
    memberwiseAccount: v.boolean(),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // FK: accountId -> accounts._id, memberId -> members._id, organizationId -> organizations._id
  // NOTE: subAccountNo is a string generated using nanoid (not auto-increment)
  subAccounts: defineTable({
    accountId: v.optional(v.id("accounts")), // FK to accounts
    memberId: v.optional(v.id("members")), // FK to members
    subAccountNo: v.optional(v.string()), // nanoid-based identifier
    status: accountStatusEnum,
    balance: v.optional(v.number()),
    organizationId: v.id("organizations"), // FK to organizations
  }).index("by_subAccountNo_and_organization", ["subAccountNo", "organizationId"]),

  // Uncategorized Schema
  // FK: organizationId -> organizations._id
  // NOTE: startDate and endDate use the organization's run date reference for period definition
  financialYears: defineTable({
    name: v.string(),
    startDate: v.string(), // org run date
    endDate: v.string(), // org run date
    locked: v.optional(v.boolean()),
    isActive: v.optional(v.boolean()),
    organizationId: v.id("organizations"), // FK to organizations
  }).index("by_organization_and_isActive", ["organizationId", "isActive"]),

  // FK: financialYearsId -> financialYears._id
  // NOTE: This table controls the current operational date per organization
  calendar: defineTable({
    financialYearsId: v.id("financialYears"), // FK to financialYears
    month: monthEnum,
    dayType: v.optional(calendarDayTypeEnum),
    dayEnd: v.boolean(),
    currentDay: v.boolean(),
    description: v.optional(v.string()),
  }).index("by_financialYearsId_and_currentDay", ["financialYearsId", "currentDay"]),

  // FK: subAccountsId -> subAccounts._id, organizationId -> organizations._id
  // NOTE: nominationDate uses the organization's run date
  nominee: defineTable({
    subAccountsId: v.optional(v.id("subAccounts")), // FK to subAccounts
    relation: v.optional(relationEnum),
    prefix: v.optional(prefixEnum),
    fullName: v.optional(v.string()),
    age: v.optional(v.number()),
    address: v.optional(v.string()),
    nominationDate: v.optional(v.string()), // org run date
    sharesPercentage: v.optional(v.number()),
    organizationId: v.id("organizations"), // FK to organizations
  }),

  // Adding teams table referenced in invitations
  // FK: organizationId -> organizations._id
  teams: defineTable({
    name: v.string(),
    organizationId: v.id("organizations"), // FK to organizations
  }),
});
