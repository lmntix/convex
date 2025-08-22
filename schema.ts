import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  check,
  customType,
  date,
  pgSchema,
  pgTable,
  serial,
  smallint,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import {
  accountStatusEnum,
  accountTypeEnum,
  accTypeEnum,
  addressProofEnum,
  balanceTypeEnum,
  brokenPeriodEnum,
  calendarDayTypeEnum,
  compoundingFrequencyEnum,
  fdAccountTypeEnum,
  fdPlanTypeEnum,
  genderEnum,
  identityProofEnum,
  interestCalculationFrequencyEnum,
  interestTypeEnum,
  memberStatusEnum,
  monthEnum,
  occupationEnum,
  prefixEnum,
  relationEnum,
  tenureTypeEnum,
  transactionModeEnum,
  voucherMasterEnum,
} from "./enums";

// CONFIGURATIONS STARTED

type NumericConfig = {
  precision?: number;
  scale?: number;
};

const numericCasted = customType<{
  data: number;
  driverData: string;
  config: NumericConfig;
}>({
  dataType: (config) => {
    if (config?.precision && config?.scale) {
      return `numeric(${config.precision}, ${config.scale})`;
    }
    return "numeric";
  },
  fromDriver: (value: string) => Number.parseFloat(value),
  toDriver: (value: number) => value.toString(),
});

const systemMetadata = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: uuid("created_by"),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  updatedBy: uuid("updated_by"),
  version: bigint("version", { mode: "number" })
    .default(1)
    .$onUpdate(() => sql`version + 1`),
} as const;

const organizationId = uuid("organization_id")
  .notNull()
  .references(() => organizations.id);

// CONFIGURATIONS ENDED

export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  logo: text("logo"),
  metadata: text("metadata"),
  ...systemMetadata,
});

export const orgBranches = pgTable("org_branches", {
  id: uuid("id").defaultRandom().primaryKey(),
  address: text("address"),
  regNo: text("reg_no"),
  name: text("name"),
  ...systemMetadata,
});

// AUTH SCHEMA

export const pgAuth = pgSchema("auth");

export const users = pgAuth.table("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  version: bigint("version", { mode: "number" })
    .default(1)
    .$onUpdate(() => sql`version + 1`),
  isActive: boolean("is_active").default(true),
});

export const invitations = pgAuth.table("invitations", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: text("email").notNull(),
  role: text("role"),
  teamId: uuid("team_id"),
  status: text("status").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  organizationId,
  inviterId: uuid("inviter_id")
    .notNull()
    .references(() => users.id),
  ...systemMetadata,
});

export const orgMembers = pgAuth.table("org_members", {
  id: serial("id").primaryKey(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onUpdate: "cascade", onDelete: "cascade" }),
  role: text("role").notNull(),
  teamId: uuid("team_id"),
  ...systemMetadata,
});

export const sessions = pgAuth.table("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  activeOrganizationId: uuid("active_organization_id"),
  impersonatedBy: uuid("impersonated_by"),
});

export const userAccounts = pgAuth.table("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
});

export const verifications = pgAuth.table("verifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

// BANK ACCOUNTS SCHEMA

export const bankAccounts = pgTable("bank_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  subAccountId: uuid("sub_accounts_id"),
  name: text("name"),
  accNo: text("acc_no"),
  branch: text("branch"),
  address: text("address"),
  accType: accTypeEnum("acc_type").notNull().default("SAVINGS"),
  isActive: boolean("is_active").notNull().default(true),
  organizationId,
  ...systemMetadata,
});

// DEPOSIT SAVINGS SCHEMA

export const savingAccounts = pgTable("saving_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  subAccountsId: uuid("sub_accounts_id").notNull(),
  savingPlanId: uuid("saving_plans_id").notNull(),
  membersId: uuid("members_id").notNull(),
  openDate: date("open_date").notNull(),
  interestRate: numericCasted({ precision: 10, scale: 2 }).notNull(),
  status: accountStatusEnum("status").notNull().default("OPEN"),
  closeDate: date("close_date"),
  organizationId,
  ...systemMetadata,
});

export const savingInterestPost = pgTable("saving_interest_post", {
  id: uuid("id").defaultRandom().primaryKey(),
  subAccountsId: uuid("sub_accounts_id").notNull(),
  transactionHeadId: uuid("transaction_head_id"),
  amount: numericCasted({ precision: 10, scale: 2 }).notNull(),
  intDate: date("int_date").notNull(),
  rate: numericCasted({ precision: 10, scale: 2 }).notNull(),
  posted: boolean("posted").notNull().default(false),
  changedManually: boolean("changed_manually").notNull().default(false),
  organizationId,
  ...systemMetadata,
});

export const savingInterestRate = pgTable("saving_interest_rate", {
  id: uuid("id").defaultRandom().primaryKey(),
  savingPlanId: uuid("saving_plans_id").notNull(),
  intRate: numericCasted({ precision: 10, scale: 2 }).notNull(),
  endDate: date("end_date").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  organizationId,
});

export const savingJointAccounts = pgTable("saving_joint_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  savingAccountsId: uuid("saving_accounts_id").notNull(),
  membersId: uuid("members_id").notNull(),
  minor: boolean("minor").notNull(),
  organizationId,
});

export const savingPlans = pgTable("saving_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  accountsId: uuid("accounts_id").notNull(),
  name: text("name").notNull(),
  minBalance: numericCasted({ precision: 10, scale: 2 }).notNull(),
  maxWithdrawal: numericCasted({ precision: 10, scale: 2 }).notNull(),
  minWithdrawal: numericCasted({ precision: 10, scale: 2 }).notNull(),
  maxDeposit: numericCasted({ precision: 10, scale: 2 }).notNull(),
  minDeposit: numericCasted({ precision: 10, scale: 2 }).notNull(),
  interestCalcFrequency: interestCalculationFrequencyEnum(
    "interest_calc_frequency",
  )
    .notNull()
    .default("DAILY"),
  isActive: boolean("is_active").notNull().default(true),
  organizationId,
  ...systemMetadata,
});

// DEPOSIT FIXED SCHEMA

export const fdAccounts = pgTable(
  "fd_accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    subAccountsId: uuid("sub_accounts_id").notNull(),
    fdPlansId: uuid("fd_plans_id").notNull(),
    membersId: uuid("members_id").notNull(),
    tenureMonths: numericCasted().notNull().default(0),
    tenureDays: numericCasted().notNull().default(0),
    fdAmount: numericCasted({ precision: 10, scale: 2 }).notNull(),
    openDate: date("open_date").notNull(),
    interestStartDate: date("interest_start_date").notNull(),
    interestRate: numericCasted({ precision: 10, scale: 2 }).notNull(),
    maturityDate: date("maturity_date").notNull(),
    maturityAmount: numericCasted({ precision: 10, scale: 2 }).notNull(),
    receiptNo: text("receipt_no").notNull(),
    receiptDate: date("receipt_date").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    discountedInterestRate: numericCasted({ precision: 10, scale: 2 }),
    accountType: fdAccountTypeEnum("account_type").notNull().default("REGULAR"),
    organizationId,
    ...systemMetadata,
  },
  (table) => [
    unique("unique_receipt_no").on(table.receiptNo, table.organizationId),
    check("tenure_months_positive", sql`"fd_accounts"."tenure_months" >= 0`),
    check("tenure_days_positive", sql`"fd_accounts"."tenure_days" >= 0`),
  ],
);

export const fdInterestPost = pgTable("fd_interest_post", {
  id: uuid("id").defaultRandom().primaryKey(),
  subAccountsId: uuid("sub_accounts_id").notNull(),
  transactionHeadId: uuid("transaction_head_id"),
  amount: numericCasted({ precision: 10, scale: 2 }).notNull(),
  intDate: date("int_date").notNull(),
  rate: numericCasted({ precision: 10, scale: 2 }).notNull(),
  posted: boolean("posted").notNull().default(false),
  changedManually: boolean("changed_manually").notNull().default(false),
  organizationId,
  ...systemMetadata,
});

export const fdInterestRate = pgTable("fd_interest_rate", {
  id: uuid("id").defaultRandom().primaryKey(),
  fdPlanId: uuid("fd_plans_id").notNull(),
  tenure: numericCasted().notNull(),
  tenureType: tenureTypeEnum("tenure_type").notNull(),
  intRate: numericCasted({ precision: 10, scale: 2 }).notNull(),
  endDate: date("end_date").notNull(),
  organizationId,
});

export const fdPlans = pgTable("fd_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  accountsId: uuid("accounts_id").notNull(),
  type: fdPlanTypeEnum("type").notNull(),
  name: text("name").notNull(),
  multiplier: smallint().notNull().default(0),
  interestType: interestTypeEnum("interest_type").notNull().default("SIMPLE"),
  compoundingFrequency: compoundingFrequencyEnum(
    "compounding_frequency",
  ).notNull(),
  returnAmtBy: smallint("return_amt_by").notNull(),
  autoRenewal: boolean("auto_renewal").notNull().default(false),
  openEnded: boolean("open_ended").notNull().default(false),
  status: accountStatusEnum("status").notNull().default("OPEN"),
  brokenPeriod: brokenPeriodEnum("broken_period")
    .notNull()
    .default("360_BASIS"),
  intRateSnrCitizen: numericCasted({ precision: 10, scale: 2 }),
  organizationId,
  ...systemMetadata,
});

// DEPOSIT RECURRING SCHEMA

export const recurringAccounts = pgTable(
  "recurring_accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    subAccountsId: uuid("sub_accounts_id").notNull(),
    recurringPlansId: uuid("recurring_plans_id").notNull(),
    membersId: uuid("members_id").notNull(),
    openDate: date("open_date").notNull(),
    monthlyAmount: numericCasted({ precision: 10, scale: 2 }).notNull(),
    period: numericCasted().notNull(),
    interestRate: numericCasted({ precision: 10, scale: 2 }).notNull(),
    maturityDate: date("maturity_date").notNull(),
    maturityAmount: numericCasted({ precision: 10, scale: 2 }).notNull(),
    status: accountStatusEnum("status").notNull().default("OPEN"),
    closeDate: date("close_date"),
    organizationId,
    ...systemMetadata,
  },
  () => [check("period_positive", sql`"recurring_accounts"."period" > 0`)],
);

export const recurringInterestPost = pgTable("recurring_interest_post", {
  id: uuid("id").defaultRandom().primaryKey(),
  subAccountsId: uuid("sub_accounts_id").notNull(),
  transactionHeadId: uuid("transaction_head_id"),
  amount: numericCasted({ precision: 10, scale: 2 }).notNull(),
  intDate: date("int_date").notNull(),
  rate: numericCasted({ precision: 10, scale: 2 }).notNull(),
  posted: boolean("posted").notNull().default(false),
  changedManually: boolean("changed_manually").notNull().default(false),
  organizationId,
  ...systemMetadata,
});

export const recurringInterestRate = pgTable("recurring_interest_rate", {
  id: uuid("id").defaultRandom().primaryKey(),
  recurringPlansId: uuid("recurring_plans_id").notNull(),
  tenure: numericCasted().notNull(),
  intRate: numericCasted({ precision: 10, scale: 2 }).notNull(),
  endDate: date("end_date").notNull(),
  isActive: boolean("is_active").default(true),
  organizationId,
  ...systemMetadata,
});

export const recurringPlans = pgTable("recurring_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  accountsId: uuid("accounts_id").notNull(),
  name: text("name").notNull(),
  openEnded: boolean("open_ended").notNull().default(false),
  interestType: interestTypeEnum("interest_type").notNull().default("SIMPLE"),
  compoundingFrequency: compoundingFrequencyEnum("compounding_frequency"),
  isActive: boolean("is_active").default(true),
  organizationId,
  ...systemMetadata,
});

// MEMBER SCHEMA

export const members = pgTable(
  "members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    memberNo: numericCasted("member_no").notNull(),
    occupation: occupationEnum("occupation"),
    applicationDate: date("application_date").defaultNow(),
    prefix: prefixEnum("prefix"),
    fullName: text("full_name").notNull(),
    gender: genderEnum("gender"),
    birthDate: date("birth_date"),
    panNo: text("pan_no"),
    adhaarId: text("adhaar_id"),
    photo: text("photo"),
    sign: text("sign"),
    email: text("email"),
    mobile: text("mobile"),
    status: memberStatusEnum("status").notNull().default("ACTIVE"),
    organizationId,
    ...systemMetadata,
  },
  (table) => [
    unique("unique_member_no_org").on(table.memberNo, table.organizationId),
  ],
);

export const memberAddress = pgTable("member_address", {
  id: uuid("id").defaultRandom().primaryKey(),
  presentAddress: text("present_address"),
  presentPin: numericCasted("present_pin"),
  presentTelephone: text("present_telephone"),
  presentMobile: numericCasted("present_mobile"),
  permanentAddress: text("permanent_address"),
  permanentPin: numericCasted("permanent_pin"),
  permanentTelephone: text("permanent_telephone"),
  permanentMobile: numericCasted("permanent_mobile"),
  isSameAddress: boolean("is_same_address").notNull().default(false),
  organizationId,
  ...systemMetadata,
});

export const memberKycDocument = pgTable("member_kyc_document", {
  id: uuid("id").defaultRandom().primaryKey(),
  membersId: uuid().notNull(),
  identityProof: identityProofEnum("identity_proof"),
  addressProof: addressProofEnum("address_proof"),
  organizationId,
  ...systemMetadata,
});

// TRANSACTION SCHEMA

export const transactionDetails = pgTable("transaction_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  transactionHeadId: uuid("transaction_head_id").notNull(),
  accountsId: uuid("accounts_id").notNull(),
  subAccountsId: uuid("sub_accounts_id").notNull(),
  amount: numericCasted({ precision: 10, scale: 2 }).notNull(),
  organizationId,
  ...systemMetadata,
});

export const transactionHead = pgTable("transaction_head", {
  id: uuid("id").defaultRandom().primaryKey(),
  financialYearId: uuid("financial_years_id").notNull(),
  branchId: uuid("branch_id"),
  voucherMaster: voucherMasterEnum("voucher_master").notNull(),
  voucherNo: text("voucher_no").notNull(),
  date: date("date").notNull(),
  amount: numericCasted({ precision: 10, scale: 2 }).notNull(),
  narration: text("narration"),
  mode: transactionModeEnum("mode"),
  organizationId,
  ...systemMetadata,
});

// LEDGER ACCOUNTS SCHEMA

export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  accountType: accountTypeEnum("account_type").notNull(),
  balanceType: balanceTypeEnum("balance_type").notNull(),
  name: text("name").notNull(),
  status: accountStatusEnum("status").notNull().default("OPEN"),
  memberwiseAccount: boolean("memberwise_account").notNull(),
  organizationId,
  ...systemMetadata,
});

export const subAccounts = pgTable(
  "sub_accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    accountId: uuid("accounts_id"),
    memberId: uuid("members_id"),
    subAccountNo: text("sub_account_no"),
    status: accountStatusEnum("status").notNull().default("OPEN"),
    balance: numericCasted({ precision: 10, scale: 2 }),
    organizationId,
    ...systemMetadata,
  },
  (table) => [
    unique("unique_sub_account_no").on(
      table.subAccountNo,
      table.organizationId,
    ),
  ],
);

// UNCATEGORIZED SCHEMA

export const financialYears = pgTable(
  "financial_years",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
    locked: boolean("locked").default(false),
    isActive: boolean("is_active").default(false),
    organizationId,
    ...systemMetadata,
  },
  (table) => [
    unique("unique_active_org_year").on(table.organizationId, table.isActive),
  ],
);

export const calendar = pgTable(
  "calender",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    financialYearsId: uuid("financial_years_id").notNull(),
    month: monthEnum("month").notNull(),
    dayType: calendarDayTypeEnum("day_type"),
    dayEnd: boolean("day_end").default(false).notNull(),
    currentDay: boolean("current_day").notNull().default(false),
    description: text("description"),
  },
  (table) => [
    unique("unique_current_day_per_fy").on(
      table.financialYearsId,
      table.currentDay,
    ),
  ],
);

export const nominee = pgTable(
  "nominee",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    subAccountsId: uuid("sub_accounts_id"),
    relation: relationEnum("relation"),
    prefix: prefixEnum("prefix"),
    fullName: text("full_name"),
    age: smallint("age"),
    address: text("address"),
    nominationDate: date("nomination_date"),
    sharesPercentage: numericCasted({ precision: 10, scale: 2 }),
    organizationId,
    ...systemMetadata,
  },
  () => [
    check("age_non_negative", sql`"nominee"."age" > 0`),
    check("age_reasonable", sql`"nominee"."age" <= 150`),
  ],
);

// LOAN SCHEMA

// export const loanAccounts = pgTable("loan_accounts", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   subAccountsId: uuid("sub_accounts_id").notNull(),
//   loanPlansId: uuid("loan_plans_id").notNull(),
//   membersId: uuid("members_id").notNull(),
//   loanReason: text("loan_reason"),
//   loanAmount: numericCasted({ precision: 10, scale: 2 }).notNull(),
//   interestRate: numericCasted({ precision: 10, scale: 2 }).notNull(),
//   openDate: date("open_date").notNull(),
//   firstInstallmentDate: date("first_installment_date").notNull(),
//   tenure: numericCasted().notNull(),
//   installmentAmt: numericCasted({ precision: 10, scale: 2 }).notNull(),
//   totalInstallments: numericCasted().notNull(),
//   endDate: date("end_date").notNull(),
//   approvalDate: date("approval_date"),
//   closeDate: date("close_date"),
//   status: accountStatusEnum("status").notNull().default("OPEN"),
//   organizationId,
//   ...systemMetadata
// })

// export const loanPlans = pgTable("loan_plans", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   accountsId: uuid("accounts_id").notNull(),
//   name: text("name").notNull(),
//   type: loanPlanTypeEnum("type").notNull(),
//   installmentType: smallint("installment_type").notNull(),
//   demandLoan: boolean("demand_loan").notNull().default(false),
//   penaltyOn: smallint("penalty_on").notNull().default(0),
//   dueInstallments: smallint("due_installments").notNull().default(0),
//   penalInstallmentCalc: smallint("penal_installment_calc").notNull().default(0),
//   isActive: boolean("is_active").notNull().default(true),
//   organizationId,
//   ...systemMetadata
// })

// VIEWS SCHEMA

// export const viewMembersBal = pgView("view_members_bal").as((qb) => {
//   return qb
//     .select({
//       accounts_id: transaction_details.accounts_id,
//       sub_accounts_id: transaction_details.sub_accounts_id,
//       members_id: sub_accounts.memberId,
//       balance: sum(transaction_details.trans_amount).as("balance")
//     })
//     .from(transaction_head)
//     .innerJoin(
//       transaction_details,
//       eq(transaction_head.id, transaction_details.transaction_head_id)
//     )
//     .innerJoin(accounts, eq(transaction_details.accounts_id, accounts.id))
//     .innerJoin(
//       sub_accounts,
//       eq(transaction_details.sub_accounts_id, sub_accounts.id)
//     )
//     .where(
//       and(
//         eq(transaction_details.accounts_id, 3),
//         lt(transaction_head.trans_date, new Date("2024-04-01"))
//       )
//     )
//     .groupBy(
//       transaction_details.accounts_id,
//       transaction_details.sub_accounts_id,
//       sub_accounts.memberId
//     )
// })

// export const viewRDTrans = pgView("view_rd_trans").as((qb) => {
//   return qb
//     .select({
//       transaction_details_id: transaction_details.id,
//       transaction_head_id: transaction_details.transaction_head_id,
//       accounts_id: transaction_details.accounts_id,
//       sub_accounts_id: transaction_details.sub_accounts_id,
//       trans_amount: transaction_details.trans_amount,
//       members_id: sub_accounts.memberId
//     })
//     .from(transaction_details)
//     .innerJoin(
//       sub_accounts,
//       eq(transaction_details.sub_accounts_id, sub_accounts.id)
//     )
//     .where(eq(transaction_details.accounts_id, 76))
//     .orderBy(sub_accounts.memberId, transaction_details.sub_accounts_id)
// })

// export const viewSubAccountBalance = pgView("view_sub_account_balance").as(
//   (qb) => {
//     return qb
//       .select({
//         balance: sum(transaction_details.trans_amount).as("balance"),
//         accounts_id: transaction_details.accounts_id,
//         sub_accounts_id: transaction_details.sub_accounts_id
//       })
//       .from(transaction_details)
//       .innerJoin(
//         transaction_head,
//         eq(transaction_details.transaction_head_id, transaction_head.id)
//       )
//       .groupBy(
//         transaction_details.accounts_id,
//         transaction_details.sub_accounts_id
//       )
//   }
// )
