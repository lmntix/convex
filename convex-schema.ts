import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

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

// System metadata fields common to most tables
const systemMetadata = {
  createdAt: v.number(), // timestamp
  createdBy: v.optional(v.id("users")), // uuid reference
  updatedAt: v.number(), // timestamp
  updatedBy: v.optional(v.id("users")), // uuid reference
  version: v.number(), // version control
};

export default defineSchema({
  // Organizations
  organizations: defineTable({
    name: v.string(),
    slug: v.optional(v.string()),
    logo: v.optional(v.string()),
    metadata: v.optional(v.string()),
    ...systemMetadata,
  }).index("by_slug", ["slug"]),

  orgBranches: defineTable({
    address: v.optional(v.string()),
    regNo: v.optional(v.string()),
    name: v.optional(v.string()),
    ...systemMetadata,
  }),

  // Auth Schema
  users: defineTable({
    name: v.string(),
    email: v.string(),
    emailVerified: v.boolean(),
    image: v.optional(v.string()),
    role: v.optional(v.string()),
    banned: v.optional(v.boolean()),
    banReason: v.optional(v.string()),
    banExpires: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
    version: v.number(),
  }).index("by_email", ["email"]),

  invitations: defineTable({
    email: v.string(),
    role: v.optional(v.string()),
    teamId: v.optional(v.id("teams")),
    status: v.string(),
    expiresAt: v.number(),
    organizationId: v.id("organizations"),
    inviterId: v.id("users"),
    ...systemMetadata,
  }),

  orgMembers: defineTable({
    organizationId: v.id("organizations"),
    userId: v.id("users"),
    role: v.string(),
    teamId: v.optional(v.id("teams")),
    ...systemMetadata,
  }),

  sessions: defineTable({
    expiresAt: v.number(),
    token: v.string(),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    userId: v.id("users"),
    activeOrganizationId: v.optional(v.id("organizations")),
    impersonatedBy: v.optional(v.id("users")),
  }).index("by_token", ["token"]),

  userAccounts: defineTable({
    accountId: v.string(),
    providerId: v.string(),
    userId: v.id("users"),
    accessToken: v.optional(v.string()),
    refreshToken: v.optional(v.string()),
    idToken: v.optional(v.string()),
    accessTokenExpiresAt: v.optional(v.number()),
    refreshTokenExpiresAt: v.optional(v.number()),
    scope: v.optional(v.string()),
    password: v.optional(v.string()),
  }),

  verifications: defineTable({
    identifier: v.string(),
    value: v.string(),
    expiresAt: v.number(),
  }),

  // Bank Accounts Schema
  bankAccounts: defineTable({
    subAccountId: v.optional(v.id("subAccounts")),
    name: v.optional(v.string()),
    accNo: v.optional(v.string()),
    branch: v.optional(v.string()),
    address: v.optional(v.string()),
    accType: accTypeEnum,
    isActive: v.boolean(),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  // Deposit Savings Schema
  savingAccounts: defineTable({
    subAccountsId: v.id("subAccounts"),
    savingPlanId: v.id("savingPlans"),
    membersId: v.id("members"),
    openDate: v.string(), // date as string in format YYYY-MM-DD
    interestRate: v.number(),
    status: accountStatusEnum,
    closeDate: v.optional(v.string()),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  savingInterestPost: defineTable({
    subAccountsId: v.id("subAccounts"),
    transactionHeadId: v.optional(v.id("transactionHead")),
    amount: v.number(),
    intDate: v.string(),
    rate: v.number(),
    posted: v.boolean(),
    changedManually: v.boolean(),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  savingInterestRate: defineTable({
    savingPlanId: v.id("savingPlans"),
    intRate: v.number(),
    endDate: v.string(),
    isActive: v.boolean(),
    organizationId: v.id("organizations"),
  }),

  savingJointAccounts: defineTable({
    savingAccountsId: v.id("savingAccounts"),
    membersId: v.id("members"),
    minor: v.boolean(),
    organizationId: v.id("organizations"),
  }),

  savingPlans: defineTable({
    accountsId: v.id("accounts"),
    name: v.string(),
    minBalance: v.number(),
    maxWithdrawal: v.number(),
    minWithdrawal: v.number(),
    maxDeposit: v.number(),
    minDeposit: v.number(),
    interestCalcFrequency: interestCalculationFrequencyEnum,
    isActive: v.boolean(),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  // Deposit Fixed Schema
  fdAccounts: defineTable({
    subAccountsId: v.id("subAccounts"),
    fdPlansId: v.id("fdPlans"),
    membersId: v.id("members"),
    tenureMonths: v.number(),
    tenureDays: v.number(),
    fdAmount: v.number(),
    openDate: v.string(),
    interestStartDate: v.string(),
    interestRate: v.number(),
    maturityDate: v.string(),
    maturityAmount: v.number(),
    receiptNo: v.string(),
    receiptDate: v.string(),
    isActive: v.boolean(),
    discountedInterestRate: v.optional(v.number()),
    accountType: fdAccountTypeEnum,
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }).index("by_receipt_org", ["receiptNo", "organizationId"]),

  fdInterestPost: defineTable({
    subAccountsId: v.id("subAccounts"),
    transactionHeadId: v.optional(v.id("transactionHead")),
    amount: v.number(),
    intDate: v.string(),
    rate: v.number(),
    posted: v.boolean(),
    changedManually: v.boolean(),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  fdInterestRate: defineTable({
    fdPlanId: v.id("fdPlans"),
    tenure: v.number(),
    tenureType: tenureTypeEnum,
    intRate: v.number(),
    endDate: v.string(),
    organizationId: v.id("organizations"),
  }),

  fdPlans: defineTable({
    accountsId: v.id("accounts"),
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
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  // Deposit Recurring Schema
  recurringAccounts: defineTable({
    subAccountsId: v.id("subAccounts"),
    recurringPlansId: v.id("recurringPlans"),
    membersId: v.id("members"),
    openDate: v.string(),
    monthlyAmount: v.number(),
    period: v.number(),
    interestRate: v.number(),
    maturityDate: v.string(),
    maturityAmount: v.number(),
    status: accountStatusEnum,
    closeDate: v.optional(v.string()),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  recurringInterestPost: defineTable({
    subAccountsId: v.id("subAccounts"),
    transactionHeadId: v.optional(v.id("transactionHead")),
    amount: v.number(),
    intDate: v.string(),
    rate: v.number(),
    posted: v.boolean(),
    changedManually: v.boolean(),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  recurringInterestRate: defineTable({
    recurringPlansId: v.id("recurringPlans"),
    tenure: v.number(),
    intRate: v.number(),
    endDate: v.string(),
    isActive: v.optional(v.boolean()),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  recurringPlans: defineTable({
    accountsId: v.id("accounts"),
    name: v.string(),
    openEnded: v.boolean(),
    interestType: interestTypeEnum,
    compoundingFrequency: v.optional(compoundingFrequencyEnum),
    isActive: v.optional(v.boolean()),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  // Member Schema
  members: defineTable({
    memberNo: v.number(),
    occupation: v.optional(occupationEnum),
    applicationDate: v.optional(v.string()),
    prefix: v.optional(prefixEnum),
    fullName: v.string(),
    gender: v.optional(genderEnum),
    birthDate: v.optional(v.string()),
    panNo: v.optional(v.string()),
    adhaarId: v.optional(v.string()),
    photo: v.optional(v.string()),
    sign: v.optional(v.string()),
    email: v.optional(v.string()),
    mobile: v.optional(v.string()),
    status: memberStatusEnum,
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }).index("by_member_org", ["memberNo", "organizationId"]),

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
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  memberKycDocument: defineTable({
    membersId: v.id("members"),
    identityProof: v.optional(identityProofEnum),
    addressProof: v.optional(addressProofEnum),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  // Transaction Schema
  transactionDetails: defineTable({
    transactionHeadId: v.id("transactionHead"),
    accountsId: v.id("accounts"),
    subAccountsId: v.id("subAccounts"),
    amount: v.number(),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  transactionHead: defineTable({
    financialYearId: v.id("financialYears"),
    branchId: v.optional(v.id("orgBranches")),
    voucherMaster: voucherMasterEnum,
    voucherNo: v.string(),
    date: v.string(),
    amount: v.number(),
    narration: v.optional(v.string()),
    mode: v.optional(transactionModeEnum),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  // Ledger Accounts Schema
  accounts: defineTable({
    accountType: accountTypeEnum,
    balanceType: balanceTypeEnum,
    name: v.string(),
    status: accountStatusEnum,
    memberwiseAccount: v.boolean(),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  subAccounts: defineTable({
    accountId: v.optional(v.id("accounts")),
    memberId: v.optional(v.id("members")),
    subAccountNo: v.optional(v.string()),
    status: accountStatusEnum,
    balance: v.optional(v.number()),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }).index("by_sub_account_org", ["subAccountNo", "organizationId"]),

  // Uncategorized Schema
  financialYears: defineTable({
    name: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    locked: v.optional(v.boolean()),
    isActive: v.optional(v.boolean()),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }).index("by_active_org", ["organizationId", "isActive"]),

  calendar: defineTable({
    financialYearsId: v.id("financialYears"),
    month: monthEnum,
    dayType: v.optional(calendarDayTypeEnum),
    dayEnd: v.boolean(),
    currentDay: v.boolean(),
    description: v.optional(v.string()),
  }).index("by_current_day_fy", ["financialYearsId", "currentDay"]),

  nominee: defineTable({
    subAccountsId: v.optional(v.id("subAccounts")),
    relation: v.optional(relationEnum),
    prefix: v.optional(prefixEnum),
    fullName: v.optional(v.string()),
    age: v.optional(v.number()),
    address: v.optional(v.string()),
    nominationDate: v.optional(v.string()),
    sharesPercentage: v.optional(v.number()),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),

  // Adding teams table referenced in invitations
  teams: defineTable({
    name: v.string(),
    organizationId: v.id("organizations"),
    ...systemMetadata,
  }),
});
