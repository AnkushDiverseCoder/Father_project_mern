// production host 
// const host = "https://gorgeous-scrubs-crow.cyclic.app/api"

// Testing Host 
const host = "http://localhost:8000/api"

// customer 
export const CustomerHeadRoute = `${host}/customerhead`
export const getCustomerName = `${host}/customerhead`

// customer Edit 
export const CustomerHeadData = `${host}/customerhead`
export const UpdateCustomerData = `${host}/customerhead/`
export const DeleteCustomerData = `${host}/customerhead/`

// AccountingEntry
export const AccountingEntryRoute = `${host}/accountingentry`
export const getCustomerEmail = `${host}/accountingentry/getEmail`

// Report  
export const DailyReportRoute = `${host}/report/dailyreport`
export const monthlyReportRoute = `${host}/report/monthlyreport`
export const individualReportRoute = `${host}/report/individualreport`

// authentication routes
export const LoginRoute = `${host}/auth/login`
export const Signup = `${host}/auth/register`
export const verifyToken = `${host}/auth/verifyToken`

// Dashboard routes

// First Row
export const TotalCreditAmount = `${host}/dashboard/credit`
export const TotalDebitAmount = `${host}/dashboard/debit`
export const TotalExcessAmount = `${host}/dashboard/ExcessAmount`
export const TotalShortAmount = `${host}/dashboard/shortamount`
