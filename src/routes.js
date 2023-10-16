// Material Dashboard 2 React layouts

import PersonalInformation from "layouts/personalInformation";
import Login from "layouts/home/components1/authentication/sign-in";
import ResetPassword from "layouts/home/components1/authentication/reset-password";
import SignUp from "layouts/home/components1/authentication/sign-up";
import AnnualReportForm from "layouts/annualReportForm";
import Home from "layouts/home";
import VerifyStudent from "layouts/home/components1/authentication/sign-up/verifyStudent";
import ForgotPasswordVerify from "layouts/home/components1/authentication/reset-password/forgotPasswordVerify";
import SubmittedApplication from "layouts/submittedApplication";
import NeedsAssessmentForm from "layouts/needsAssessmentForm";

const routes = [
  {
    type: "HomePage",
    name: "HomePage",
    key: "home-page",
    route: "/",
    component: <Home />,
    protected: false,
  },
  {
    type: "PersonalInformation",
    name: "PersonalInformation",
    key: "PersonalInformation",
    route: "/personalInformation",
    component: <PersonalInformation />,
    protected: true,
  },
  {
    type: "NeedAssessmentForm",
    name: "NeedAssessmentForm",
    key: "NeedAssessmentForm",
    route: "/needAssessmentForm/:id",
    component: <NeedsAssessmentForm />,
    protected: true,
  },
  {
    type: "AnnualReportForm",
    name: "AnnualReportForm",
    key: "AnnualReportForm",
    route: "/annualReportForm/:id",
    component: <AnnualReportForm />,
    protected: true,
  },
  {
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <Login />,
    protected: false,
  },
  {
    name: "forgotPassword",
    key: "forgotPassword",
    route: "/authentication/reset-password",
    component: <ResetPassword />,
    protected: false,
  },
  {
    name: "SignUp",
    key: "SignUp",
    route: "/authentication/sign-up",
    component: <SignUp />,
    protected: false,
  },
  {
    name: "verifyStudent",
    key: "verifyStudent",
    route: "/verifyStudent",
    component: <VerifyStudent />,
    protected: false,
  },
  {
    name: "emailVerification",
    key: "emailVerification",
    route: "/email-verification",
    component: <ForgotPasswordVerify />,
    protected: false,
  },
  {
    type: "SubmittedApplication",
    name: "SubmittedApplication",
    key: "SubmittedApplication",
    route: "/submittedApplication",
    component: <SubmittedApplication />,
    protected: true,
  },
];

export default routes;
